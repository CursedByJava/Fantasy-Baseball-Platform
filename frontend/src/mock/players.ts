import { Player } from '../types'


// connect to api
export const PLAYERS: Player[] = [
{ id: '1', name: 'Mike Stanton', position: 'OF', mlbTeam: 'NYM', age: 28, bats: 'R', throws: 'R', stats: { avg: 0.291, hr: 38, rbi: 112, sb: 9, obp: 0.365, ops: 0.925, def: 72, spd: 70 } },
{ id: '2', name: 'Luis García', position: '2B', mlbTeam: 'HOU', age: 25, bats: 'L', throws: 'R', stats: { avg: 0.302, hr: 16, rbi: 64, sb: 24, obp: 0.358, ops: 0.812, def: 78, spd: 86 } },
{ id: '3', name: 'Kyle Bennett', position: '1B', mlbTeam: 'ATL', age: 30, bats: 'L', throws: 'R', stats: { avg: 0.276, hr: 27, rbi: 96, sb: 3, obp: 0.345, ops: 0.820, def: 68, spd: 40 } },
{ id: '4', name: 'Masato Aoki', position: 'SS', mlbTeam: 'SEA', age: 26, bats: 'R', throws: 'R', stats: { avg: 0.318, hr: 10, rbi: 58, sb: 31, obp: 0.374, ops: 0.790, def: 90, spd: 91 } },
{ id: '5', name: 'Evan Porter', position: '3B', mlbTeam: 'BAL', age: 29, bats: 'R', throws: 'R', stats: { avg: 0.268, hr: 31, rbi: 102, sb: 5, obp: 0.339, ops: 0.845, def: 75, spd: 55 } },
{ id: '6', name: 'Diego Morales', position: 'C', mlbTeam: 'SD', age: 27, bats: 'S', throws: 'R', stats: { avg: 0.262, hr: 22, rbi: 78, sb: 2, obp: 0.330, ops: 0.770, def: 88, spd: 32 } },
{ id: "7", name: "Sean O'Rourke", position: 'OF', mlbTeam: 'BOS', age: 24, bats: 'L', throws: 'L', stats: { avg: 0.284, hr: 19, rbi: 71, sb: 18, obp: 0.355, ops: 0.815, def: 80, spd: 83 } },
{ id: '8', name: 'Victor Ruiz', position: 'OF', mlbTeam: 'LAD', age: 31, bats: 'R', throws: 'R', stats: { avg: 0.301, hr: 25, rbi: 88, sb: 12, obp: 0.372, ops: 0.879, def: 76, spd: 74 } },
{ id: '9', name: 'Noah Price', position: 'SP', mlbTeam: 'PHI', age: 27, bats: 'R', throws: 'R', stats: { era: 3.21, whip: 1.11, k9: 9.8, bb9: 2.3, qs: 20, def: 50, spd: 20 }, pitcher: true },
{ id: '10', name: 'Rafael Santos', position: 'RP', mlbTeam: 'TB', age: 29, bats: 'R', throws: 'R', stats: { era: 2.41, whip: 0.98, k9: 11.9, sv: 34, hold: 9, def: 40, spd: 15 }, pitcher: true },
]