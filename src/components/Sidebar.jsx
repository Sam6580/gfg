import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Dna, Network, Brain, Users, FolderGit2,
  Map, Trophy, Zap, CalendarHeart, ChevronRight, Handshake, Info, Mail
} from 'lucide-react'

const navSections = [
  {
    label: 'Overview',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: 'LIVE' },
      { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    ]
  },
  {
    label: 'Intelligence',
    items: [
      { to: '/skill-genome', icon: Dna, label: 'Skill Genome' },
      { to: '/coding-graph', icon: Network, label: 'Coding Graph' },
      { to: '/ai-events', icon: CalendarHeart, label: 'AI Events', badge: 'NEW' },
      { to: '/ai-collab', icon: Handshake, label: 'AI Collab Finder', badge: 'NEW' },
    ]
  },
  {
    label: 'Learning',
    items: [
      { to: '/ai-study-partner', icon: Brain, label: 'AI Study Partner' },
      { to: '/learning-paths', icon: Map, label: 'Learning Paths' },
      { to: '/journey', icon: Zap, label: 'My Journey' },
    ]
  },
  {
    label: 'Collaboration',
    items: [
      { to: '/team-builder', icon: Users, label: 'Team Builder' },
      { to: '/projects', icon: FolderGit2, label: 'Project Ecosystem' },
    ]
  },
  {
    label: 'Info',
    items: [
      { to: '/about', icon: Info, label: 'About' },
      { to: '/contact', icon: Mail, label: 'Contact' },
    ]
  }
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="sidebar-logo" style={{ gap: '12px' }}>
        <div style={{ color: 'var(--emerald)', fontSize: '26px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>{`</>`}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '22px', fontWeight: 'bold' }}>
          <span style={{ color: '#ffffff' }}>GFG</span>
          <span style={{ color: '#94a3b8', fontWeight: '600' }}>Club</span>
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
