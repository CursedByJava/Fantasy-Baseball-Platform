export default function TipsCard() {
    return (
        <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-6">
            <h4 className="font-semibold mb-2">Tips</h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Use <span className="font-mono">Players</span> to add hitters & pitchers.</li>
                <li>Check <span className="font-mono">Team</span> to see aggregate totals.</li>
                <li>Your roster persists locally (localStorage) until the backend is wired up.</li>
            </ul>
        </div>
    )
}