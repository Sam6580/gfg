import { useState } from 'react'
import { Users, Wand2, RefreshCw, Star, Shield } from 'lucide-react'
import { aiAPI, usersAPI } from '../api'
import { useEffect } from 'react'

const allSkills = ['Frontend','Backend','AI/ML','UI/UX','DevOps','Mobile','Data Science','Embedded','Blockchain','Security','Cloud','Game Dev']
const tagColorMap = { Frontend:'cyan',Backend:'violet','AI/ML':'emerald','UI/UX':'pink',DevOps:'blue',Mobile:'amber','Data Science':'emerald',Embedded:'rose',Blockchain:'violet',Security:'rose',Cloud:'blue','Game Dev':'pink' }

export default function TeamBuilder() {
  const [selected,    setSelected]    = useState([])
  const [team,        setTeam]        = useState(null)
  const [loading,     setLoading]     = useState(false)
  const [hackType,    setHackType]    = useState('Web App')
  const [teamSize,    setTeamSize]    = useState(4)
  const [pool,        setPool]        = useState([])
  const [aiSource,    setAiSource]    = useState('')
  const [explanation, setExplanation] = useState('')
  const [compatibility, setCompatibility] = useState(0)

  useEffect(() => {
    usersAPI.list().then(setPool).catch(console.error)
  }, [])

  const toggleSkill = (skill) => {
    setSelected(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill])
  }

  const handleBuild = async () => {
    setLoading(true)
    try {
      const res = await aiAPI.buildTeam({ hackathonType: hackType, teamSize, yourSkills: selected })
      setTeam(res.team)
      setCompatibility(res.compatibility)
      setExplanation(res.explanation)
      setAiSource(res.source)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// INTELLIGENT MATCHING</div>
        <h1><span className="gradient-text">Team Builder AI</span></h1>
        <p>The AI analyzes real student profiles, skills, and ratings to form the most balanced hackathon team possible.</p>
      </div>

      <div className="grid-40-60">
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
                {['Web App','AI/ML','Mobile App','Hardware / IoT','Open Innovation','Social Impact'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Team Size</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[2,3,4,5].map(n => (
                  <button key={n} className={`skill-tag ${teamSize === n ? 'selected' : ''}`} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setTeamSize(n)}>{n}</button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Skills You Bring (optional)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {allSkills.map(skill => (
                  <button key={skill} className={`skill-tag ${selected.includes(skill) ? 'selected' : ''}`} onClick={() => toggleSkill(skill)}>{skill}</button>
                ))}
              </div>
            </div>

            <button className="btn btn-violet btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={handleBuild} disabled={loading}>
              {loading
                ? <><RefreshCw size={16} style={{ animation: 'rotate360 1s linear infinite' }} />AI Matching…</>
                : <><Wand2 size={16} />Build Optimal Team</>}
            </button>
          </div>

          <div className="glass-card" style={{ padding: 18 }}>
            <div className="section-title" style={{ fontSize: 13, marginBottom: 12 }}><span className="dot" style={{ background: 'var(--violet-bright)' }} /> Available Students ({pool.length})</div>
            {pool.slice(0, 6).map(s => (
              <div key={s._id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: s.color + '22', color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{s.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.role} · {s.year}</div>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)' }}>{s.rating}</span>
              </div>
            ))}
            {pool.length > 6 && <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>+{pool.length - 6} more in pool</div>}
          </div>
        </div>

        <div>
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
              <div style={{ width: 56, height: 56, border: '3px solid rgba(168,85,247,0.2)', borderTop: '3px solid var(--violet-bright)', borderRadius: '50%', animation: 'rotate360 0.9s linear infinite', marginBottom: 20 }} />
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}>Groq AI analyzing compatibility…</div>
            </div>
          )}

          {!team && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', opacity: 0.45 }}>
              <Users size={56} style={{ color: 'var(--violet-bright)', marginBottom: 16 }} />
              <div style={{ fontSize: 15, fontWeight: 600, textAlign: 'center' }}>Your AI-matched team will appear here</div>
            </div>
          )}

          {team && !loading && (
            <div className="anim-fade-in-up">
              <div className="glass-card card-glow-violet" style={{ padding: 20, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>🏆 Recommended Team — {hackType}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                      AI confidence: {compatibility}%
                      {aiSource && <span style={{ marginLeft: 8 }}>{aiSource === 'ai' ? '· 🤖 Groq AI' : '· 📦 Smart match'}</span>}
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={handleBuild}><RefreshCw size={13} /> Reshuffle</button>
                </div>
                {explanation && (
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 12, fontStyle: 'italic', padding: '8px 12px', background: 'rgba(168,85,247,0.06)', borderRadius: 8, border: '1px solid rgba(168,85,247,0.15)' }}>
                    🤖 {explanation}
                  </div>
                )}
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {team.map((member, i) => (
                  <div className="team-card" key={member._id || i}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div className="team-avatar" style={{ background: member.color + '22', color: member.color, width: 50, height: 50, fontSize: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{member.initials}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{member.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 8 }}>{member.year} · Rating: {member.rating}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                          {(member.skills || []).map(skill => <span key={skill} className={`tag tag-${tagColorMap[skill] ?? 'cyan'}`}>{skill}</span>)}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ background: member.color + '15', color: member.color, border: `1px solid ${member.color}33`, borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{member.assignedRole}</div>
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

              <div className="glass-card" style={{ padding: 18, marginTop: 20 }}>
                <div className="section-title" style={{ fontSize: 13, marginBottom: 12 }}><span className="dot" style={{ background: 'var(--emerald)' }} /> Team Skill Coverage</div>
                {['Frontend','Backend','AI/ML','UI/UX','DevOps','Cloud'].map(skill => {
                  const covered = team.some(m => (m.skills || []).includes(skill))
                  return (
                    <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: covered ? 'var(--emerald)' : 'rgba(255,255,255,0.15)', boxShadow: covered ? '0 0 6px var(--emerald)' : 'none' }} />
                      <span style={{ fontSize: 13, flex: 1 }}>{skill}</span>
                      <span style={{ fontSize: 11, color: covered ? 'var(--emerald)' : 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{covered ? '✓ Covered' : '— Not covered'}</span>
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
