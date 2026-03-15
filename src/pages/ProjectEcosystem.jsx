import { useState } from 'react'
import { FolderGit2, Plus, X, Lightbulb, Users, ArrowRight } from 'lucide-react'

const initialProjects = [
  {
    id: 1, title: 'Smart Traffic Monitoring System', domain: 'AI/ML',
    desc: 'Real-time traffic density analysis using computer vision. Edge deployment on Raspberry Pi.',
    tags: ['Computer Vision', 'Edge AI', 'Python'], stars: 24, openRoles: ['ML Engineer', 'Embedded Dev', 'Frontend'],
    suggested: [
      { initials: 'RS', name: 'Rahul Singh', color: '#a855f7', role: 'Computer Vision' },
      { initials: 'PK', name: 'Priya Kumar', color: '#ec4899', role: 'Frontend' },
      { initials: 'AJ', name: 'Arjun Joshi', color: '#10b981', role: 'Embedded Systems' },
    ]
  },
  {
    id: 2, title: 'CampusBot — AI for Student Queries', domain: 'AI',
    desc: 'LLM-powered conversational assistant for answering campus queries about fees, events, timetables.',
    tags: ['LLM', 'NLP', 'FastAPI', 'React'], stars: 31, openRoles: ['Backend', 'AI/ML', 'UI/UX'],
    suggested: [
      { initials: 'SH', name: 'Sam Houston', color: '#00e5ff', role: 'Backend' },
      { initials: 'NV', name: 'Neha Verma', color: '#f43f5e', role: 'AI/ML' },
      { initials: 'AJ', name: 'Arjun Joshi', color: '#10b981', role: 'UI/UX' },
    ]
  },
  {
    id: 3, title: 'GreenTrack — Carbon Footprint Logger', domain: 'Sustainability',
    desc: 'Mobile app that tracks personal carbon footprint with gamification and leaderboard.',
    tags: ['Flutter', 'Node.js', 'Firebase'], stars: 19, openRoles: ['Mobile Dev', 'Backend', 'UI/UX'],
    suggested: [
      { initials: 'KP', name: 'Karan Patel', color: '#3b82f6', role: 'Mobile Dev' },
      { initials: 'SM', name: 'Sara Menon', color: '#f59e0b', role: 'Backend' },
      { initials: 'AJ', name: 'Arjun Joshi', color: '#10b981', role: 'UI/UX' },
    ]
  },
  {
    id: 4, title: 'DecentraVote — Blockchain Election', domain: 'Blockchain',
    desc: 'Tamper-proof campus election system built on Ethereum. Transparent, auditable, anonymous.',
    tags: ['Solidity', 'Web3.js', 'IPFS'], stars: 15, openRoles: ['Blockchain Dev', 'Frontend', 'Security'],
    suggested: [
      { initials: 'VB', name: 'Vikram Bose', color: '#84cc16', role: 'Blockchain' },
      { initials: 'PK', name: 'Priya Kumar', color: '#ec4899', role: 'Frontend' },
      { initials: 'AR', name: 'Aisha Raza', color: '#06b6d4', role: 'Security' },
    ]
  },
  {
    id: 5, title: 'HealthPulse — Rural Diagnostics', domain: 'Healthcare',
    desc: 'Low-bandwidth mobile diagnostic tool for rural clinics. Offline-first with AI triage.',
    tags: ['React Native', 'TensorFlow Lite', 'SQLite'], stars: 27, openRoles: ['Mobile Dev', 'AI/ML', 'Backend'],
    suggested: [
      { initials: 'KP', name: 'Karan Patel', color: '#3b82f6', role: 'Mobile Dev' },
      { initials: 'RS', name: 'Rahul Singh', color: '#a855f7', role: 'AI/ML' },
      { initials: 'DM', name: 'Dev Mishra', color: '#8b5cf6', role: 'Backend' },
    ]
  },
  {
    id: 6, title: 'CodeDuel — Real-time CP Arena', domain: 'EdTech',
    desc: 'Competitive programming duel platform. Real-time multi-room coding battles with live judge.',
    tags: ['WebSocket', 'Go', 'React', 'Docker'], stars: 38, openRoles: ['Backend', 'Frontend', 'DevOps'],
    suggested: [
      { initials: 'SH', name: 'Sam Houston', color: '#00e5ff', role: 'Backend' },
      { initials: 'PK', name: 'Priya Kumar', color: '#ec4899', role: 'Frontend' },
      { initials: 'DM', name: 'Dev Mishra', color: '#8b5cf6', role: 'DevOps' },
    ]
  },
]

const domainColors = {
  'AI/ML': 'violet', 'AI': 'violet', 'Blockchain': 'emerald',
  'Sustainability': 'emerald', 'Healthcare': 'rose', 'EdTech': 'cyan', 'Web': 'blue'
}

const tagColorMap = { Python: 'cyan', React: 'blue', Flutter: 'emerald', Solidity: 'amber', LLM: 'violet', NLP: 'violet', FastAPI: 'cyan', 'Computer Vision': 'pink', 'Edge AI': 'emerald', Docker: 'blue', Go: 'cyan', WebSocket: 'amber', IPFS: 'violet', 'Web3.js': 'violet', Firebase: 'amber', 'Node.js': 'emerald' }

export default function ProjectEcosystem() {
  const [projects, setProjects] = useState(initialProjects)
  const [showAdd, setShowAdd] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newDomain, setNewDomain] = useState('AI/ML')
  const [filter, setFilter] = useState('All')

  const domains = ['All', ...Array.from(new Set(projects.map(p => p.domain)))]
  const visible = filter === 'All' ? projects : projects.filter(p => p.domain === filter)

  const addProject = () => {
    if (!newTitle.trim()) return
    setProjects(prev => [{
      id: Date.now(), title: newTitle, domain: newDomain, desc: newDesc || 'A brand-new project idea. Looking for collaborators!',
      tags: [newDomain], stars: 0, openRoles: ['Backend', 'Frontend', 'AI/ML'],
      suggested: [
        { initials: 'RS', name: 'Rahul Singh', color: '#a855f7', role: 'AI/ML' },
        { initials: 'PK', name: 'Priya Kumar', color: '#ec4899', role: 'Frontend' },
      ]
    }, ...prev])
    setNewTitle(''); setNewDesc(''); setShowAdd(false)
  }

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// OPEN ECOSYSTEM</div>
        <h1><span className="gradient-text">Project Ecosystem</span></h1>
        <p>Browse exciting project ideas from across campus. The AI matches you with the best collaborators based on your skills.</p>
      </div>

      {/* Filter + Add */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {domains.map(d => (
            <button
              key={d}
              className={`skill-tag ${filter === d ? 'selected' : ''}`}
              onClick={() => setFilter(d)}
            >{d}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? <><X size={15} /> Cancel</> : <><Plus size={15} /> Post Idea</>}
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="glass-card card-glow-cyan anim-fade-in-up" style={{ padding: 22, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lightbulb size={18} style={{ color: 'var(--cyan)' }} /> Post a New Project Idea
          </div>
          <div className="grid-2" style={{ gap: 14 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Project Title</label>
              <input className="form-input" placeholder="e.g. Smart Parking System" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Domain</label>
              <select className="form-select" value={newDomain} onChange={e => setNewDomain(e.target.value)}>
                {['AI/ML', 'Web', 'Mobile', 'Blockchain', 'Healthcare', 'Sustainability', 'EdTech'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: 14 }}>
            <label className="form-label">Description</label>
            <textarea className="form-textarea" placeholder="Describe your idea briefly…" value={newDesc} onChange={e => setNewDesc(e.target.value)} style={{ minHeight: 70 }} />
          </div>
          <button className="btn btn-primary" onClick={addProject}><Plus size={15} /> Submit Idea</button>
        </div>
      )}

      {/* Project Cards */}
      <div className="grid-auto">
        {visible.map((proj, i) => (
          <div className="project-card" key={proj.id} style={{ animationDelay: `${i * 0.07}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'flex-start' }}>
              <span className={`tag tag-${domainColors[proj.domain] ?? 'cyan'}`}>{proj.domain}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 4 }}>
                ⭐ {proj.stars}
              </span>
            </div>

            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, lineHeight: 1.3 }}>{proj.title}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.55 }}>{proj.desc}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {proj.tags.map(t => <span key={t} className={`tag tag-${tagColorMap[t] ?? 'cyan'}`}>{t}</span>)}
            </div>

            {/* Open roles */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 1 }}>Open Roles</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {proj.openRoles.map(r => <span key={r} className="tag tag-amber">{r}</span>)}
              </div>
            </div>

            {/* Suggested */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Users size={11} /> AI-Suggested Collaborators
              </div>
              {(expanded === proj.id ? proj.suggested : proj.suggested.slice(0,2)).map((s, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.color + '22', color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10, flexShrink: 0 }}>
                    {s.initials}
                  </div>
                  <span style={{ fontSize: 13, flex: 1 }}>{s.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{s.role}</span>
                </div>
              ))}
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cyan)', fontSize: 12, fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}
                onClick={() => setExpanded(p => p === proj.id ? null : proj.id)}
              >
                {expanded === proj.id ? '↑ Less' : <><ArrowRight size={12} /> View All + Join</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
