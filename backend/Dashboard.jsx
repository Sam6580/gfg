import { useState, useEffect } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import { Code2, Users, FolderGit2, CalendarCheck, TrendingUp, Activity, Flame, Star, ArrowUp, Zap } from 'lucide-react'
import { dashboardAPI } from '../api'

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(target / 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 20)
    return () => clearInterval(timer)
  }, [target])
  return <>{count.toLocaleString()}{suffix}</>
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(10,16,30,0.95)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: 12, fontFamily: 'JetBrains Mono' }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => <div key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></div>)}
    </div>
  )
}

const tagColors = { CP: 'cyan', ML: 'violet', Team: 'emerald', DSA: 'amber', Project: 'blue', Badge: 'rose', Event: 'pink' }

export default function Dashboard() {
  const [stats,    setStats]    = useState(null)
  const [charts,   setCharts]   = useState([])
  const [feed,     setFeed]     = useState([])
  const [insights, setInsights] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    Promise.all([
      dashboardAPI.stats(),
      dashboardAPI.charts(),
      dashboardAPI.feed(),
      dashboardAPI.insights(),
    ]).then(([s, c, f, i]) => {
      setStats(s); setCharts(c); setFeed(f); setInsights(i)
    }).catch(console.error)
     .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 48, height: 48, border: '3px solid rgba(0,229,255,0.2)', borderTop: '3px solid var(--cyan)', borderRadius: '50%', animation: 'rotate360 0.9s linear infinite' }} />
      <div style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', fontSize: 13 }}>Loading live data…</div>
    </div>
  )

  const statCards = [
    { icon: Code2,        color: 'cyan',    value: stats?.problemsSolvedThisWeek || 3420, label: 'Problems Solved This Week',  delta: '+18%' },
    { icon: Users,        color: 'violet',  value: stats?.activeCodersNow        || 184,  label: 'Active Coders Right Now',    delta: '+7%'  },
    { icon: FolderGit2,   color: 'emerald', value: stats?.activeProjects         || 47,   label: 'Active Projects',            delta: '+12'  },
    { icon: CalendarCheck,color: 'amber',   value: stats?.eventsThisMonth        || 8,    label: 'Events This Month',          delta: '+2'   },
    { icon: Flame,        color: 'rose',    value: stats?.githubCommitsToday     || 612,  label: 'GitHub Commits Today',       delta: '+23%' },
    { icon: Star,         color: 'blue',    value: stats?.avgCampusRating        || 1824, label: 'Avg Campus CP Rating',       delta: '+36'  },
  ]

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// REAL-TIME</div>
        <h1><span className="gradient-text">Campus Coding Dashboard</span></h1>
        <p>A live pulse of the coding community at RIT. Everything happening, right now.</p>
      </div>

      <div className="stats-grid">
        {statCards.map((s, i) => (
          <div className={`stat-card ${s.color}`} key={i}>
            <div className={`stat-icon ${s.color}`}><s.icon size={18} /></div>
            <div className={`stat-value ${s.color}`}><AnimatedCounter target={s.value} /></div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-delta up"><ArrowUp size={11} /> {s.delta} vs last week</div>
          </div>
        ))}
      </div>

      <div className="grid-65-35" style={{ marginBottom: 24 }}>
        <div className="chart-container">
          <div className="chart-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Activity size={16} style={{ color: 'var(--cyan)' }} />Weekly Activity Overview</span>
            <span className="tag tag-cyan">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={charts} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00e5ff" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradViolet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="var(--text-muted)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="problems" name="Problems" stroke="#00e5ff" strokeWidth={2} fill="url(#gradCyan)"   dot={false} />
              <Area type="monotone" dataKey="coders"   name="Coders"   stroke="#a855f7" strokeWidth={2} fill="url(#gradViolet)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Zap size={16} style={{ color: 'var(--violet-bright)' }} />Live Activity</span>
            <span className="tag tag-violet">LIVE</span>
          </div>
          <div style={{ overflow: 'auto', maxHeight: 240 }}>
            {feed.map((item, i) => (
              <div className="feed-item" key={i}>
                <div className="feed-avatar" style={{ background: item.color + '22', color: item.color }}>{item.initials}</div>
                <div className="feed-content">
                  <span className="name">{item.name} </span>
                  <span className="action">{item.action}</span>
                  <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                    <span className={`tag tag-${tagColors[item.tag] || 'cyan'}`}>{item.tag}</span>
                    <span className="time">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-65-35">
        <div className="chart-container">
          <div className="chart-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><TrendingUp size={16} style={{ color: 'var(--emerald)' }} />Daily GitHub Commits</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={charts} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="var(--text-muted)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="commits" name="Commits" fill="var(--emerald)" radius={[4,4,0,0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <div className="section-title"><span className="dot" /> AI System Insights</div>
          {insights.map((ins, i) => (
            <div className={`insight-card ${ins.color}`} key={i}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{ins.icon}</span>
              <div>
                <div className="insight-title">{ins.title}</div>
                <div className="insight-text">{ins.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
