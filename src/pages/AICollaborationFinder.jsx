import { useState } from 'react'
import { Handshake, Sparkles, RefreshCw, Search, Star, ChevronRight, Zap, Target } from 'lucide-react'

const domains = [
  { label: 'AI / Machine Learning', icon: '🤖', color: '#a855f7' },
  { label: 'Full-Stack Web App', icon: '🌐', color: '#00e5ff' },
  { label: 'Mobile App', icon: '📱', color: '#ec4899' },
  { label: 'Data Analytics', icon: '📊', color: '#f59e0b' },
  { label: 'DevOps / Cloud', icon: '☁️', color: '#3b82f6' },
  { label: 'Blockchain / Web3', icon: '⛓️', color: '#84cc16' },
]

const roleOptions = ['ML Engineer', 'Frontend Dev', 'Backend Dev', 'UI/UX Designer', 'Data Scientist', 'DevOps Engineer', 'Mobile Dev', 'Security Engineer']

const candidatePool = [
  { name: 'Rahul Singh',   initials: 'RS', skills: ['AI/ML', 'Data Science', 'Python'],           year: '4th Yr', rating: 1910, color: '#a855f7', role: 'ML Engineer',       bio: 'Published 2 ML papers. Kaggle Expert.' },
  { name: 'Priya Kumar',   initials: 'PK', skills: ['Frontend', 'React', 'UI/UX'],                year: '3rd Yr', rating: 1760, color: '#ec4899', role: 'Frontend Developer', bio: 'Built 5+ production React apps.' },
  { name: 'Arjun Joshi',   initials: 'AJ', skills: ['UI/UX', 'Figma', 'Frontend'],                year: '2nd Yr', rating: 1540, color: '#10b981', role: 'UI/UX Designer',     bio: 'Won campus design hackathon 2x.' },
  { name: 'Sara Menon',    initials: 'SM', skills: ['Backend', 'Node.js', 'Security', 'Cloud'],    year: '3rd Yr', rating: 1680, color: '#f59e0b', role: 'Backend Engineer',   bio: 'Built scalable APIs serving 10k+ users.' },
  { name: 'Neha Verma',    initials: 'NV', skills: ['Data Science', 'AI/ML', 'Cloud', 'Python'],   year: '4th Yr', rating: 1880, color: '#f43f5e', role: 'Data Scientist',     bio: 'Top 5% on Kaggle. Internship at Google.' },
  { name: 'Dev Mishra',    initials: 'DM', skills: ['DevOps', 'Docker', 'Cloud', 'Backend'],       year: '2nd Yr', rating: 1510, color: '#8b5cf6', role: 'DevOps Engineer',    bio: 'Kubernetes certified. CI/CD enthusiast.' },
  { name: 'Karan Patel',   initials: 'KP', skills: ['Mobile', 'React Native', 'Frontend'],         year: '3rd Yr', rating: 1620, color: '#3b82f6', role: 'Mobile Developer',   bio: '3 apps on Play Store, 50k+ downloads.' },
  { name: 'Vikram Bose',   initials: 'VB', skills: ['Blockchain', 'Solidity', 'Backend'],          year: '4th Yr', rating: 1795, color: '#84cc16', role: 'Web3 Developer',     bio: 'Built 2 DeFi protocols. Solidity expert.' },
  { name: 'Aisha Raza',    initials: 'AR', skills: ['Security', 'Backend', 'Cloud'],               year: '3rd Yr', rating: 1720, color: '#06b6d4', role: 'Security Analyst',   bio: 'CTF competitor. Bug bounty hunter.' },
  { name: 'Sam Houston',   initials: 'SH', skills: ['Backend', 'Cloud', 'DevOps', 'Node.js'],      year: '4th Yr', rating: 1824, color: '#00e5ff', role: 'Backend Engineer',   bio: 'Full-stack builder. Open source contributor.' },
]

const domainSkillMap = {
  'AI / Machine Learning': ['AI/ML', 'Data Science', 'Python'],
  'Full-Stack Web App': ['Frontend', 'Backend', 'React', 'Node.js'],
  'Mobile App': ['Mobile', 'React Native', 'Frontend', 'UI/UX'],
  'Data Analytics': ['Data Science', 'Python', 'AI/ML'],
  'DevOps / Cloud': ['DevOps', 'Cloud', 'Docker', 'Backend'],
  'Blockchain / Web3': ['Blockchain', 'Solidity', 'Backend'],
}

const aiReasons = {
  'ML Engineer':       'Strong ML background with proven research publications. Ideal for building core AI models.',
  'Frontend Developer':'Extensive React experience ensures a polished, responsive user interface.',
  'UI/UX Designer':    'Award-winning design skills will create an intuitive, delightful user experience.',
  'Backend Engineer':  'Solid API and systems expertise to handle data flow and server infrastructure.',
  'Data Scientist':    'Deep analytics skill set will power data-driven insights and model evaluation.',
  'DevOps Engineer':   'CI/CD and Kubernetes expertise ensures smooth deployment and scalability.',
  'Mobile Developer':  'Published mobile apps with real-world users. Can ship cross-platform fast.',
  'Web3 Developer':    'Smart contract and protocol expertise to build decentralized features.',
  'Security Analyst':  'Security-first mindset will protect user data and harden the codebase.',
  'Security Engineer': 'Deep security knowledge ensures the infrastructure is robust and safe.',
}

const skillTagColor = {
  'AI/ML': 'emerald', 'Data Science': 'emerald', Python: 'emerald',
  Frontend: 'cyan', React: 'cyan', Backend: 'violet', 'Node.js': 'violet',
  'UI/UX': 'pink', Figma: 'pink', DevOps: 'blue', Cloud: 'blue', Docker: 'blue',
  Mobile: 'amber', 'React Native': 'amber',
  Blockchain: 'violet', Solidity: 'violet',
  Security: 'rose',
}

function findCollaborators(domain, selectedRoles) {
  const relevantSkills = domainSkillMap[domain] || []
  const scored = candidatePool
    .filter(c => c.name !== 'Sam Houston')
    .map(c => {
      const skillMatch = c.skills.filter(s => relevantSkills.includes(s)).length
      const roleMatch = selectedRoles.includes(c.role) ? 2 : 0
      const score = skillMatch * 3 + roleMatch + (c.rating / 600)
      const compatibility = Math.min(98, Math.floor(60 + score * 5 + Math.random() * 8))
      return { ...c, score, compatibility }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)

  return scored
}

export default function AICollaborationFinder() {
  const [idea, setIdea] = useState('')
  const [domain, setDomain] = useState('')
  const [selectedRoles, setSelectedRoles] = useState([])
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [synergy, setSynergy] = useState(0)

  const toggleRole = (role) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : prev.length < 4 ? [...prev, role] : prev
    )
  }

  const handleFind = () => {
    if (!idea.trim() || !domain) return
    setLoading(true)
    setTimeout(() => {
      const matches = findCollaborators(domain, selectedRoles)
      setResults(matches)
      setSynergy(Math.floor(82 + Math.random() * 15))
      setLoading(false)
    }, 2000)
  }

  const domainObj = domains.find(d => d.label === domain)

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// COLLABORATION INTELLIGENCE</div>
        <h1><span className="gradient-text">AI Collaboration Finder</span></h1>
        <p>Describe your project idea and let the AI find the perfect teammates based on skill matching, experience, and collaboration patterns.</p>
      </div>

      <div className="grid-40-60">
        {/* Input Panel */}
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
              <textarea
                className="form-textarea"
                placeholder="e.g. Build an AI-powered study planner that uses NLP to parse syllabus PDFs and creates personalized revision schedules…"
                value={idea}
                onChange={e => setIdea(e.target.value)}
                rows={4}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Domain</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {domains.map(d => (
                  <button
                    key={d.label}
                    className={`skill-tag ${domain === d.label ? 'selected' : ''}`}
                    style={{ justifyContent: 'flex-start', gap: 8, padding: '8px 12px' }}
                    onClick={() => setDomain(d.label)}
                  >
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
                  <button
                    key={role}
                    className={`skill-tag ${selectedRoles.includes(role) ? 'selected' : ''}`}
                    onClick={() => toggleRole(role)}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
              onClick={handleFind}
              disabled={!idea.trim() || !domain || loading}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} style={{ animation: 'rotate360 1s linear infinite' }} />
                  Finding Best Matches…
                </>
              ) : (
                <>
                  <Search size={16} />
                  Find Collaborators
                </>
              )}
            </button>
          </div>

          {/* AI Engine info card */}
          <div className="glass-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Sparkles size={16} style={{ color: 'var(--violet-bright)' }} />
              <span style={{ fontWeight: 700, fontSize: 14 }}>How It Works</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🎯', title: 'Skill Matching', desc: 'Maps your project needs to student skill profiles across the campus.' },
                { icon: '🧠', title: 'AI Reasoning', desc: 'Explains why each person is a strong fit for your specific project.' },
                { icon: '📊', title: 'Synergy Score', desc: 'Calculates how well the recommended team works together.' },
              ].map((step, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, padding: '10px 12px', borderRadius: 8,
                  background: 'var(--bg-glass)', border: '1px solid var(--border)',
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{step.icon}</span>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 2 }}>{step.title}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div>
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
              <div style={{ width: 56, height: 56, border: '3px solid rgba(0,229,255,0.2)', borderTop: '3px solid var(--cyan)', borderRadius: '50%', animation: 'rotate360 0.9s linear infinite', marginBottom: 20 }} />
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', textAlign: 'center' }}>AI scanning 500+ student profiles…</div>
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
              {/* Synergy Score header */}
              <div className="glass-card card-glow-cyan" style={{ padding: 20, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <Zap size={18} style={{ color: 'var(--cyan)' }} />
                      <span style={{ fontSize: 16, fontWeight: 700 }}>Team Synergy Score</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                      {domainObj?.icon} {domain} • {results.length} matches found
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

              {/* AI Summary */}
              <div style={{
                background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.15)',
                borderRadius: 10, padding: '14px 16px', marginBottom: 20, fontSize: 12.5,
                color: 'var(--text-secondary)', lineHeight: 1.6
              }}>
                <span style={{ color: 'var(--violet-bright)', fontWeight: 600, fontSize: 11, fontFamily: 'JetBrains Mono', display: 'block', marginBottom: 4 }}>🤖 AI ANALYSIS</span>
                Based on your project description, I've identified {results.length} ideal collaborators whose combined skills cover{' '}
                <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>{domain}</span> requirements.
                This team has complementary expertise with minimal overlap, maximizing overall coverage and productivity.
              </div>

              {/* Recommended Teammate Cards */}
              <div className="section-title"><span className="dot" /> Recommended Teammates</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {results.map((person, i) => (
                  <div
                    key={person.name}
                    className="glass-card"
                    style={{
                      padding: 20,
                      borderColor: i === 0 ? person.color + '44' : 'var(--border)',
                      boxShadow: i === 0 ? `0 0 20px ${person.color}15` : 'none',
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    {i === 0 && (
                      <div style={{
                        position: 'absolute', top: 10, right: 10,
                        background: person.color + '22', color: person.color,
                        border: `1px solid ${person.color}44`, borderRadius: 6,
                        padding: '2px 8px', fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 700
                      }}>
                        #1 BEST MATCH
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
                      <div style={{
                        width: 50, height: 50, borderRadius: '50%',
                        background: person.color + '22', color: person.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 16, flexShrink: 0
                      }}>
                        {person.initials}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{person.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 6 }}>
                          {person.role} · {person.year} · Rating: {person.rating}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                          {person.skills.map(s => (
                            <span key={s} className={`tag tag-${skillTagColor[s] ?? 'cyan'}`}>{s}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 20, color: person.color, lineHeight: 1 }}>
                          {person.compatibility}%
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>match</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 4 }}>
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} size={10} style={{
                              color: j < Math.round(person.rating / 400) ? person.color : 'rgba(255,255,255,0.15)',
                              fill: j < Math.round(person.rating / 400) ? person.color : 'transparent'
                            }} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 10, fontStyle: 'italic' }}>
                      "{person.bio}"
                    </div>

                    {/* AI Reason */}
                    <div style={{
                      background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.12)',
                      borderRadius: 8, padding: '10px 12px', fontSize: 12.5,
                      color: 'var(--text-secondary)', lineHeight: 1.55
                    }}>
                      <span style={{ color: 'var(--cyan)', fontWeight: 600, fontSize: 10, fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                        <Target size={10} /> WHY THIS MATCH
                      </span>
                      {aiReasons[person.role] || 'Strong skill alignment with your project requirements.'}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                      <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                        <Handshake size={13} /> Invite to Team
                      </button>
                      <button className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        View Profile <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick team summary */}
              <div className="glass-card" style={{ padding: 18, marginTop: 20 }}>
                <div className="section-title" style={{ fontSize: 13, marginBottom: 12 }}>
                  <span className="dot" style={{ background: 'var(--emerald)' }} /> Skill Coverage for Your Project
                </div>
                {(domainSkillMap[domain] || []).map(skill => {
                  const covered = results.some(m => m.skills.includes(skill))
                  return (
                    <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: covered ? 'var(--emerald)' : 'rgba(255,255,255,0.15)',
                        boxShadow: covered ? '0 0 6px var(--emerald)' : 'none'
                      }} />
                      <span style={{ fontSize: 13, flex: 1 }}>{skill}</span>
                      <span style={{ fontSize: 11, color: covered ? 'var(--emerald)' : 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                        {covered ? '✓ Covered' : '— Gap'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
