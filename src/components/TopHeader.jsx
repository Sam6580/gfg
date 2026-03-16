import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Search, Wifi, Sun, Moon } from 'lucide-react'

const tickerItems = [
  { label: 'Active Coders', value: '184' },
  { label: 'Problems Solved', value: '3,420' },
  { label: 'Ongoing Projects', value: '47' },
  { label: 'Events This Month', value: '8' },
  { label: 'New Members', value: '23' },
]

const pageTitles = {
  '/dashboard':       'Live Dashboard',
  '/skill-genome':    'Campus Skill Genome',
  '/coding-graph':    'Coding Network Graph',
  '/ai-study-partner':'AI Study Partner',
  '/team-builder':    'Intelligent Team Builder',
  '/projects':        'Project Ecosystem',
  '/learning-paths':  'Adaptive Learning Paths',
  '/journey':         'My Coding Journey',
  '/ai-events':       'AI Event Generator',
  '/leaderboard':     'Campus Leaderboard',
}

export default function TopHeader() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'GFG Club'
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [isLight])

  // Duplicate ticker items for seamless loop
  const allItems = [...tickerItems, ...tickerItems]

  return (
    <header className="top-header">
      <span className="header-title">{title}</span>

      <div className="header-ticker">
        <div className="ticker-track">
          {allItems.map((item, i) => (
            <span className="ticker-item" key={i}>
              <span className="ticker-dot" />
              {item.label}: <span className="ticker-value">{item.value}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="header-actions">
        <div className="live-badge">
          <Wifi size={11} />
          LIVE
        </div>
        <button className="btn-icon" aria-label="Toggle Theme" onClick={() => setIsLight(!isLight)}>
          {isLight ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <button className="btn-icon" aria-label="Search" onClick={() => alert('Search clicked!')}>
          <Search size={16} />
        </button>
        <button className="btn-icon" aria-label="Notifications" style={{ position: 'relative' }} onClick={() => alert('Notifications clicked!')}>
          <Bell size={16} />
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--rose)',
            boxShadow: '0 0 6px var(--rose)'
          }} />
        </button>
      </div>
    </header>
  )
}
