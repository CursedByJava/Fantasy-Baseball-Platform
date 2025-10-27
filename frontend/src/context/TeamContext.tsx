import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Player, TeamTotals, HitterStats, Pitcher, Hitter } from '../types'


const TEAM_MAX = 10 as const


export interface TeamContextValue {
    team: Player[]
    add: (player: Player) => Promise<boolean>
    remove: (id: string) => void
    clear: () => void
    totals: TeamTotals
}


const TeamContext = createContext<TeamContextValue | null>(null)


function useLocalStorage<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [val, setVal] = useState<T>(() => {
    try {
        const raw = localStorage.getItem(key)
        return raw ? (JSON.parse(raw) as T) : initial
    } catch {
        return initial
    }
    })
    useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)) } catch {} }, [key, val])
    return [val, setVal]
}


export function isPitcher(p: Player): p is Pitcher { return (p as Pitcher).pitcher === true }


export function TeamProvider({ children }: { children: React.ReactNode }) {
    const [team, setTeam] = useLocalStorage<Player[]>('fantasy-team', [])


    const add = async (player: Player) => {
        // Check if player is already in team
        if (team.find(p => p.id === player.id)) return false
        
        // Check if team is full
        if (team.length >= TEAM_MAX) return false
        
        // Check if position is already taken
        if (team.find(p => p.position === player.position)) return false
        
        setTeam(t => [...t, player])
        return true
    }
    const remove = (id: string) => setTeam(t => t.filter(p => p.id!==id))
    const clear = () => setTeam([])


    const totals: TeamTotals = useMemo(() => {
    const hitterStats: Array<keyof Pick<HitterStats,'hr'|'rbi'|'sb'>> = ['hr','rbi','sb']
    const summary: TeamTotals = { hr:0, rbi:0, sb:0, avg:0, countAvg:0, era:0, whip:0, k9:0, sv:0 }
    for (const p of team) {
        if (isPitcher(p)) {
            summary.era += p.stats.era ?? 0
            summary.whip += p.stats.whip ?? 0
            summary.k9 += p.stats.k9 ?? 0
            summary.sv += p.stats.sv ?? 0
        } else {
            for (const k of hitterStats) summary[k] += (p.stats[k] ?? 0) as number
                if (p.stats.avg) { summary.avg += p.stats.avg; summary.countAvg += 1 }
        }
    }
    if (summary.countAvg) summary.avg = summary.avg / summary.countAvg
        return summary
    }, [team])


    const value: TeamContextValue = { team, add, remove, clear, totals }
    return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}


export function useTeam(): TeamContextValue {
    const ctx = useContext(TeamContext)
    if (!ctx) throw new Error('useTeam must be inside TeamProvider')
    return ctx
}


export { TEAM_MAX }