import { useState } from 'react'
import { Users, Wand2, RefreshCw, Star, Shield } from 'lucide-react'

const allSkills = [
  'Frontend', 'Backend', 'AI/ML', 'UI/UX', 'DevOps', 'Mobile',
  'Data Science', 'Embedded', 'Blockchain', 'Security', 'Cloud', 'Game Dev'
]

const allStudents = [
  { name: 'Sam Houston',   initials: 'SH', skills: ['Backend', 'Cloud', 'DevOps'],    year: '4th Yr', rating: 1824, color: '#00e5ff', role: 'Backend Engineer' },
  { name: 'Priya Kumar',   initials: 'PK', skills: ['Frontend', 'UI/UX', 'Mobile'],   year: '3rd Yr', rating: 1760, color: '#ec4899', role: 'Frontend Developer' },
  { name: 'Rahul Singh',   initials: 'RS', skills: ['AI/ML', 'Data Science'],          year: '4th Yr', rating: 1910, color: '#a855f7', role: 'ML Engineer' },
  { name: 'Arjun Joshi',   initials: 'AJ', skills: ['UI/UX', 'Frontend', 'Game Dev'], year: '2nd Yr', rating: 1540, color: '#10b981', role: 'UI/UX Designer' },
  { name: 'Sara Menon',    initials: 'SM', skills: ['Backend', 'Security', 'Cloud'],   year: '3rd Yr', rating: 1680, color: '#f59e0b', role: 'Security Engineer' },
  { name: 'Karan Patel',   initials: 'KP', skills: ['Mobile', 'Frontend', 'UI/UX'],   year: '3rd Yr', rating: 1620, color: '#3b82f6', role: 'Mobile Developer' },
  { name: 'Neha Verma',    initials: 'NV', skills: ['Data Science', 'AI/ML', 'Cloud'],year: '4th Yr', rating: 1880, color: '#f43f5e', role: 'Data Scientist' },
  { name: 'Dev Mishra',    initials: 'DM', skills: ['DevOps', 'Cloud', 'Backend'],     year: '2nd Yr', rating: 1510, color: '#8b5cf6', role: 'DevOps Engineer' },
  { name: 'Aisha Raza',    initials: 'AR', skills: ['Security', 'Embedded'],           year: '3rd Yr', rating: 1720, color: '#06b6d4', role: 'Security Analyst' },
  { name: 'Vikram Bose',   initials: 'VB', skills: ['Blockchain', 'Backend'],          year: '4th Yr', rating: 1795, color: '#84cc16', role: 'Web3 Developer' },
]

function buildTeam(selected) {
  const needed = ['Frontend', 'Backend', 'AI/ML', 'UI/UX']
  const team = []
  const used = new Set()

  for (const role of needed) {
    const match = allStudents.find(s =>
      !used.has(s.name) &&
      s.skills.includes(role) &&
      (selected.length === 0 || selected.some(sel => s.skills.includes(sel)))
    ) ?? allStudents.find(s => !used.has(s.name) && s.skills.includes(role))

    if (match) {
      team.push({ ...match, assignedRole: role })
      used.add(match.name)
    }
  }

  // Fill up to 4 if any slot failed
  while (team.length < 4) {
    const extra = allStudents.find(s => !used.has(s.name))
    if (!extra) break
    team.push({ ...extra, assignedRole: 'Full Stack' })
    used.add(extra.name)
  }

  return team
}

const tagColorMap = {
  Frontend: 'cyan', Backend: 'violet', 'AI/ML': 'emerald', 'UI/UX': 'pink',
  DevOps: 'blue', Mobile: 'amber', 'Data Science': 'emerald', Embedded: 'rose',
  Blockchain: 'violet', Security: 'rose', Cloud: 'blue', 'Game Dev': 'pink',
}

export default function TeamBuilder() {
  const [selected, setSelected] = useState([])
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hackType, setHackType] = useState('Web App')
  const [teamSize, setTeamSize] = useState(4)

  const toggleSkill = (skill) => {
    setSelected(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill])
  }

  const handleBuild = () => {
    setLoading(true)
    setTimeout(() => {
      setTeam(buildTeam(selected))
      setLoading(false)
    }, 1500)
  }

  const compatibility = team ? Math.floor(80 + Math.random() * 18) : 0

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// INTELLIGENT MATCHING</div>
        <h1><span className="gradient-text">Team Builder AI</span></h1>
        <p>The AI analyzes skills, experience, and collaboration patterns to form the most balanced hackathon team possible.</p>
      </div>

      <div className="grid-40-60">
        {/* Config Panel */}
        <div>
          <div className="glass-card card-glow-violet" style={{ padding: 24, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(168,85,247,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} style={{ color: 'var(--violet-bright)' }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Team Configuration</span>
            </div>

            <div className="form-group">
              <label className="form-label">Hackathon Type</label>
              <select className="form-select" value={hackType} onChange={e => setHackType(e.target.value)}>
                {['Web App', 'AI/ML', 'Mobile App', 'Hardware / IoT', 'Open Innovation', 'Social Impact'].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Team Size</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    className={`skill-tag ${teamSize === n ? 'selected' : ''}`}
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => setTeamSize(n)}
                  >{n}</button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Skills You Bring (optional)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    className={`skill-tag ${selected.includes(skill) ? 'selected' : ''}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn btn-violet btn-lg"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              onClick={handleBuild}
              disabled={loading}
            >
              {loading ? (
                <><RefreshCw size={16} style={{ animation: 'rotate360 1s linear infinite' }} /> Matching Team…</>
              ) : (
                <><Wand2 size={16} /> Build Optimal Team</>
              )}
            </button>
          </div>

          {/* Pool preview */}
          <div className="glass-card" style={{ padding: 18 }}>
            <div className="section-title" style={{ fontSize: 13, marginBottom: 12 }}><span className="dot" style={{ background: 'var(--violet-bright)' }} /> Available Students</div>
            {allStudents.slice(0, 6).map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: s.color + '22', color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
                  {s.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.role} · {s.year}</div>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)' }}>{s.rating}</span>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
              +{allStudents.length - 6} more in pool
            </div>
          </div>
        </div>

        {/* Team Output */}
        <div>
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
              <div style={{ width: 56, height: 56, border: '3px solid rgba(168,85,247,0.2)', borderTop: '3px solid var(--violet-bright)', borderRadius: '50%', animation: 'rotate360 0.9s linear infinite', marginBottom: 20 }} />
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}>AI analyzing compatibility…</div>
            </div>
          )}

          {!team && !loading && (
            <div style={{ opacity: 0.35, pointerEvents: 'none', filter: 'grayscale(1)', transition: 'opacity 0.3s' }}>
              <div className="glass-card card-glow-violet" style={{ padding: 20, marginBottom: 20, borderStyle: 'dashed' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>🏆 Recommended Team Preview</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>AI matching in progress...</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[1,2,3,4].map(i => (
                  <div className="team-card" key={i} style={{ padding: 16, borderStyle: 'dashed' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--border)' }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ background: 'var(--text-muted)', color: 'transparent', height: 14, width: '40%', borderRadius: 4 }}>Name</div>
                        <div style={{ background: 'var(--text-muted)', color: 'transparent', height: 10, width: '60%', borderRadius: 4 }}>Role</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {team && !loading && (
            <div className="anim-fade-in-up">
              {/* Compatibility score */}
              <div className="glass-card card-glow-violet" style={{ padding: 20, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>🏆 Recommended Team — {hackType}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>AI confidence: {compatibility}%</div>
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={handleBuild}>
                    <RefreshCw size={13} /> Reshuffle
                  </button>
                </div>
                <div className="compatibility-bar">
                  <Shield size={14} style={{ color: 'var(--violet-bright)' }} />
                  <div style={{ flex: 1 }}>
                    <div className="progress-bar-wrap">
                      <div className="progress-bar progress-violet" style={{ width: `${compatibility}%` }} />
                    </div>
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--violet-bright)', fontWeight: 700 }}>{compatibility}%</span>
                </div>
              </div>

              {/* Team member cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {team.map((member, i) => (
                  <div className="team-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div className="team-avatar" style={{ background: member.color + '22', color: member.color, width: 50, height: 50, fontSize: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                        {member.initials}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{member.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 8 }}>
                          {member.year} · Rating: {member.rating}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                          {member.skills.map(skill => (
                            <span key={skill} className={`tag tag-${tagColorMap[skill] ?? 'cyan'}`}>{skill}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{
                          background: member.color + '15', color: member.color, border: `1px solid ${member.color}33`,
                          borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono'
                        }}>
                          {member.assignedRole}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 6 }}>
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} size={10} style={{ color: j < Math.round(member.rating / 400) ? member.color : 'rgba(255,255,255,0.15)', fill: j < Math.round(member.rating / 400) ? member.color : 'transparent' }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill coverage */}
              <div className="glass-card" style={{ padding: 18, marginTop: 20 }}>
                <div className="section-title" style={{ fontSize: 13, marginBottom: 12 }}><span className="dot" style={{ background: 'var(--emerald)' }} /> Team Skill Coverage</div>
                {['Frontend', 'Backend', 'AI/ML', 'UI/UX', 'DevOps', 'Cloud'].map(skill => {
                  const covered = team.some(m => m.skills.includes(skill))
                  return (
                    <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: covered ? 'var(--emerald)' : 'rgba(255,255,255,0.15)', boxShadow: covered ? '0 0 6px var(--emerald)' : 'none' }} />
                      <span style={{ fontSize: 13, flex: 1 }}>{skill}</span>
                      <span style={{ fontSize: 11, color: covered ? 'var(--emerald)' : 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                        {covered ? '✓ Covered' : '— Not covered'}
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
