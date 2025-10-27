import type { Player, Pitcher, Hitter } from '../types'

export interface PlayerScore {
    id: string
    name: string
    points: number
    position: string
    stats: Record<string, number>
}

export function calculatePlayerPoints(player: Player): number {
    if ((player as Pitcher).pitcher) {
        const p = player as Pitcher
        const stats = p.stats
        
        // Pitching points calculation
        const eraPoints = ((5.0 - (stats.era || 0)) * 10) // Better ERA = more points
        const whipPoints = ((1.5 - (stats.whip || 0)) * 20) // Better WHIP = more points
        const k9Points = ((stats.k9 || 0) * 2) // More strikeouts = more points
        const savePoints = ((stats.sv || 0) * 5) // Saves are valuable
        
        return Math.max(0, eraPoints + whipPoints + k9Points + savePoints)
    } else {
        const h = player as Hitter
        const stats = h.stats
        
        // Hitting points calculation
        const avgPoints = ((stats.avg || 0) * 1000) // Batting average weighted heavily
        const hrPoints = ((stats.hr || 0) * 4) // Home runs very valuable
        const rbiPoints = ((stats.rbi || 0) * 1) // RBIs matter
        const sbPoints = ((stats.sb || 0) * 2) // Steals are bonus
        
        return Math.max(0, avgPoints + hrPoints + rbiPoints + sbPoints)
    }
}

export function getTopPlayers(players: Player[], count: number = 5): PlayerScore[] {
    return players
        .map(player => ({
            id: player.id,
            name: player.name,
            position: player.position,
            points: calculatePlayerPoints(player),
            stats: (player as Pitcher).pitcher ? 
                {
                    era: (player as Pitcher).stats.era || 0,
                    whip: (player as Pitcher).stats.whip || 0,
                    k9: (player as Pitcher).stats.k9 || 0,
                    sv: (player as Pitcher).stats.sv || 0
                } :
                {
                    avg: (player as Hitter).stats.avg || 0,
                    hr: (player as Hitter).stats.hr || 0,
                    rbi: (player as Hitter).stats.rbi || 0,
                    sb: (player as Hitter).stats.sb || 0
                }
        }))
        .sort((a, b) => b.points - a.points)
        .slice(0, count)
}

export function suggestNextDraft(availablePlayers: Player[], currentTeam: Player[]): Player | null {
    // Get positions we already have
    const takenPositions = new Set(currentTeam.map(p => p.position))
    
    // Filter available players by positions we don't have
    const availableByPosition = availablePlayers.filter(p => !takenPositions.has(p.position))
    
    // If no players available for needed positions, return null
    if (availableByPosition.length === 0) return null
    
    // Score all available players
    const scored = availableByPosition.map(player => ({
        player,
        points: calculatePlayerPoints(player)
    }))
    
    // Return the highest scoring available player
    return scored.sort((a, b) => b.points - a.points)[0]?.player || null
}