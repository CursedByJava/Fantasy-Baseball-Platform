import React, { useMemo } from 'react'
import { PLAYERS } from '../mock/players'
import { useTeam } from '../context/TeamContext'
import type { Player } from '../types'
import { suggestNextDraft, getTopPlayers } from '../utils/scoring'
import { Badge } from './UI'

export default function DraftSuggestions() {
    const { team } = useTeam()
    
    // Get available players (not in current team)
    const availablePlayers = useMemo(() => {
        const teamIds = new Set(team.map(p => p.id))
        return PLAYERS.filter(p => !teamIds.has(p.id))
    }, [team])
    
    // Get top 5 available players by points
    const topPlayers = useMemo(() => 
        getTopPlayers(availablePlayers, 5)
    , [availablePlayers])
    
    // Get next suggested draft pick
    const suggestedPick = useMemo(() => 
        suggestNextDraft(availablePlayers, team)
    , [availablePlayers, team])

    return (
        <div className="rounded-2xl border bg-white p-6 space-y-4">
            <div>
                <h3 className="font-semibold mb-2">Suggested Next Pick</h3>
                {suggestedPick ? (
                    <div className="rounded-xl border p-3 bg-emerald-50">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{suggestedPick.name}</span>
                            <Badge>{suggestedPick.position}</Badge>
                        </div>
                        <p className="text-sm text-emerald-700 mt-1">
                            Recommended based on your team needs
                        </p>
                    </div>
                ) : (
                    <p className="text-sm text-slate-500">No suggestions available</p>
                )}
            </div>
            
            <div>
                <h3 className="font-semibold mb-2">Top Available Players</h3>
                <div className="space-y-2">
                    {topPlayers.map(player => (
                        <div key={player.id} className="rounded-xl border p-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{player.name}</span>
                                    <Badge>{player.position}</Badge>
                                </div>
                                <span className="text-sm text-slate-500">
                                    {Math.round(player.points)} pts
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}