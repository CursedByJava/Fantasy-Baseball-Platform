import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import type { Hitter, Pitcher } from '../types'


export function HitterRadar({ p }: { p: Hitter }) {
    const data = [
        { k: 'Power', v: p.stats.hr ? Math.min(100, (p.stats.hr/45)*100) : 20 },
        { k: 'AVG', v: p.stats.avg ? Math.min(100, ((p.stats.avg-0.200)/0.120)*100) : 20 },
        { k: 'OBP', v: p.stats.obp ? Math.min(100, ((p.stats.obp-0.250)/0.140)*100) : 20 },
        { k: 'Speed', v: p.stats.sb ? Math.min(100, (p.stats.sb/40)*100) : p.stats.spd ?? 20 },
        { k: 'Defense', v: p.stats.def ?? 50 },
    ]
    return (
        <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
                    <PolarGrid />
                        <PolarAngleAxis dataKey="k" tick={{ fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0,100]} tick={false} />
                    <Radar name="Profile" dataKey="v" fillOpacity={0.3} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}


export function PitcherBars({ p }: { p: Pitcher }) {
    const data = [
        { name: 'K/9', v: p.stats.k9 ?? 0 },
        { name: 'ERA (lower)', v: p.stats.era ? 10 - p.stats.era : 0 },
        { name: 'WHIP (lower)', v: p.stats.whip ? 2 - p.stats.whip : 0 },
        { name: 'Saves', v: p.stats.sv ?? 0 },
    ]
    return (
        <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-10} height={45} />
                <YAxis hide />
                <Tooltip />
                <Legend />
                <Bar dataKey="v" name="Value" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    )
}