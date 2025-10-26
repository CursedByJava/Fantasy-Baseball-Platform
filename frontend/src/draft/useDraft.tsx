import React from 'react'
import { PLAYERS } from '../mock/players'
import type { Player } from '../types'
import type { Drafter, DraftState } from './types'
import { buildSerpentineOrder, bestAvailable, finalizePick, nextPickDeadline } from './logic'


const KEY = 'fantasy-draft-state-v1'


export function useDraftRoom(drafters: Drafter[], rounds = 5, secondsPerPick = 30) {
    const [state, setState] = React.useState<DraftState>(() => {
        const raw = localStorage.getItem(KEY)
        if (raw) {
            try { return JSON.parse(raw) as DraftState } catch {}
        }
        const order = buildSerpentineOrder(drafters, rounds)
        const picks = order.map((teamId, i) => ({ overall: i+1, round: Math.floor(i/drafters.length)+1, slotIndex: i % drafters.length, teamId }))
        return {
            id: 'local-mock', phase: 'ON_THE_CLOCK', draftOrder: order, currentPickIndex: 0, picks,
            pickSeconds: secondsPerPick, pickEndsAt: nextPickDeadline(secondsPerPick), draftedPlayerIds: []
        }
    })


    const draftedSet = React.useMemo(() => new Set(Array.isArray(state.draftedPlayerIds) ? state.draftedPlayerIds : state.draftedPlayerIds), [state.draftedPlayerIds])


    React.useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)) }, [state])


    React.useEffect(() => {
        if (state.phase !== 'ON_THE_CLOCK' || !state.pickEndsAt) return
        const id = window.setInterval(() => {
        if (Date.now() >= (state.pickEndsAt as number)) {
            window.clearInterval(id)
            const currentTeamId = state.picks[state.currentPickIndex].teamId as string
            const currentDrafter = drafters.find(d => d.id === currentTeamId)!
            const queuePick = currentDrafter.autopickQueue.find(pid => !draftedSet.has(pid))
            const fallback = bestAvailable(PLAYERS as Player[], draftedSet)
            const chosen = queuePick ?? fallback?.id
            if (chosen) setState(s => finalizePick(s, currentTeamId, chosen))
        }
        }, 250)
        return () => window.clearInterval(id)
    }, [state.phase, state.pickEndsAt, state.currentPickIndex, state.picks, drafters, draftedSet])


    function submitPick(teamId: string, playerId: string) {
        setState(s => finalizePick(s, teamId, playerId))
    }


    function resetDraft() {
        localStorage.removeItem(KEY)
        window.location.reload()
    }


    return { state, setState, submitPick, resetDraft, draftedSet, players: PLAYERS as Player[] }
}