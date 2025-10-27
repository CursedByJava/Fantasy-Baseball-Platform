import React, { useEffect, useState } from 'react'
import { calculatePlayerPoints } from '../utils/scoring'
import type { Player } from '../types'

interface TeamScore {
    teamName: string
    points: number
    players: Player[]
}

// Simulated team data - in a real app this would come from an API
const simulatedTeams: { name: string; players: Player[] }[] = [
    { name: "CPU Team 1", players: [] },
    { name: "CPU Team 2", players: [] },
    { name: "CPU Team 3", players: [] }
]

export default function Leaderboard({ userTeam }: { userTeam: Player[] }) {
    const [teams, setTeams] = useState<TeamScore[]>([])

    // Simulate real-time updates
    useEffect(() => {
        const calculateTeamPoints = (players: Player[]) => 
            players.reduce((sum, player) => sum + calculatePlayerPoints(player), 0)

        // Initial calculation
        const initialTeams: TeamScore[] = [
            { 
                teamName: "Your Team", 
                points: calculateTeamPoints(userTeam),
                players: userTeam
            },
            ...simulatedTeams.map(team => ({
                teamName: team.name,
                points: calculateTeamPoints(team.players),
                players: team.players
            }))
        ]

        setTeams(initialTeams.sort((a, b) => b.points - a.points))

        // Simulate real-time updates every 10 seconds
        const interval = setInterval(() => {
            setTeams(prev => {
                const updated = prev.map(team => ({
                    ...team,
                    // Add small random fluctuation to simulate live scoring
                    points: team.teamName === "Your Team" 
                        ? calculateTeamPoints(userTeam)
                        : team.points + (Math.random() * 2 - 1)
                }))
                return updated.sort((a, b) => b.points - a.points)
            })
        }, 10000)

        return () => clearInterval(interval)
    }, [userTeam])

    return (
        <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold mb-4">Live Leaderboard</h3>
            <div className="space-y-3">
                {teams.map((team, index) => (
                    <div 
                        key={team.teamName}
                        className={`p-3 rounded-xl ${
                            index === 0 ? 'bg-yellow-50 border border-yellow-200' :
                            team.teamName === "Your Team" ? 'bg-blue-50 border border-blue-200' :
                            'bg-slate-50 border border-slate-200'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="font-medium">{team.teamName}</span>
                                {index === 0 && (
                                    <span className="ml-2 text-yellow-600 text-sm">👑 Leading</span>
                                )}
                            </div>
                            <span className="font-mono">
                                {Math.round(team.points)} pts
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}