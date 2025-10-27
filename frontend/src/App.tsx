import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Home as HomeIcon } from 'lucide-react'
import { TeamProvider } from './context/TeamContext'
import { ToastProvider } from './components/Toast'
import HomePage from './pages/HomePage'
import PlayersPage from './pages/PlayersPage'
import TeamPage from './pages/TeamPage'
import PlayerDetailPage from './pages/PlayerDetailPage'
import DraftRoom from './pages/DraftRoom'


function useActivePath() {
  const { pathname } = useLocation()
  return pathname
}


function Nav() {
  const path = useActivePath()
  const linkClass = (p: string) => `px-3 py-2 rounded-xl text-sm ${path===p? 'bg-slate-900 text-white' : 'hover:bg-slate-100'}`
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
        <HomeIcon className="w-5 h-5" /> MLD ENTERPRISES
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/players" className={linkClass('/players')}>Players</Link>
          <Link to="/team" className={linkClass('/team')}>Team</Link>
          <a href="https://example.com" target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl text-sm hover:bg-slate-100">Rules</a>
        </nav>
      </div>
    </header>
  )
}


export default function App() {
  return (
    <TeamProvider>
    <ToastProvider>
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Nav />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/player/:id" element={<PlayerDetailPage />} />
          <Route path="/draft" element={<DraftRoom />} />
          <Route path="*" element={<div className='text-slate-500'>Not Found</div>} />
        </Routes>
      </main>
      <footer className="py-8 text-center text-xs text-slate-500">Will Terry 2025</footer>
    </div>
    </ToastProvider>
    </TeamProvider>
  )
}