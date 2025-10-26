import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Download } from 'lucide-react'
import { useTeam } from '../context/TeamContext'
import PlayerCard from '../components/PlayerCard'
import { Stat } from '../components/UI'


export default function TeamPage() {
    const { team, remove, clear, totals } = useTeam()


    const downloadJSON = () => {
        const blob = new Blob([JSON.stringify(team, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'fantasy-team.json'
        a.click()
        URL.revokeObjectURL(url)
    }


    return (
        <div className="space-y-4">
            <div className="rounded-2xl border bg-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <h2 className="font-semibold">Your Team</h2>
                    <span className="rounded-full bg-slate-100 text-slate-700 text-xs px-2 py-1 border border-slate-200">{team.length}/10</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={downloadJSON} className="px-3 py-2 rounded-xl border flex items-center gap-1 text-sm">
                        <Download className="w-4 h-4" /> Export JSON
                    </button>
                    <button onClick={clear} className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm">Clear</button>
                </div>
            </div>


            {team.length === 0 ? (
            <div className="rounded-2xl border bg-white p-8 text-center text-slate-600">
                No players yet. Head to <Link to="/players" className="underline">Players</Link> to draft your squad.
            </div>
            ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {team.map(p => (
                <PlayerCard key={p.id} p={p} onRemove={remove} inTeam />
                ))}
            </div>
            )}


            <div className="rounded-2xl border bg-white p-6">
                <h3 className="font-semibold mb-3">Category Totals</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    <Stat label="HR" value={totals.hr} />
                    <Stat label="RBI" value={totals.rbi} />
                    <Stat label="SB" value={totals.sb} />
                    <Stat label="AVG" value={totals.avg ? totals.avg.toFixed(3) : '-'} />
                    <Stat label="ERA (sum)" value={totals.era.toFixed(2)} />
                    <Stat label="WHIP (sum)" value={totals.whip.toFixed(2)} />
                    <Stat label="K/9 (sum)" value={totals.k9.toFixed(1)} />
                    <Stat label="SV" value={totals.sv} />
                </div>
            </div>
        </div>
    )
}