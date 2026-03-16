import { useState, useEffect } from 'react'
import { FolderGit2, Plus, X, Lightbulb, Users, ArrowRight } from 'lucide-react'
import { projectsAPI } from '../api'

const domainColors  = { 'AI/ML':'violet','AI':'violet','Blockchain':'emerald','Sustainability':'emerald','Healthcare':'rose','EdTech':'cyan','Web':'blue','Mobile':'amber','Open':'cyan' }
const tagColorMap   = { Python:'cyan',React:'blue',Flutter:'emerald',Solidity:'amber',LLM:'violet',NLP:'violet',FastAPI:'cyan','Computer Vision':'pink','Edge AI':'emerald',Docker:'blue',Go:'cyan',WebSocket:'amber',IPFS:'violet','Web3.js':'violet',Firebase:'amber','Node.js':'emerald','React Native':'amber','TensorFlow Lite':'violet',SQLite:'blue' }

export default function ProjectEcosystem() {
  const [projects,  setProjects]  = useState([])
  const [loading,   setLoading]   = useState(true)
  const [showAdd,   setShowAdd]   = useState(false)
  const [expanded,  setExpanded]  = useState(null)
  const [filter,    setFilter]    = useState('All')
  const [newTitle,  setNewTitle]  = useState('')
  const [newDesc,   setNewDesc]   = useState('')
  const [newDomain, setNewDomain] = useState('AI/ML')
  const [saving,    setSaving]    = useState(false)

  useEffect(() => {
    projectsAPI.list()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const domains = ['All', ...Array.from(new Set(projects.map(p => p.domain)))]
  const visible  = filter === 'All' ? projects : projects.filter(p => p.domain === filter)

  const addProject = async () => {
    if (!newTitle.trim()) return
    setSaving(true)
    try {
      const created = await projectsAPI.create({
        title: newTitle, domain: newDomain, desc: newDesc || 'A brand-new project idea. Looking for collaborators!',
        tags: [newDomain], openRoles: ['Backend', 'Frontend', 'AI/ML'],
      })
      setProjects(prev => [created, ...prev])
      setNewTitle(''); setNewDesc(''); setShowAdd(false)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleStar = async (id) => {
    try {
      const res = await projectsAPI.star(id)
      setProjects(prev => prev.map(p => p._id === id ? { ...p, stars: res.stars } : p))
    } catch (err) { console.error(err) }
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 48, height: 48, border: '3px solid rgba(0,229,255,0.2)', borderTop: '3px solid var(--cyan)', borderRadius: '50%', animation: 'rotate360 0.9s linear infinite' }} />
      <div style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', fontSize: 13 }}>Loading projects…</div>
    </div>
  )

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// OPEN ECOSYSTEM</div>
        <h1><span className="gradient-text">Project Ecosystem</span></h1>
        <p>Browse exciting project ideas from across campus. The AI matches you with the best collaborators based on your skills.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {domains.map(d => <button key={d} className={`skill-tag ${filter === d ? 'selected' : ''}`} onClick={() => setFilter(d)}>{d}</button>)}
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? <><X size={15} /> Cancel</> : <><Plus size={15} /> Post Idea</>}
        </button>
      </div>

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
                {['AI/ML','Web','Mobile','Blockchain','Healthcare','Sustainability','EdTech'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: 14 }}>
            <label className="form-label">Description</label>
            <textarea className="form-textarea" placeholder="Describe your idea briefly…" value={newDesc} onChange={e => setNewDesc(e.target.value)} style={{ minHeight: 70 }} />
          </div>
          <button className="btn btn-primary" onClick={addProject} disabled={saving}>
            {saving ? 'Saving…' : <><Plus size={15} /> Submit Idea</>}
          </button>
        </div>
      )}

      <div className="grid-auto">
        {visible.map((proj, i) => (
          <div className="project-card" key={proj._id} style={{ animationDelay: `${i * 0.07}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'flex-start' }}>
              <span className={`tag tag-${domainColors[proj.domain] ?? 'cyan'}`}>{proj.domain}</span>
              <button onClick={() => handleStar(proj._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'var(--amber)', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 4 }}>
                ⭐ {proj.stars}
              </button>
            </div>

            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, lineHeight: 1.3 }}>{proj.title}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.55 }}>{proj.desc}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {(proj.tags || []).map(t => <span key={t} className={`tag tag-${tagColorMap[t] ?? 'cyan'}`}>{t}</span>)}
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 1 }}>Open Roles</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {(proj.openRoles || []).map(r => <span key={r} className="tag tag-amber">{r}</span>)}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Users size={11} /> AI-Suggested Collaborators
              </div>
              {(expanded === proj._id ? proj.suggestedCollaborators : (proj.suggestedCollaborators || []).slice(0,2)).map((s, j) => {
                const u = s.user || s
                return (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: (u.color || '#00e5ff') + '22', color: u.color || '#00e5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10, flexShrink: 0 }}>{u.initials || '?'}</div>
                    <span style={{ fontSize: 13, flex: 1 }}>{u.name || 'Student'}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{s.assignedRole}</span>
                  </div>
                )
              })}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cyan)', fontSize: 12, fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }} onClick={() => setExpanded(p => p === proj._id ? null : proj._id)}>
                {expanded === proj._id ? '↑ Less' : <><ArrowRight size={12} /> View All + Join</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
