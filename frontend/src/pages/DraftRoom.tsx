import React from 'react'
import { useDraftRoom } from '../draft/useDraft'
import type { Drafter } from '../draft/types'
import { useTeam } from '../context/TeamContext'
import { bestAvailable } from '../draft/logic'
import type { Player } from '../types'

const DRAFTERS: Drafter[] = [
    { id: 'you', name: 'You', isBot: false, autopickQueue: [] },
    { id: 'bot-1', name: 'AI Aces', isBot: true, autopickQueue: [] },
    { id: 'bot-2', name: 'Slugger Bot', isBot: true, autopickQueue: [] },
    { id: 'bot-3', name: 'Spin Rate', isBot: true, autopickQueue: [] },
]


export default function DraftRoom() {
    const { state, submitPick, resetDraft, players, draftedSet } = useDraftRoom(DRAFTERS, 5, 30)
    const current = state.picks[state.currentPickIndex]
    const onTheClockId = current?.teamId

    React.useEffect(() => {
        if (onTheClockId === 'you' && 'Notification' in window) {
        if (Notification.permission === 'granted') new Notification('You are on the clock!')
        else if (Notification.permission !== 'denied') Notification.requestPermission()
        }
    }, [onTheClockId])

    React.useEffect(() => {
    if (state.phase !== 'ON_THE_CLOCK') return
    const teamId = onTheClockId
    if (!teamId) return
    const drafter = DRAFTERS.find(d => d.id === teamId)!
    if (!drafter.isBot) return
    const t = setTimeout(() => {
        const queued = drafter.autopickQueue.find(pid => !draftedSet.has(pid))
        const fallback = bestAvailable(players as Player[], draftedSet)
        const chosen = queued ?? fallback?.id
        if (chosen) submitPick(teamId, chosen)
    }, 800)
    return () => clearTimeout(t)
    }, [state.phase, state.currentPickIndex, onTheClockId, draftedSet, players, submitPick])


    const remaining = Math.max(0, Math.ceil(((state.pickEndsAt ?? 0) - Date.now())/1000))


    return (
        <div className="space-y-4">
            <header className="rounded-2xl border bg-white p-4 flex items-center justify-between">
            <div>
                <h2 className="font-semibold">Live Draft</h2>
                <p className="text-sm text-slate-600">Round {current?.round} • Pick {current?.overall}</p>
            </div>
            <div className="text-right">
                <div className="text-2xl font-bold">{remaining}s</div>
                <div className="text-xs text-slate-500">On the clock: {DRAFTERS.find(d=>d.id===onTheClockId)?.name}</div>
            </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-3">
                    <DraftBoard drafted={state.picks} players={players} />
                    {state.phase === 'COMPLETE' && (
                        <div className="rounded-xl border bg-green-50 text-green-700 p-3">Draft complete!</div>
                    )}
                </div>
                <div className="space-y-3">
                    <PlayerPicker players={players} taken={draftedSet} onPick={(pid)=> submitPick('you', pid)} disabled={onTheClockId!=='you' || state.phase!=='ON_THE_CLOCK'} />
                    <button className="w-full px-3 py-2 rounded-xl border" onClick={resetDraft}>Reset Draft</button>
                </div>
            </div>
        </div>
    )
}

function DraftBoard({ drafted, players }: { drafted: any[]; players: Player[] }) {
    return (
        <div className="rounded-2xl border bg-white p-4">
            <h3 className="font-semibold mb-2">Draft Board</h3>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                {drafted.map(p => (
                <div key={p.overall} className="rounded-xl border p-3 bg-slate-50">
                    <div className="text-xs text-slate-500">Pick #{p.overall} (R{p.round}) — {p.teamId}</div>
                    <div className="font-medium">{p.playerId ? players.find(x=>x.id===p.playerId)?.name : '—'}</div>
                </div>
                ))}
            </div>
        </div>
    )
}

function PlayerPicker({ players, taken, onPick, disabled }: { players: Player[]; taken: Set<string>; onPick: (id: string)=>void; disabled: boolean }) {
    const [q, setQ] = React.useState('')
    const filtered = React.useMemo(() => players.filter(p => !taken.has(p.id) && p.name.toLowerCase().includes(q.toLowerCase())), [players, taken, q])
    return (
        <div className="rounded-2xl border bg-white p-4">
            <h3 className="font-semibold mb-2">Make a Pick</h3>
            <input className="w-full px-3 py-2 rounded-xl border mb-2" placeholder="Search players…" value={q} onChange={e=>setQ(e.target.value)} />
            <div className="max-h-64 overflow-auto divide-y">
                {filtered.slice(0,50).map(p => (
                <button key={p.id} disabled={disabled} onClick={()=>onPick(p.id)} className="w-full text-left px-2 py-2 hover:bg-slate-50 disabled:opacity-50">
                    {p.name} <span className="text-xs text-slate-500">({p.position} • {p.mlbTeam})</span>
                </button>
                ))}
            </div>
        </div>
    )
}