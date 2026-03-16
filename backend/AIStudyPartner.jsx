import { useState } from 'react'
import { Brain, Sparkles, CheckCircle2, Circle, ChevronRight, RefreshCw } from 'lucide-react'
import { aiAPI } from '../api'

const goalOptions = [
  'Crack product-based companies (FAANG)',
  'Win a national hackathon',
  'Master competitive programming',
  'Build a full-stack web project',
  'Get into AI/ML research',
  'Ace campus placements',
]
const timeOptions  = ['1 month', '2 months', '3 months', '4 months', '6 months']
const diffColor    = { Easy: 'emerald', Medium: 'amber', Hard: 'rose', Mixed: 'violet' }

export default function AIStudyPartner() {
  const [goal,          setGoal]          = useState('')
  const [time,          setTime]          = useState('')
  const [focusMode,     setFocusMode]     = useState('Balanced (2 hrs/day)')
  const [generated,     setGenerated]     = useState(false)
  const [loading,       setLoading]       = useState(false)
  const [plan,          setPlan]          = useState(null)
  const [aiSource,      setAiSource]      = useState('')
  const [completedDays, setCompletedDays] = useState(new Set())
  const [xp,            setXp]            = useState(0)
  const [error,         setError]         = useState('')

  const handleGenerate = async () => {
    if (!goal || !time) return
    setLoading(true)
    setError('')
    try {
      const res = await aiAPI.studyPlan({ goal, timeframe: time, focusMode })
      setPlan(res.plan)
      setAiSource(res.source)
      setGenerated(true)
      setCompletedDays(new Set())
      setXp(0)
    } catch (err) {
      setError('Could not generate plan. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleDay = (day) => {
    setCompletedDays(prev => {
      const next = new Set(prev)
      if (next.has(day)) { next.delete(day); setXp(x => x - 50) }
      else               { next.add(day);    setXp(x => x + 50) }
      return next
    })
  }

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// AI MENTOR</div>
        <h1><span className="gradient-text">AI Study Partner</span></h1>
        <p>Tell the AI your goal and timeline. It generates a personalized, structured coding plan — powered by Groq LLM.</p>
      </div>

      <div className="grid-40-60">
        <div>
          <div className="glass-card card-glow-cyan" style={{ padding: 24, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,229,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain size={18} style={{ color: 'var(--cyan)' }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Configure Your Plan</span>
            </div>

            <div className="form-group">
              <label className="form-label">Your Goal</label>
              <select className="form-select" value={goal} onChange={e => setGoal(e.target.value)}>
                <option value="">Select your goal…</option>
                {goalOptions.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Time Available</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {timeOptions.map(t => (
                  <button key={t} className={`skill-tag ${time === t ? 'selected' : ''}`} style={{ justifyContent: 'center' }} onClick={() => setTime(t)}>{t}</button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Focus Mode</label>
              <select className="form-select" value={focusMode} onChange={e => setFocusMode(e.target.value)}>
                <option>Balanced (2 hrs/day)</option>
                <option>Intensive (4 hrs/day)</option>
                <option>Casual (1 hr/day)</option>
              </select>
            </div>

            {error && <div style={{ color: 'var(--rose)', fontSize: 12, marginBottom: 10, fontFamily: 'JetBrains Mono' }}>{error}</div>}

            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} onClick={handleGenerate} disabled={!goal || !time || loading}>
              {loading
                ? <><RefreshCw size={16} style={{ animation: 'rotate360 1s linear infinite' }} />Generating with AI…</>
                : <><Sparkles size={16} />Generate My Plan</>}
            </button>
          </div>

          {generated && (
            <div className="glass-card card-glow-violet" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>🏅 Progress XP</span>
                <span style={{ fontFamily: 'JetBrains Mono', color: 'var(--violet-bright)', fontWeight: 700 }}>{xp} XP</span>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar progress-violet" style={{ width: `${Math.min((xp / 350) * 100, 100)}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                <span>{completedDays.size} / 7 days done</span>
                <span>{xp >= 350 ? '🔥 Week Complete!' : `${350 - xp} XP to week badge`}</span>
              </div>
              {aiSource && (
                <div style={{ marginTop: 10, fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textAlign: 'right' }}>
                  {aiSource === 'ai' ? '🤖 Generated by Groq LLM' : '📦 Smart structured plan'}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          {!generated && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', opacity: 0.5 }}>
              <Brain size={56} style={{ color: 'var(--cyan)', marginBottom: 16 }} />
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>Your personalized plan will appear here</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>Set your goal and timeline, then hit Generate.</div>
            </div>
          )}

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
              <div style={{ width: 56, height: 56, border: '3px solid rgba(0,229,255,0.2)', borderTop: '3px solid var(--cyan)', borderRadius: '50%', animation: 'rotate360 0.9s linear infinite', marginBottom: 20 }} />
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}>Groq AI is crafting your roadmap…</div>
            </div>
          )}

          {generated && plan && (
            <div className="anim-fade-in-up">
              <div className="glass-card" style={{ padding: 20, marginBottom: 20, borderColor: 'rgba(0,229,255,0.25)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>📅 Your {time} Roadmap</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{goal}</div>
                  </div>
                  <span className={`tag tag-${plan.color || 'cyan'}`}>{plan.tag}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {plan.phases?.map((ph, i) => (
                    <div key={i} style={{ padding: 14, borderRadius: 10, background: 'var(--bg-glass)', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>Phase {i+1}: {ph.phase}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{ph.weeks}</span>
                      </div>
                      {ph.topics?.map((t, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, fontSize: 12.5, color: 'var(--text-secondary)' }}>
                          <ChevronRight size={12} style={{ color: 'var(--cyan)', flexShrink: 0 }} />{t}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-title"><span className="dot" /> Week 1 — Daily Schedule</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.daily?.map((d, i) => {
                  const done = completedDays.has(d.day)
                  return (
                    <div key={i} onClick={() => toggleDay(d.day)} style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 10,
                      background: done ? 'rgba(16,185,129,0.07)' : 'var(--bg-card)',
                      border: `1px solid ${done ? 'rgba(16,185,129,0.25)' : 'var(--border)'}`,
                      cursor: 'pointer', transition: 'all 0.2s', opacity: done ? 0.75 : 1,
                    }}>
                      {done ? <CheckCircle2 size={18} style={{ color: 'var(--emerald)', flexShrink: 0 }} /> : <Circle size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, textDecoration: done ? 'line-through' : 'none', color: done ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                          Day {d.day} — {d.topic}
                        </div>
                      </div>
                      <span className={`tag tag-${diffColor[d.diff] ?? 'cyan'}`}>{d.diff}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', whiteSpace: 'nowrap' }}>{d.count} task{d.count > 1 ? 's' : ''}</span>
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
