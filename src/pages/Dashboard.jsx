import { useState, useEffect } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import {
  Code2, Users, FolderGit2, CalendarCheck, TrendingUp,
  Activity, Flame, Star, ArrowUp, Zap
} from 'lucide-react'

const weeklyData = [
  { day: 'Mon', problems: 480, coders: 142, commits: 89 },
  { day: 'Tue', problems: 520, coders: 158, commits: 95 },
  { day: 'Wed', problems: 435, coders: 137, commits: 74 },
  { day: 'Thu', problems: 612, coders: 172, commits: 118 },
  { day: 'Fri', problems: 590, coders: 167, commits: 102 },
  { day: 'Sat', problems: 348, coders: 115, commits: 61 },
  { day: 'Sun', problems: 435, coders: 126, commits: 73 },
]

const feedItems = [
  { initials: 'RS', color: '#00e5ff', name: 'Rahul Singh', action: 'solved LeetCode #2342 — Hard', time: '2 min ago', tag: 'CP' },
  { initials: 'PK', color: '#a855f7', name: 'Priya Kumar', action: 'pushed 8 commits to Smart-Traffic-ML', time: '5 min ago', tag: 'ML' },
  { initials: 'AJ', color: '#10b981', name: 'Arjun Joshi', action: 'joined Team "NeuralHack" for Hackfest 2025', time: '11 min ago', tag: 'Team' },
  { initials: 'SM', color: '#f59e0b', name: 'Sara Menon', action: 'completed Day 30 of DSA Bootcamp 🎉', time: '18 min ago', tag: 'DSA' },
  { initials: 'KP', color: '#ec4899', name: 'Karan Patel', action: 'posted project idea: CampusBot AI', time: '25 min ago', tag: 'Project' },
  { initials: 'NV', color: '#3b82f6', name: 'Neha Verma', action: 'earned badge: "100 Problem Streak" 🔥', time: '32 min ago', tag: 'Badge' },
  { initials: 'DM', color: '#f43f5e', name: 'Dev Mishra', action: 'registered for Web Dev Workshop', time: '41 min ago', tag: 'Event' },
]

const AIInsights = [
  { color: 'rose', icon: '⚠️', title: 'Struggle Alert — Dynamic Programming', text: '63% of students who attempted DP this week scored below 50%. Recommend scheduling a workshop.' },
  { color: 'amber', icon: '📈', title: 'Trending Topic — Large Language Models', text: '47 students searched "LLM fine-tuning" this week. Consider an intro session.' },
  { color: 'cyan', icon: '🤝', title: 'Collaboration Opportunity', text: 'Rahul (AI/ML) and Priya (Frontend) have complementary skills for 2 open project ideas.' },
  { color: 'emerald', icon: '🏆', title: 'Club Health — Strong', text: 'Problems solved up 18% vs last week. 23 new members joined this month.' },
]

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
    <div style={{
      background: 'rgba(10,16,30,0.95)', border: '1px solid rgba(0,229,255,0.2)',
      borderRadius: 8, padding: '10px 14px', fontSize: 12, fontFamily: 'JetBrains Mono, monospace'
    }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// REAL-TIME</div>
        <h1><span className="gradient-text">Campus Coding Dashboard</span></h1>
        <p>A live pulse of the coding community at RIT. Everything happening, right now.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { icon: Code2, color: 'cyan',    value: 3420, label: 'Problems Solved This Week',  delta: '+18%', up: true },
          { icon: Users, color: 'violet',  value: 184,  label: 'Active Coders Right Now',    delta: '+7%', up: true },
          { icon: FolderGit2, color: 'emerald', value: 47, label: 'Active Projects',         delta: '+12', up: true },
          { icon: CalendarCheck, color: 'amber', value: 8, label: 'Events This Month',       delta: '+2', up: true },
          { icon: Flame,  color: 'rose',   value: 612, label: 'GitHub Commits Today',        delta: '+23%', up: true },
          { icon: Star,   color: 'blue',   value: 1824, label: 'Avg Campus CP Rating',       delta: '+36', up: true },
        ].map((s, i) => (
          <div className={`stat-card ${s.color}`} key={i} style={{ animationDelay: `${i * 0.08}s` }}>
            <div className={`stat-icon ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div className={`stat-value ${s.color}`}>
              <AnimatedCounter target={s.value} />
            </div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-delta ${s.up ? 'up' : 'down'}`}>
              <ArrowUp size={11} /> {s.delta} vs last week
            </div>
          </div>
        ))}
      </div>

      <div className="grid-65-35" style={{ marginBottom: 24 }}>
        {/* Area Chart */}
        <div className="chart-container">
          <div className="chart-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={16} style={{ color: 'var(--cyan)' }} />
              Weekly Activity Overview
            </span>
            <span className="tag tag-cyan">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradViolet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="var(--text-muted)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="problems" name="Problems" stroke="#00e5ff" strokeWidth={2} fill="url(#gradCyan)" dot={false} />
              <Area type="monotone" dataKey="coders" name="Coders" stroke="#a855f7" strokeWidth={2} fill="url(#gradViolet)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="chart-container">
          <div className="chart-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={16} style={{ color: 'var(--violet-bright)' }} />
              Live Activity
            </span>
            <span className="tag tag-violet">LIVE</span>
          </div>
          <div style={{ overflow: 'auto', maxHeight: 240 }}>
            {feedItems.map((item, i) => (
              <div className="feed-item" key={i}>
                <div className="feed-avatar" style={{ background: item.color + '22', color: item.color }}>
                  {item.initials}
                </div>
                <div className="feed-content">
                  <span className="name">{item.name} </span>
                  <span className="action">{item.action}</span>
                  <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                    <span className={`tag tag-${['CP','ML','Team','DSA','Project','Badge','Event'].includes(item.tag)
                      ? ['cyan','violet','emerald','amber','blue','rose','pink'][['CP','ML','Team','DSA','Project','Badge','Event'].indexOf(item.tag)]
                      : 'cyan'}`}>{item.tag}</span>
                    <span className="time">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commits bar chart + AI Insights */}
      <div className="grid-65-35">
        <div className="chart-container">
          <div className="chart-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={16} style={{ color: 'var(--emerald)' }} />
              Daily GitHub Commits
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="var(--text-muted)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="commits" name="Commits" fill="var(--emerald)" radius={[4,4,0,0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <div className="section-title">
            <span className="dot" /> AI System Insights
          </div>
          {AIInsights.map((ins, i) => (
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
