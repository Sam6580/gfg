// src/pages/Leaderboard.jsx
import { useState, useEffect } from 'react'
import { Trophy, Star, Flame, Code2 } from 'lucide-react'
import { skillsAPI } from '../api'

const tabs = ['Overall', 'This Week', 'DSA', 'Projects', 'Events']

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('Overall')
  const [selected,  setSelected]  = useState(null)
  const [data,      setData]      = useState([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    skillsAPI.leaderboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const top3 = data.slice(0, 3)
  const rest  = data.slice(3)
  const podiumOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 48, height: 48, border: '3px solid rgba(245,158,11,0.2)', borderTop: '3px solid var(--amber)', borderRadius: '50%', animation: 'rotate360 0.9s linear infinite' }} />
      <div style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', fontSize: 13 }}>Loading leaderboard…</div>
    </div>
  )

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// HALL OF FAME</div>
        <h1><span className="gradient-text-amber">Campus Leaderboard</span></h1>
        <p>The most dedicated coders at RIT, ranked by problems solved, projects contributed, and community engagement.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {tabs.map(t => <button key={t} className={`skill-tag ${activeTab === t ? 'selected' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>)}
      </div>

      {/* Podium */}
      {podiumOrder.length === 3 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 20, marginBottom: 36, padding: '20px 0' }}>
          {podiumOrder.map((p, i) => {
            const heights = [140, 180, 110]
            const medals  = ['🥈', '🥇', '🥉']
            const glows   = ['rgba(148,163,184,0.3)', 'rgba(251,191,36,0.4)', 'rgba(180,83,9,0.3)']
            return (
              <div key={p.rank} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: i === 1 ? 72 : 58, height: i === 1 ? 72 : 58, borderRadius: '50%', background: `radial-gradient(circle, ${p.color}22, ${p.color}08)`, border: `2px solid ${p.color}`, boxShadow: `0 0 24px ${glows[i]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: i === 1 ? 22 : 18, color: p.color }}>{p.initials}</div>
                  <span style={{ position: 'absolute', bottom: -4, right: -4, fontSize: 18 }}>{medals[i]}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 13, textAlign: 'center' }}>{p.name.split(' ')[0]}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: p.color, fontWeight: 700 }}>{(p.score || 0).toLocaleString()}</div>
                <div style={{ width: i === 1 ? 110 : 90, height: heights[i], background: `linear-gradient(180deg, ${p.color}18, ${p.color}06)`, border: `1px solid ${p.color}33`, borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 12, fontFamily: 'JetBrains Mono', fontSize: 28, fontWeight: 900, color: p.color + '66' }}>{p.rank}</div>
              </div>
            )
          })}
        </div>
      )}

      <div className="chart-container" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="section-title" style={{ marginBottom: 0 }}><Trophy size={15} style={{ color: 'var(--amber)' }} /><span>Full Rankings</span></div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{data.length} students</span>
        </div>
        <table className="rank-table">
          <thead>
            <tr>
              <th>#</th><th>Student</th><th>Score</th>
              <th><Code2 size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Solved</th>
              <th><Flame size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Streak</th>
              <th><Star  size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Rating</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.rank} style={{ cursor: 'pointer', background: selected === p.rank ? 'rgba(0,229,255,0.05)' : '' }} onClick={() => setSelected(p.rank === selected ? null : p.rank)}>
                <td><span className={`rank-num ${p.rank === 1 ? 'gold' : p.rank === 2 ? 'silver' : p.rank === 3 ? 'bronze' : ''}`}>{p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : `#${p.rank}`}</span></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.color + '22', color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{p.initials}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13.5, color: p.rank <= 3 ? p.color : 'var(--text-primary)' }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{p.dept}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 13, color: p.color }}>{(p.score || 0).toLocaleString()}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 13 }}>{p.solved}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: 'var(--rose)' }}>{p.streak > 20 ? '🔥' : ''} {p.streak}d</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: 'var(--cyan)' }}>{p.rating}</td>
                <td><div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>{(p.skills || []).map(s => <span key={s} className="tag tag-violet" style={{ fontSize: 10, padding: '2px 7px' }}>{s}</span>)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
