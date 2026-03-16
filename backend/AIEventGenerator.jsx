import { useState, useEffect } from 'react'
import { CalendarHeart, TrendingUp, ThumbsUp, Sparkles, RefreshCw, Calendar } from 'lucide-react'
import { aiAPI, eventsAPI } from '../api'

const typeColors = { Workshop: 'cyan', Bootcamp: 'violet', Hackathon: 'rose', Talk: 'emerald', Contest: 'amber' }

const campusTrends = [
  'Students struggling with Dynamic Programming',
  'High interest in AI/ML — 72 new enrollments',
  'DevOps searches up 40% this week',
  'Placement season approaching in 2 months',
  'Blockchain interest spiked +62%',
  'React Native searches up 29%',
]

export default function AIEventGenerator() {
  const [events,      setEvents]      = useState([])
  const [trendTopics, setTrendTopics] = useState([])
  const [generating,  setGenerating]  = useState(false)
  const [loading,     setLoading]     = useState(true)
  const [voted,       setVoted]       = useState(new Set())
  const [aiSource,    setAiSource]    = useState('')

  // Load existing events from DB on mount
  useEffect(() => {
    eventsAPI.list()
      .then(data => setEvents(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const regenerate = async () => {
    setGenerating(true)
    try {
      const res = await aiAPI.suggestEvents({ campusTrends })
      setEvents(res.events)
      setTrendTopics(res.trendTopics || [])
      setAiSource(res.source)
      setVoted(new Set())
    } catch (err) {
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const vote = async (id, idx) => {
    // For AI-generated events (no DB id yet), just toggle locally
    if (!id || voted.has(idx)) {
      setVoted(prev => { const n = new Set(prev); n.delete(idx); return n })
      setEvents(prev => prev.map((e, i) => i === idx ? { ...e, votes: (e.votes || 0) - 1 } : e))
      return
    }
    try {
      const res = await eventsAPI.vote(id)
      setVoted(prev => { const n = new Set(prev); res.voted ? n.add(idx) : n.delete(idx); return n })
      setEvents(prev => prev.map((e, i) => i === idx ? { ...e, votes: res.votes } : e))
    } catch {
      // Fallback: just toggle locally
      setVoted(prev => { const n = new Set(prev); n.add(idx); return n })
      setEvents(prev => prev.map((e, i) => i === idx ? { ...e, votes: (e.votes || 0) + 1 } : e))
    }
  }

  const displayTrends = trendTopics.length > 0 ? trendTopics : ['machine-learning','web3','docker','system-design','react','dsa','devops','blockchain']

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// TREND INTELLIGENCE</div>
        <h1><span className="gradient-text">AI Event Generator</span></h1>
        <p>The AI monitors real GitHub trends and campus signals — then recommends the most impactful events to run next.</p>
      </div>

      <div className="grid-40-60">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div className="section-title" style={{ marginBottom: 0 }}><span className="dot" /> Live Trend Signals</div>
            <span className="tag tag-emerald" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--emerald)', display: 'inline-block' }} />LIVE
            </span>
          </div>

          <div className="glass-card" style={{ padding: 18, marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>GitHub Trending Topics</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {displayTrends.map((t, i) => (
                <span key={i} className="tag tag-cyan" style={{ fontSize: 11 }}>{t}</span>
              ))}
            </div>

            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Campus Signals</div>
            {campusTrends.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: i < campusTrends.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <TrendingUp size={12} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
                <span style={{ fontSize: 12.5 }}>{t}</span>
              </div>
            ))}
          </div>

          <div className="glass-card card-glow-cyan" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Sparkles size={16} style={{ color: 'var(--cyan)' }} />
              <span style={{ fontWeight: 700, fontSize: 14 }}>AI Event Engine</span>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.6 }}>
              Pulls real trending repositories from GitHub API, combines with campus learning signals, then asks Groq LLM to recommend the 5 highest-impact events.
            </div>
            {aiSource && (
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 10 }}>
                Last generation: {aiSource === 'ai' ? '🤖 Groq LLM' : '📦 Smart fallback'}
              </div>
            )}
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={regenerate} disabled={generating}>
              {generating
                ? <><RefreshCw size={15} style={{ animation: 'rotate360 1s linear infinite' }} />Analyzing trends…</>
                : <><Sparkles size={15} />Generate AI Suggestions</>}
            </button>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div className="section-title" style={{ marginBottom: 0 }}><span className="dot" style={{ background: 'var(--violet-bright)' }} /> AI-Recommended Events</div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{events.length} suggestions</span>
          </div>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
              <div style={{ width: 40, height: 40, border: '3px solid rgba(0,229,255,0.2)', borderTop: '3px solid var(--cyan)', borderRadius: '50%', animation: 'rotate360 0.9s linear infinite' }} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {events.map((ev, i) => (
                <div key={ev._id || i} className="glass-card" style={{ padding: 20, borderColor: i === 0 ? ((ev.color || '#00e5ff') + '44') : 'var(--border)', boxShadow: i === 0 ? `0 0 20px ${ev.color || '#00e5ff'}15` : 'none', position: 'relative', overflow: 'hidden' }}>
                  {i === 0 && (
                    <div style={{ position: 'absolute', top: 10, right: 10, background: (ev.color || '#00e5ff') + '22', color: ev.color || '#00e5ff', border: `1px solid ${ev.color || '#00e5ff'}44`, borderRadius: 6, padding: '2px 8px', fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 700 }}>#1 RECOMMENDED</div>
                  )}

                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 28, lineHeight: 1 }}>{ev.icon || '📅'}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{ev.title}</div>
                      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                        <span className={`tag tag-${typeColors[ev.type] ?? 'cyan'}`}>{ev.type}</span>
                        {(ev.tags || []).map(t => <span key={t} className="tag tag-violet" style={{ fontSize: 10, padding: '2px 7px' }}>{t}</span>)}
                      </div>
                    </div>
                  </div>

                  {(ev.aiReason || ev.reason) && (
                    <div style={{ background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: 8, padding: '10px 12px', marginBottom: 12, fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      <span style={{ color: 'var(--violet-bright)', fontWeight: 600, fontSize: 11, fontFamily: 'JetBrains Mono', display: 'block', marginBottom: 3 }}>🤖 AI INSIGHT</span>
                      {ev.aiReason || ev.reason}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
                    {ev.date && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 600 }}>{ev.date}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{ev.time}</div>
                        </div>
                      </div>
                    )}
                    {ev.format && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ fontSize: 13 }}>📍</span>
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 600 }}>{ev.format}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{ev.capacity} seats</div>
                        </div>
                      </div>
                    )}
                    {ev.aiConfidence && (
                      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 3 }}>AI Confidence</div>
                        <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 15, color: ev.color || '#00e5ff' }}>{ev.aiConfidence}%</div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Schedule Event</button>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: 5, backgroundColor: voted.has(i) ? 'rgba(16,185,129,0.1)' : '', borderColor: voted.has(i) ? 'rgba(16,185,129,0.3)' : '', color: voted.has(i) ? 'var(--emerald)' : '' }}
                      onClick={() => vote(ev._id, i)}
                    >
                      <ThumbsUp size={13} /> {ev.votes || 0}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
