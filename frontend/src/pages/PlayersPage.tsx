import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useTeam } from '../context/TeamContext'
import { useToast } from '../components/Toast'
import { PLAYERS } from '../mock/players'
import type { Position, Player, Hitter, HitterStats } from '../types'
import PlayerCard from '../components/PlayerCard'
import DraftSuggestions from '../components/DraftSuggestions'


export default function PlayersPage() {
    const { add, team } = useTeam()
    const { showToast } = useToast()
    const [q, setQ] = useState('')
    const [pos, setPos] = useState<'ALL' | Position>('ALL')
    const [sort, setSort] = useState<'name'|'power'|'avg'|'k9'>('name')


    const filtered = useMemo(() => {
    let list = PLAYERS
    if (pos !== 'ALL') list = list.filter(p => p.position === pos)
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q.toLowerCase()))
    const sorter: Record<typeof sort, (a: Player, b: Player)=>number> = {
        name: (a,b) => a.name.localeCompare(b.name),
        power: (a,b) => ((('hr' in a.stats ? (a as any as Hitter).stats.hr : 0) < ('hr' in b.stats ? (b as any as Hitter).stats.hr : 0)) ? 1 : -1),
        avg: (a,b) => ((('avg' in a.stats ? (a as any as Hitter).stats.avg : 0) < ('avg' in b.stats ? (b as any as Hitter).stats.avg : 0)) ? 1 : -1),
        k9: (a,b) => ((('k9' in a.stats ? (a as any).stats.k9 : 0) < ('k9' in b.stats ? (b as any).stats.k9 : 0)) ? 1 : -1),
    }
    return [...list].sort(sorter[sort])
        }, [q, pos, sort])


    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-white rounded-xl border px-3 py-2 w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input className="outline-none flex-1 text-sm" placeholder="Search players…" value={q} onChange={e=>setQ(e.target.value)} />
                </div>
                <div className="flex items-center gap-2">
                    <select className="px-3 py-2 rounded-xl border bg-white" value={pos} onChange={e=>setPos(e.target.value as any)}>
                        {(['ALL','C','1B','2B','3B','SS','OF','SP','RP'] as const).map(p => <option key={p}>{p}</option>)}
                    </select>
                    <select className="px-3 py-2 rounded-xl border bg-white" value={sort} onChange={e=>setSort(e.target.value as any)}>
                        <option value="name">Sort: Name</option>
                        <option value="power">Sort: HR (power)</option>
                        <option value="avg">Sort: AVG</option>
                        <option value="k9">Sort: K/9 (pitchers)</option>
                    </select>
                </div>
            </div>
            <div className="grid lg:grid-cols-4 gap-4">
                <div className="lg:col-span-3">
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                        {filtered.map(p => (
                                <PlayerCard 
                                    key={p.id} 
                                    p={p} 
                                    onAdd={(player) => {
                                        add(player)
                                        showToast(`Added ${player.name} to your team`, 'success')
                                    }}
                                    inTeam={!!team.find(t=>t.id===p.id)} 
                                />
                                ))}
                    </div>
                </div>
                <div>
                    <DraftSuggestions />
                </div>
            </div>
        </div>
    )
}