import { Link } from 'react-router-dom'
import TipsCard from './TipsCard'


export default function HomePage() {
    return (
        <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 rounded-2xl border bg-white p-6">
                <h2 className="text-xl font-semibold">Welcome to FantasyBase</h2>
                <p className="text-slate-600 mt-2">Draft players, build your roster, and track category totals. This front-end is self-contained with mock data while the backend comes later.</p>
                <div className="mt-4 flex gap-2">
                    <Link to="/players" className="px-4 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">Start Drafting</Link>
                    <Link to="/team" className="px-4 py-3 rounded-xl border">View Team</Link>
                </div>
            </div>
            <TipsCard />
        </div>
    )
}