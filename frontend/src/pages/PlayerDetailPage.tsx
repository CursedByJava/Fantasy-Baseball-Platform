import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { PLAYERS } from '../mock/players'
import { isPitcher, useTeam } from '../context/TeamContext'
import { Badge } from '../components/UI'
import { HitterRadar, PitcherBars } from '../components/Charts'
import type { Player } from '../types'
import { Plus, Trash2 } from 'lucide-react'
import TipsCard from './TipsCard'
import { TEAM_MAX } from '../context/TeamContext'
import { useToast } from '../components/Toast'


export default function PlayerDetailPage() {
    const { add, team, remove, clear } = useTeam()
    const { showToast } = useToast()
    const { id } = useParams()
    const p = useMemo<Player | undefined>(() => PLAYERS.find(x => x.id===id), [id])
    const inTeam = !!team.find(t => t.id===id)
    if (!p) return <div className="text-slate-500">Player not found.</div>


    return (
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <div className="rounded-2xl border bg-white p-6 flex items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-2xl font-bold">{p.name}</h1>
                            <Badge>{p.position}</Badge>
                            <Badge>{p.mlbTeam}</Badge>
                            <span className="text-slate-400">•</span>
                            <span className="text-sm text-slate-600">Age {p.age}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-sm text-slate-600">B/T {p.bats}/{p.throws}</span>
                        </div>
                        <div className="mt-4">{isPitcher(p) ? <PitcherBars p={p} /> : <HitterRadar p={p as any} />}</div>
                        </div>
                    </div>
                    <div className="rounded-2xl border bg-white p-6">
                        <h2 className="font-semibold mb-3">Stat Breakdown</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(p.stats).map(([k, v]) => (
                            <div key={k} className="flex items-baseline gap-2">
                                <span className="text-[11px] uppercase tracking-wide text-slate-500">{k.toUpperCase()}</span>
                                <span className="font-semibold">{typeof v==='number' ? ((k==='avg'||k==='obp'||k==='ops')? (v as number).toFixed(3) : v) : String(v)}</span>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                <div className="rounded-2xl border bg-white p-6">
                    <h3 className="font-semibold mb-3">Roster Action</h3>
                    {inTeam ? (
                    <button onClick={() => remove(p.id)} className="w-full px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2">
                        <Trash2 className="w-4 h-4" /> Remove from Team
                    </button>
                    ) : (
                    <button 
                        onClick={async () => {
                            const added = await add(p)
                            if (!added) {
                                showToast(`You already have a ${p.position} selected`, 'error')
                            } else {
                                showToast(`Added ${p.name} to your team`, 'success')
                            }
                        }} 
                        className="w-full px-4 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add to Team
                    </button>
                    )}
                    <p className="text-xs text-slate-500 mt-2">Team cap: {TEAM_MAX} players.</p>
                    <button
                        onClick={() => {
                            if (team.length === 0) return
                            if (window.confirm('Clear your team? This will remove all players from your roster.')) clear()
                        }}
                        className="w-full mt-3 px-4 py-3 rounded-xl border text-sm text-slate-700 hover:bg-slate-50"
                    >
                        Clear Team
                    </button>
                </div>
                 <TipsCard />
            </div>
        </div>
    )
}