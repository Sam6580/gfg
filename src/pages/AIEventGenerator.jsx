import { useState } from 'react'
import { CalendarHeart, TrendingUp, ThumbsUp, Sparkles, RefreshCw, Calendar } from 'lucide-react'

const trends = [
  { keyword: 'Machine Learning', searches: 312, trend: 'up',   delta: '+47%',  icon: '🤖' },
  { keyword: 'System Design',    searches: 284, trend: 'up',   delta: '+38%',  icon: '🏗️' },
  { keyword: 'React Native',     searches: 218, trend: 'up',   delta: '+29%',  icon: '📱' },
  { keyword: 'Docker & K8s',     searches: 196, trend: 'up',   delta: '+24%',  icon: '🐳' },
  { keyword: 'DSA Patterns',     searches: 438, trend: 'up',   delta: '+18%',  icon: '🧩' },
  { keyword: 'Blockchain Web3',  searches: 142, trend: 'up',   delta: '+62%',  icon: '⛓️' },
  { keyword: 'Python Basics',    searches: 389, trend: 'down', delta: '-8%',   icon: '🐍' },
  { keyword: 'HTML/CSS',         searches: 167, trend: 'down', delta: '-12%',  icon: '🌐' },
]

const initialEvents = [
  {
    id: 1, title: 'Intro to ML Workshop', icon: '🤖', type: 'Workshop', date: 'Mar 22, 2025', time: '3:00 PM',
    reason: 'Machine Learning searches spiked +47% this week. 72 students enrolled in ML track.',
    confidence: 94, votes: 47, format: 'In-person', capacity: 40,
    tags: ['AI/ML', 'Beginner-friendly'], color: '#a855f7'
  },
  {
    id: 2, title: 'System Design Bootcamp', icon: '🏗️', type: 'Bootcamp', date: 'Mar 29, 2025', time: '2:00 PM',
    reason: 'System Design queries up 38%. Placement season approaching — students need this for interviews.',
    confidence: 89, votes: 38, format: 'Hybrid', capacity: 60,
    tags: ['Interview Prep', 'Advanced'], color: '#00e5ff'
  },
  {
    id: 3, title: 'Mobile Dev Hackathon', icon: '📱', type: 'Hackathon', date: 'Apr 5–6, 2025', time: '9:00 AM',
    reason: 'React Native searches up 29%. 45 students in mobile track. High engagement in mobile projects.',
    confidence: 82, votes: 31, format: 'In-person', capacity: 80,
    tags: ['Mobile', 'Team event'], color: '#ec4899'
  },
  {
    id: 4, title: 'Docker & Kubernetes Deep Dive', icon: '🐳', type: 'Workshop', date: 'Apr 12, 2025', time: '4:00 PM',
    reason: 'DevOps searches jumped +24%. Growing number of students in Cloud & DevOps skill track.',
    confidence: 78, votes: 22, format: 'Online', capacity: 50,
    tags: ['DevOps', 'Cloud', 'Intermediate'], color: '#3b82f6'
  },
  {
    id: 5, title: 'Web3 & Blockchain Intro', icon: '⛓️', type: 'Talk', date: 'Apr 18, 2025', time: '5:00 PM',
    reason: 'Blockchain searches skyrocketed +62% — fastest growing topic this month.',
    confidence: 75, votes: 19, format: 'Hybrid', capacity: 35,
    tags: ['Blockchain', 'Web3', 'Emerging Tech'], color: '#84cc16'
  },
]

const typeColors = { Workshop: 'cyan', Bootcamp: 'violet', Hackathon: 'rose', Talk: 'emerald', 'Contest': 'amber' }

export default function AIEventGenerator() {
  const [events, setEvents] = useState(initialEvents)
  const [generating, setGenerating] = useState(false)
  const [voted, setVoted] = useState(new Set())

  const vote = (id) => {
    if (voted.has(id)) return
    setVoted(prev => new Set([...prev, id]))
    setEvents(prev => prev.map(e => e.id === id ? { ...e, votes: e.votes + 1 } : e))
  }

  const regenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setEvents(prev => [...prev].sort(() => Math.random() - 0.5)
        .map(e => ({ ...e, confidence: Math.floor(70 + Math.random() * 25), votes: e.votes })))
      setGenerating(false)
    }, 1500)
  }

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// TREND INTELLIGENCE</div>
        <h1><span className="gradient-text">AI Event Generator</span></h1>
        <p>The AI analyzes student search trends, skill demand, and recent coding activity to recommend impactful events.</p>
      </div>

      <div className="grid-40-60">
        {/* Trend Feed */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div className="section-title" style={{ marginBottom: 0 }}><span className="dot" /> Campus Search Trends</div>
            <span className="tag tag-emerald" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--emerald)', display: 'inline-block' }} />
              LIVE
            </span>
          </div>
          <div className="glass-card" style={{ padding: 18, marginBottom: 20 }}>
            {trends.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
                borderBottom: i < trends.length - 1 ? '1px solid var(--border)' : 'none'
              }}>
                <span style={{ fontSize: 20, width: 28, textAlign: 'center', flexShrink: 0 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{t.keyword}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                    {t.searches} searches this week
                  </div>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, color: t.trend === 'up' ? 'var(--emerald)' : 'var(--rose)', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <TrendingUp size={12} style={{ transform: t.trend === 'down' ? 'scaleY(-1)' : 'none' }} />
                  {t.delta}
                </span>
              </div>
            ))}
          </div>

          {/* Regenerate */}
          <div className="glass-card card-glow-cyan" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Sparkles size={16} style={{ color: 'var(--cyan)' }} />
              <span style={{ fontWeight: 700, fontSize: 14 }}>AI Event Engine</span>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.6 }}>
              The AI analyzes campus search trends, struggling topics, and engagement patterns to recommend the most relevant events for next month.
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={regenerate} disabled={generating}>
              {generating
                ? <><RefreshCw size={15} style={{ animation: 'rotate360 1s linear infinite' }} /> Re-analyzing trends…</>
                : <><Sparkles size={15} /> Re-generate Suggestions</>
              }
            </button>
          </div>
        </div>

        {/* Event Cards */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div className="section-title" style={{ marginBottom: 0 }}><span className="dot" style={{ background: 'var(--violet-bright)' }} /> AI-Recommended Events</div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{events.length} suggestions</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {events.map((ev, i) => (
              <div
                key={ev.id}
                className="glass-card"
                style={{
                  padding: 20,
                  borderColor: i === 0 ? ev.color + '44' : 'var(--border)',
                  boxShadow: i === 0 ? `0 0 20px ${ev.color}15` : 'none',
                  transition: 'all 0.25s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {i === 0 && (
                  <div style={{ position: 'absolute', top: 10, right: 10, background: ev.color + '22', color: ev.color, border: `1px solid ${ev.color}44`, borderRadius: 6, padding: '2px 8px', fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
                    #1 RECOMMENDED
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 28, lineHeight: 1 }}>{ev.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{ev.title}</div>
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                      <span className={`tag tag-${typeColors[ev.type] ?? 'cyan'}`}>{ev.type}</span>
                      {ev.tags.map(t => <span key={t} className="tag tag-violet" style={{ fontSize: 10, padding: '2px 7px' }}>{t}</span>)}
                    </div>
                  </div>
                </div>

                {/* AI reason */}
                <div style={{ background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: 8, padding: '10px 12px', marginBottom: 12, fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <span style={{ color: 'var(--violet-bright)', fontWeight: 600, fontSize: 11, fontFamily: 'JetBrains Mono', display: 'block', marginBottom: 3 }}>🤖 AI INSIGHT</span>
                  {ev.reason}
                </div>

                {/* Details row */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
                  {[
                    { icon: Calendar, label: ev.date, sub: ev.time },
                    { icon: null, emoji: '📍', label: ev.format, sub: `${ev.capacity} seats` },
                  ].map((d, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      {d.icon
                        ? <d.icon size={13} style={{ color: 'var(--text-muted)' }} />
                        : <span style={{ fontSize: 13 }}>{d.emoji}</span>
                      }
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 600 }}>{d.label}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{d.sub}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 3 }}>AI Confidence</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 15, color: ev.color }}>{ev.confidence}%</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Schedule Event</button>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: 5, backgroundColor: voted.has(ev.id) ? 'rgba(16,185,129,0.1)' : '', borderColor: voted.has(ev.id) ? 'rgba(16,185,129,0.3)' : '', color: voted.has(ev.id) ? 'var(--emerald)' : '' }}
                    onClick={() => vote(ev.id)}
                  >
                    <ThumbsUp size={13} /> {ev.votes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
