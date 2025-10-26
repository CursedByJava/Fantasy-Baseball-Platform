export type DraftPhase = 'WAITING' | 'ON_THE_CLOCK' | 'PICK_MADE' | 'COMPLETE';


export interface Drafter {
    id: string;
    name: string;
    isBot: boolean;
    autopickQueue: string[];
}


export interface Pick {
    overall: number;
    round: number;
    slotIndex: number;
    playerId?: string;
    teamId?: string;
    timestamp?: number;
}


export interface DraftState {
    id: string;
    phase: DraftPhase;
    draftOrder: string[];
    currentPickIndex: number;
    picks: Pick[];
    startedAt?: number;
    pickSeconds: number;
    pickEndsAt?: number;
    draftedPlayerIds: Set<string> | string[];
}