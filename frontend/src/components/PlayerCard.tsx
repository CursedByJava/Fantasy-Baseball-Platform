import { Link, useNavigate } from 'react-router-dom'
import { Plus, Trash2, Info } from 'lucide-react'
import { Badge, Stat, Avatar } from './UI'
import { HitterRadar, PitcherBars } from './Charts'
import type { Player } from '../types'
import { isPitcher } from '../context/TeamContext'


export default function PlayerCard({ p, onAdd, onRemove, inTeam }: {p: Player; onAdd?: (player: Player) => void; onRemove?: (id: string) => void; inTeam?: boolean}) {
    const navigate = useNavigate()
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3">
            <Avatar name={p.name} />
                <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Link to={`/player/${p.id}`} className="text-lg font-semibold hover:underline flex items-center gap-1">
                            {p.name}
                            <Info className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                        </Link>
                        <Badge>{p.position}</Badge>
                        <Badge>{p.mlbTeam}</Badge>
                        <span className="text-slate-400">•</span>
                        <span className="text-sm text-slate-600">Age {p.age}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {isPitcher(p) ? <PitcherBars p={p} /> : <HitterRadar p={p as any} />}
                        <div className="grid grid-cols-2 gap-2 content-start">
                            {isPitcher(p) ? (
                            <>
                            <Stat label="ERA" value={p.stats.era?.toFixed(2)} />
                            <Stat label="WHIP" value={p.stats.whip?.toFixed(2)} />
                            <Stat label="K/9" value={p.stats.k9} />
                            {p.stats.sv != null && <Stat label="SV" value={p.stats.sv} />}
                            </>
                            ) : (
                            <>
                            <Stat label="AVG" value={(p as any).stats.avg?.toFixed(3)} />
                            <Stat label="OBP" value={(p as any).stats.obp?.toFixed(3)} />
                            <Stat label="HR" value={(p as any).stats.hr} />
                            <Stat label="RBI" value={(p as any).stats.rbi} />
                            <Stat label="SB" value={(p as any).stats.sb} />
                            </>
                            )}
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <button onClick={() => navigate(`/player/${p.id}`)} className="px-3 py-2 rounded-xl border text-sm hover:bg-slate-50">View Profile</button>
                            {inTeam ? (
                        <button onClick={() => onRemove?.(p.id)} className="px-3 py-2 rounded-xl bg-red-50 text-red-700 text-sm hover:bg-red-100 flex items-center gap-1">
                            <Trash2 className="w-4 h-4" /> Remove
                        </button>
                        ) : (
                        <button 
                            onClick={() => { if (onAdd) onAdd(p) }}
                            className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700 flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" /> Add to Team
                        </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}