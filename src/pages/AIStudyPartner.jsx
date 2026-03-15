import { useState } from 'react'
import { Brain, Sparkles, CheckCircle2, Circle, ChevronRight, RefreshCw } from 'lucide-react'

const goalOptions = [
  'Crack product-based companies (FAANG)',
  'Win a national hackathon',
  'Master competitive programming',
  'Build a full-stack web project',
  'Get into AI/ML research',
  'Ace campus placements',
]

const timeOptions = ['1 month', '2 months', '3 months', '4 months', '6 months']

const planTemplates = {
  'Crack product-based companies (FAANG)': {
    tag: 'FAANG Prep',
    color: 'cyan',
    phases: [
      { phase: 'Foundation', weeks: 'Weeks 1–2', topics: ['Arrays & Strings — 15 problems', 'Sorting & Searching — 10 problems', 'Big-O Analysis & Complexity'] },
      { phase: 'Core DS&A', weeks: 'Weeks 3–5', topics: ['Linked Lists & Trees — 20 problems', 'Stack & Queue — 12 problems', 'Binary Search — 15 problems'] },
      { phase: 'Advanced', weeks: 'Weeks 6–8', topics: ['Dynamic Programming — 25 problems', 'Graphs (BFS/DFS) — 18 problems', 'Greedy Algorithms — 10 problems'] },
      { phase: 'Mock Interviews', weeks: 'Weeks 9–12', topics: ['Daily LeetCode Medium/Hard', 'System Design Fundamentals', '3 Full Mock Interviews / week'] },
    ],
    daily: [
      { day: 1, topic: 'Arrays — Two Sum, Best Time to Buy Stock', diff: 'Easy', count: 5 },
      { day: 2, topic: 'Binary Search — Search in Rotated Array', diff: 'Medium', count: 3 },
      { day: 3, topic: 'Strings — Longest Substring, Anagram Check', diff: 'Easy', count: 4 },
      { day: 4, topic: 'Linked List — Reverse, Detect Cycle', diff: 'Medium', count: 3 },
      { day: 5, topic: 'Trees — Inorder, Level Order Traversal', diff: 'Medium', count: 4 },
      { day: 6, topic: 'Stacks — Valid Parentheses, Min Stack', diff: 'Easy', count: 3 },
      { day: 7, topic: 'Review + Mock test + Upsolve', diff: 'Mixed', count: 5 },
    ]
  },
  'Win a national hackathon': {
    tag: 'Hackathon Ready',
    color: 'violet',
    phases: [
      { phase: 'Idea & Skills', weeks: 'Weeks 1–2', topics: ['Problem ideation frameworks', 'React / Next.js basics', 'REST API & Node.js fundamentals'] },
      { phase: 'Build Speed', weeks: 'Weeks 3–5', topics: ['Full-stack app in 48 hrs challenge', 'Git workflows & collaboration', 'UI design with Figma → Code'] },
      { phase: 'AI Integration', weeks: 'Weeks 6–9', topics: ['OpenAI API integration', 'Computer Vision basics (OpenCV)', 'Deploying on Vercel / Railway'] },
      { phase: 'Pitch & Polish', weeks: 'Weeks 10–12', topics: ['Slide deck design', 'Demo video preparation', '3 practice pitch sessions'] },
    ],
    daily: [
      { day: 1, topic: 'Setup React + Tailwind boilerplate', diff: 'Easy', count: 1 },
      { day: 2, topic: 'Build a REST API with Node.js + Express', diff: 'Medium', count: 1 },
      { day: 3, topic: 'Integrate OpenAI API for basic Q&A', diff: 'Medium', count: 1 },
      { day: 4, topic: 'Database design with MongoDB', diff: 'Medium', count: 1 },
      { day: 5, topic: 'Build complete login / auth system', diff: 'Hard', count: 1 },
      { day: 6, topic: 'Deploy to Vercel + Railway — live app', diff: 'Medium', count: 1 },
      { day: 7, topic: 'Work on pitch deck + wireframes', diff: 'Easy', count: 1 },
    ]
  },
}

const defaultPlan = planTemplates['Crack product-based companies (FAANG)']

const diffColor = { Easy: 'emerald', Medium: 'amber', Hard: 'rose', Mixed: 'violet' }

export default function AIStudyPartner() {
  const [goal, setGoal] = useState('')
  const [time, setTime] = useState('')
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)
  const [completedDays, setCompletedDays] = useState(new Set())
  const [xp, setXp] = useState(0)

  const handleGenerate = () => {
    if (!goal || !time) return
    setLoading(true)
    setTimeout(() => {
      const p = planTemplates[goal] ?? defaultPlan
      setPlan(p)
      setGenerated(true)
      setCompletedDays(new Set())
      setXp(0)
      setLoading(false)
    }, 1800)
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
        <p>Tell the AI your goal and timeline. It generates a personalized, structured coding plan — just for you.</p>
      </div>

      <div className="grid-40-60">
        {/* Input Panel */}
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
                  <button
                    key={t}
                    className={`skill-tag ${time === t ? 'selected' : ''}`}
                    style={{ justifyContent: 'center' }}
                    onClick={() => setTime(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Focus Mode</label>
              <select className="form-select">
                <option>Balanced (2 hrs/day)</option>
                <option>Intensive (4 hrs/day)</option>
                <option>Casual (1 hr/day)</option>
              </select>
            </div>

            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
              onClick={handleGenerate}
              disabled={!goal || !time || loading}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} style={{ animation: 'rotate360 1s linear infinite' }} />
                  Generating Plan…
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate My Plan
                </>
              )}
            </button>
          </div>

          {/* XP Tracker */}
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
            </div>
          )}
        </div>

        {/* Output Plan */}
        <div>
          {!generated && !loading && (
            <div style={{ opacity: 0.4, transition: 'opacity 0.3s', pointerEvents: 'none', filter: 'grayscale(1)' }}>
              <div className="glass-card" style={{ padding: 20, marginBottom: 20, borderStyle: 'dashed' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>📅 Example Roadmap Preview</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>Dynamic based on input</div>
                  </div>
                </div>
                {/* Mock Phases */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[1, 2].map((i) => (
                    <div key={i} style={{ padding: 14, borderRadius: 10, background: 'var(--bg-glass)', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontWeight: 600, fontSize: 13, background: 'var(--text-muted)', color: 'transparent', borderRadius: 4 }}>Phase {i}: Placeholder</span>
                        <span style={{ fontSize: 11, background: 'var(--text-muted)', color: 'transparent', borderRadius: 4 }}>Weeks 1-2</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, background: 'var(--text-muted)', color: 'transparent', borderRadius: 4, width: '80%' }}>Item 1</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--text-muted)', color: 'transparent', borderRadius: 4, width: '60%' }}>Item 2</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
              <div style={{ width: 56, height: 56, border: '3px solid rgba(0,229,255,0.2)', borderTop: '3px solid var(--cyan)', borderRadius: '50%', animation: 'rotate360 0.9s linear infinite', marginBottom: 20 }} />
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}>AI is crafting your roadmap…</div>
            </div>
          )}

          {generated && plan && (
            <div className="anim-fade-in-up">
              {/* Plan header */}
              <div className="glass-card" style={{ padding: 20, marginBottom: 20, borderColor: `rgba(0,229,255,0.25)` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>📅 Your {time} Roadmap</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{goal}</div>
                  </div>
                  <span className={`tag tag-${plan.color}`}>{plan.tag}</span>
                </div>
                {/* Phases */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {plan.phases.map((ph, i) => (
                    <div key={i} style={{
                      padding: 14, borderRadius: 10, background: 'var(--bg-glass)',
                      border: '1px solid var(--border)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>Phase {i+1}: {ph.phase}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{ph.weeks}</span>
                      </div>
                      {ph.topics.map((t, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, fontSize: 12.5, color: 'var(--text-secondary)' }}>
                          <ChevronRight size={12} style={{ color: 'var(--cyan)', flexShrink: 0 }} />
                          {t}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily plan */}
              <div className="section-title"><span className="dot" /> Week 1 — Daily Schedule</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.daily.map((d, i) => {
                  const done = completedDays.has(d.day)
                  return (
                    <div
                      key={i}
                      onClick={() => toggleDay(d.day)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '12px 16px',
                        borderRadius: 10,
                        background: done ? 'rgba(16,185,129,0.07)' : 'var(--bg-card)',
                        border: `1px solid ${done ? 'rgba(16,185,129,0.25)' : 'var(--border)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        opacity: done ? 0.75 : 1,
                      }}
                    >
                      {done
                        ? <CheckCircle2 size={18} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
                        : <Circle size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                      }
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, textDecoration: done ? 'line-through' : 'none', color: done ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                          Day {d.day} — {d.topic}
                        </div>
                      </div>
                      <span className={`tag tag-${diffColor[d.diff] ?? 'cyan'}`}>{d.diff}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', whiteSpace: 'nowrap' }}>
                        {d.count} task{d.count > 1 ? 's' : ''}
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
