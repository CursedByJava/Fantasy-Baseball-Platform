export type Position = 'C'|'1B'|'2B'|'3B'|'SS'|'OF'|'SP'|'RP'
export type Hand = 'R'|'L'|'S'


export interface HitterStats { avg: number; hr: number; rbi: number; sb: number; obp: number; ops: number; def: number; spd: number }
export interface PitcherStats { era: number; whip: number; k9: number; bb9?: number; qs?: number; sv?: number; hold?: number; def: number; spd?: number }


interface BasePlayer { id: string; name: string; position: Position; mlbTeam: string; age: number; bats: Hand; throws: Exclude<Hand,'S'> }
export type Hitter = BasePlayer & { pitcher?: false; stats: HitterStats }
export type Pitcher = BasePlayer & { pitcher: true; stats: PitcherStats }
export type Player = Hitter | Pitcher


export interface TeamTotals { hr: number; rbi: number; sb: number; avg: number; countAvg: number; era: number; whip: number; k9: number; sv: number }