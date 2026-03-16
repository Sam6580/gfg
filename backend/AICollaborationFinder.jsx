import { useState } from 'react'
import { Handshake, Sparkles, RefreshCw, Search, Star, ChevronRight, Zap, Target } from 'lucide-react'
import { aiAPI } from '../api'

const domains = [
  { label: 'AI / Machine Learning', icon: '🤖', color: '#a855f7' },
  { label: 'Full-Stack Web App',    icon: '🌐', color: '#00e5ff' },
  { label: 'Mobile App',            icon: '📱', color: '#ec4899' },
  { label: 'Data Analytics',        icon: '📊', color: '#f59e0b' },
  { label: 'DevOps / Cloud',        icon: '☁️', color: '#3b82f6' },
  { label: 'Blockchain / Web3',     icon: '⛓️', color: '#84cc16' },
]
const roleOptions = ['ML Engineer','Frontend Dev','Backend Dev','UI/UX Designer','Data Scientist','DevOps Engineer','Mobile Dev','Security Engineer']
const skillTagColor = { 'AI/ML':'emerald','Data Science':'emerald',Python:'emerald',Frontend:'cyan',React:'cyan',Backend:'violet','Node.js':'violet','UI/UX':'pink',Figma:'pink',DevOps:'blue',Cloud:'blue',Docker:'blue',Mobile:'amber','React Native':'amber',Blockchain:'violet',Solidity:'violet',Security:'rose' }

export default function AICollaborationFinder() {
  const [idea,           setIdea]           = useState('')
  const [domain,         setDomain]         = useState('')
  const [selectedRoles,  setSelectedRoles]  = useState([])
  const [results,        setResults]        = useState(null)
  const [loading,        setLoading]        = useState(false)
  const [synergy,        setSynergy]        = useState(0)
  const [aiSource,       setAiSource]       = useState('')
  const [error,          setError]          = useState('')

  const toggleRole = (role) => {
    setSelectedRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : prev.length < 4 ? [...prev, role] : prev)
  }

  const handleFind = async () => {
    if (!idea.trim() || !domain) return
    setLoading(true)
    setError('')
    try {
      const res = await aiAPI.findTeammates({ projectIdea: idea, domain, rolesNeeded: selectedRoles })
      setResults(res.results)
      setSynergy(res.synergy)
      setAiSource(res.source)
    } catch (err) {
      setError('Could not find teammates. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const domainObj = domains.find(d => d.label === domain)

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// COLLABORATION INTELLIGENCE</div>
        <h1><span className="gradient-text">AI Collaboration Finder</span></h1>
        <p>Describe your project idea and let the AI find the perfect teammates — matching real student profiles from the campus database.</p>
      </div>

      <div className="grid-40-60">
        <div>
          <div className="glass-card card-glow-cyan" style={{ padding: 24, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,229,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Handshake size={18} style={{ color: 'var(--cyan)' }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Describe Your Project</span>
            </div>

            <div className="form-group">
              <label className="form-label">Project Idea</label>
              <textarea className="form-textarea" placeholder="e.g. Build an AI-powered study planner that uses NLP to parse syllabus PDFs…" value={idea} onChange={e => setIdea(e.target.value)} rows={4} />
            </div>

            <div className="form-group">
              <label className="form-label">Domain</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {domains.map(d => (
                  <button key={d.label} className={`skill-tag ${domain === d.label ? 'selected' : ''}`} style={{ justifyContent: 'flex-start', gap: 8, padding: '8px 12px' }} onClick={() => setDomain(d.label)}>
                    <span style={{ fontSize: 16 }}>{d.icon}</span>
                    <span style={{ fontSize: 12 }}>{d.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Roles Needed (up to 4)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {roleOptions.map(role => (
                  <button key={role} className={`skill-tag ${selectedRoles.includes(role) ? 'selected' : ''}`} onClick={() => toggleRole(role)}>{role}</button>
                ))}
              </div>
            </div>

            {error && <div style={{ color: 'var(--rose)', fontSize: 12, marginBottom: 10, fontFamily: 'JetBrains Mono' }}>{error}</div>}

            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} onClick={handleFind} disabled={!idea.trim() || !domain || loading}>
              {loading
                ? <><RefreshCw size={16} style={{ animation: 'rotate360 1s linear infinite' }} />AI Scanning Profiles…</>
                : <><Search size={16} />Find Collaborators</>}
            </button>
          </div>

          <div className="glass-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Sparkles size={16} style={{ color: 'var(--violet-bright)' }} />
              <span style={{ fontWeight: 700, fontSize: 14 }}>How It Works</span>
            </div>
            {[
              { icon: '🎯', title: 'Real Student Profiles', desc: 'Scans the actual campus database of registered students.' },
              { icon: '🧠', title: 'Groq LLM Reasoning',   desc: 'AI reads your project idea and reasons about the best skill fit.' },
              { icon: '📊', title: 'Synergy Score',         desc: 'Calculates how well the recommended team covers your needs.' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', borderRadius: 8, background: 'var(--bg-glass)', border: '1px solid var(--border)', marginBottom: 8 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{step.icon}</span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 2 }}>{step.title}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
              <div style={{ width: 56, height: 56, border: '3px solid rgba(0,229,255,0.2)', borderTop: '3px solid var(--cyan)', borderRadius: '50%', animation: 'rotate360 0.9s linear infinite', marginBottom: 20 }} />
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', textAlign: 'center' }}>Groq AI scanning student profiles…</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>Analyzing skill graphs & collaboration history</div>
            </div>
          )}

          {!results && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', opacity: 0.45 }}>
              <Handshake size={56} style={{ color: 'var(--cyan)', marginBottom: 16 }} />
              <div style={{ fontSize: 15, fontWeight: 600, textAlign: 'center', marginBottom: 6 }}>Your ideal teammates will appear here</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>Describe your project idea and hit Find Collaborators.</div>
            </div>
          )}

          {results && !loading && (
            <div className="anim-fade-in-up">
              <div className="glass-card card-glow-cyan" style={{ padding: 20, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <Zap size={18} style={{ color: 'var(--cyan)' }} />
                      <span style={{ fontSize: 16, fontWeight: 700 }}>Team Synergy Score</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                      {domainObj?.icon} {domain} · {results.length} matches found
                      {aiSource && <span style={{ marginLeft: 8 }}>{aiSource === 'ai' ? '· 🤖 Groq AI' : '· 📦 Smart match'}</span>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 28, color: 'var(--cyan)', lineHeight: 1 }}>{synergy}%</div>
                    <div style={{ fontSize: 10, color: 'var(--emerald)', fontFamily: 'JetBrains Mono', marginTop: 2 }}>● EXCELLENT FIT</div>
                  </div>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar progress-cyan" style={{ width: `${synergy}%` }} />
                </div>
              </div>

              <div style={{ background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: 10, padding: '14px 16px', marginBottom: 20, fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--violet-bright)', fontWeight: 600, fontSize: 11, fontFamily: 'JetBrains Mono', display: 'block', marginBottom: 4 }}>🤖 AI ANALYSIS</span>
                Based on your project description, I've identified {results.length} ideal collaborators whose combined skills cover <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>{domain}</span> requirements. This team has complementary expertise with minimal overlap.
              </div>

              <div className="section-title"><span className="dot" /> Recommended Teammates</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {results.map((person, i) => (
                  <div key={person._id || i} className="glass-card" style={{ padding: 20, borderColor: i === 0 ? (person.color + '44') : 'var(--border)', boxShadow: i === 0 ? `0 0 20px ${person.color}15` : 'none', position: 'relative', overflow: 'hidden' }}>
                    {i === 0 && (
                      <div style={{ position: 'absolute', top: 10, right: 10, background: person.color + '22', color: person.color, border: `1px solid ${person.color}44`, borderRadius: 6, padding: '2px 8px', fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 700 }}>#1 BEST MATCH</div>
                    )}
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
                      <div style={{ width: 50, height: 50, borderRadius: '50%', background: person.color + '22', color: person.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{person.initials}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{person.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 6 }}>{person.role} · {person.year} · Rating: {person.rating}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                          {(person.skills || []).map(s => <span key={s} className={`tag tag-${skillTagColor[s] ?? 'cyan'}`}>{s}</span>)}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 20, color: person.color, lineHeight: 1 }}>{person.compatibility}%</div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>match</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 4 }}>
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} size={10} style={{ color: j < Math.round(person.rating / 400) ? person.color : 'rgba(255,255,255,0.15)', fill: j < Math.round(person.rating / 400) ? person.color : 'transparent' }} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {person.aiReason && (
                      <div style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.12)', borderRadius: 8, padding: '10px 12px', fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                        <span style={{ color: 'var(--cyan)', fontWeight: 600, fontSize: 10, fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                          <Target size={10} /> WHY THIS MATCH
                        </span>
                        {person.aiReason}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                      <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}><Handshake size={13} /> Invite to Team</button>
                      <button className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>View Profile <ChevronRight size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
