export interface IDraftApi {
    subscribe(cb: (serverState: Partial<unknown>) => void): () => void;
    submitPick(draftId: string, teamId: string, playerId: string): Promise<void>;
    sync(): Promise<void>;
}
    
    
export class MockDraftApi implements IDraftApi {
    subscribe() { return () => {}; }
    async submitPick() { return; }
    async sync() { return; }
}