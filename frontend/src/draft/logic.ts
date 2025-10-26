import type { Player } from '../types';
import type { DraftState, Pick, Drafter } from './types';


export function buildSerpentineOrder(drafters: Drafter[], rounds: number): string[] {
    const base = drafters.map(d => d.id);
    const order: string[] = [];
    for (let r = 0; r < rounds; r++) {
        const seq = r % 2 === 0 ? base : [...base].reverse();
        order.push(...seq);
    }
    return order;
}


export function scorePlayer(p: Player): number {
    if ((p as any).pitcher) {
        const k9 = (p as any).stats.k9 ?? 0;
        const era = (p as any).stats.era ?? 5;
        const whip = (p as any).stats.whip ?? 1.3;
        return k9 * 10 + (10 - era) * 6 + (2 - whip) * 12;
    }
    const s = (p as any).stats;
    return (s.hr ?? 0) * 4 + (s.rbi ?? 0) * 0.8 + (s.sb ?? 0) * 2 + ((s.avg ?? 0.25) - 0.25) * 400;
}


export function bestAvailable(players: Player[], taken: Set<string>): Player | undefined {
    return [...players]
    .filter(p => !taken.has(p.id))
    .sort((a,b) => scorePlayer(b) - scorePlayer(a))[0];
}


export function nextPickDeadline(seconds: number): number {
    return Date.now() + seconds * 1000;
}


export function finalizePick(state: DraftState, teamId: string, playerId: string): DraftState {
    const idx = state.currentPickIndex;
    const pick = state.picks[idx];
    const drafted = new Set(Array.isArray(state.draftedPlayerIds) ? state.draftedPlayerIds : state.draftedPlayerIds);
    if (drafted.has(playerId)) return state;


    const updated: DraftState = {
        ...state,
        picks: state.picks.map((p, i) => i === idx ? { ...p, playerId, teamId, timestamp: Date.now() } : p),
        draftedPlayerIds: Array.from(new Set([...drafted, playerId])),
    };


    const nextIndex = idx + 1;
    if (nextIndex >= state.picks.length) {
        return { ...updated, phase: 'COMPLETE', currentPickIndex: idx, pickEndsAt: undefined };
    }
    return {
        ...updated,
        phase: 'ON_THE_CLOCK',
        currentPickIndex: nextIndex,
        pickEndsAt: nextPickDeadline(state.pickSeconds),
    };
}