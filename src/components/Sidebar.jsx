import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Dna, Network, Brain, Users, FolderGit2,
  Map, Trophy, Zap, CalendarHeart, ChevronRight, Handshake, Info, Mail, UsersRound, CalendarDays
} from 'lucide-react'

const navSections = [
  {
    label: 'Dashboard',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: 'LIVE' },
    ]
  },
  {
    label: 'Club',
    items: [
      { to: '/about', icon: Info, label: 'About' },
      { to: '/team', icon: UsersRound, label: 'Team', badge: 'WIP' },
    ]
  },
  {
    label: 'Events',
    items: [
      { to: '/upcoming-events', icon: CalendarDays, label: 'Upcoming Events', badge: 'WIP' },
      { to: '/ai-events', icon: CalendarHeart, label: 'AI Event Generator', badge: 'NEW' },
    ]
  },
  {
    label: 'Learning Hub',
    items: [
      { to: '/ai-study-partner', icon: Brain, label: 'AI Study Partner' },
      { to: '/learning-paths', icon: Map, label: 'Learning Paths' },
      { to: '/journey', icon: Zap, label: 'My Journey' },
    ]
  },
  {
    label: 'Community',
    items: [
      { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
      { to: '/skill-genome', icon: Dna, label: 'Skill Map' },
      { to: '/coding-graph', icon: Network, label: 'Campus Coding Network' },
    ]
  },
  {
    label: 'Collaboration',
    items: [
      { to: '/team-builder', icon: Users, label: 'Team Builder' },
      { to: '/ai-collab', icon: Handshake, label: 'AI Collab Finder', badge: 'NEW' },
      { to: '/projects', icon: FolderGit2, label: 'Project Ecosystem' },
    ]
  },
  {
    label: 'Support',
    items: [
      { to: '/contact', icon: Mail, label: 'Contact' },
    ]
  }
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="sidebar-logo" style={{ gap: '12px', alignItems: 'center' }}>
        <div style={{ color: 'var(--emerald)', fontSize: '26px', fontWeight: 'bold', fontFamily: 'var(--font-mono)', letterSpacing: '3px' }}>{`</>`}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#ffffff', fontSize: '15px', fontWeight: '700', letterSpacing: '-0.3px' }}>GFG Campus Club</span>
          <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '500', fontFamily: 'var(--font-mono)' }}>RIT</span>
        </div>
      </NavLink>

      <nav className="sidebar-nav">
        {navSections.map(section => (
          <div className="sidebar-section" key={section.label}>
            <div className="sidebar-section-label">{section.label}</div>
            {section.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
              >
                <item.icon className="nav-icon" size={18} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && <span className="sidebar-badge">{item.badge}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/journey" className="sidebar-user" style={{ textDecoration: 'none' }}>
          <div className="user-avatar">S</div>
          <div className="user-info">
            <div className="user-name">Sam Houston</div>
            <div className="user-role">4th Yr • CSE</div>
          </div>
          <ChevronRight size={15} style={{ color: 'var(--text-muted)', marginLeft: 'auto' }} />
        </NavLink>
      </div>
    </aside>
  )
}
