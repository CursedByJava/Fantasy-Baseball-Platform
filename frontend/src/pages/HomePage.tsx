import { Link } from 'react-router-dom'
import TipsCard from './TipsCard'


export default function HomePage() {
    return (
        <div className="grid grid-cols-1 gap-6 items-start">
            <div className="rounded-2xl border bg-white p-6">
                <h2 className="text-xl font-semibold">Welcome to MLD!</h2>
                <p className="text-slate-600 mt-2">Draft players, build your roster, and track category totals.</p>
                <div className="mt-4 flex gap-2">
                    <Link to="/players" className="px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700">Start Drafting</Link>
                    <Link to="/team" className="px-4 py-3 rounded-xl border hover:bg-blue-200">View Team</Link>
                </div>
            </div>
            <TipsCard />
        </div>
    )
}