import { useState } from 'react'
import { Trophy, Star, Flame, Code2, Users } from 'lucide-react'

const leaderboardData = [
  { rank: 1,  name: 'Rahul Singh',   initials: 'RS', dept: 'CSE 4th Yr', score: 4821, solved: 312, streak: 45, badges: 18, rating: 1910, color: '#fbbf24', skills: ['AI/ML', 'CP'] },
  { rank: 2,  name: 'Neha Verma',    initials: 'NV', dept: 'CSE 4th Yr', score: 4620, solved: 298, streak: 38, badges: 16, rating: 1880, color: '#94a3b8', skills: ['Data Sci', 'ML'] },
  { rank: 3,  name: 'Vikram Bose',   initials: 'VB', dept: 'CSE 4th Yr', score: 4410, solved: 275, streak: 29, badges: 14, rating: 1795, color: '#b45309', skills: ['Blockchain', 'Backend'] },
  { rank: 4,  name: 'Sam Houston',   initials: 'SH', dept: 'CSE 4th Yr', score: 4250, solved: 261, streak: 21, badges: 16, rating: 1824, color: '#00e5ff', skills: ['Backend', 'DSA'] },
  { rank: 5,  name: 'Sara Menon',    initials: 'SM', dept: 'CSE 3rd Yr', score: 3980, solved: 244, streak: 18, badges: 12, rating: 1680, color: '#f59e0b', skills: ['Security', 'Cloud'] },
  { rank: 6,  name: 'Karan Patel',   initials: 'KP', dept: 'CSE 3rd Yr', score: 3820, solved: 231, streak: 15, badges: 11, rating: 1620, color: '#3b82f6', skills: ['Mobile', 'Frontend'] },
  { rank: 7,  name: 'Aisha Raza',    initials: 'AR', dept: 'CSE 3rd Yr', score: 3650, solved: 219, streak: 12, badges: 10, rating: 1720, color: '#06b6d4', skills: ['Security', 'Net'] },
  { rank: 8,  name: 'Priya Kumar',   initials: 'PK', dept: 'CSE 3rd Yr', score: 3490, solved: 208, streak: 9,  badges: 9,  rating: 1760, color: '#ec4899', skills: ['Frontend', 'React'] },
  { rank: 9,  name: 'Dev Mishra',    initials: 'DM', dept: 'CSE 2nd Yr', score: 3210, solved: 187, streak: 7,  badges: 8,  rating: 1510, color: '#8b5cf6', skills: ['DevOps', 'Cloud'] },
  { rank: 10, name: 'Arjun Joshi',   initials: 'AJ', dept: 'CSE 2nd Yr', score: 3020, solved: 172, streak: 6,  badges: 7,  rating: 1540, color: '#10b981', skills: ['Embedded', 'IoT'] },
]

const tabs = ['Overall', 'This Week', 'DSA', 'Projects', 'Events']

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('Overall')
  const [selected, setSelected] = useState(null)

  const top3 = leaderboardData.slice(0, 3)
  const rest  = leaderboardData.slice(3)

  const podiumOrder = [top3[1], top3[0], top3[2]]

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// HALL OF FAME</div>
        <h1><span className="gradient-text-amber">Campus Leaderboard</span></h1>
        <p>The most dedicated coders at RIT, ranked by problems solved, projects contributed, and community engagement.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t} className={`skill-tag ${activeTab === t ? 'selected' : ''}`} onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 20, marginBottom: 36, padding: '20px 0' }}>
        {podiumOrder.map((p, i) => {
          const heights = [140, 180, 110]
          const medals = ['🥈', '🥇', '🥉']
          const glow = ['rgba(148,163,184,0.3)', 'rgba(251,191,36,0.4)', 'rgba(180,83,9,0.3)']
          return (
            <div key={p.rank} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              {/* Avatar */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: i === 1 ? 72 : 58,
                  height: i === 1 ? 72 : 58,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${p.color}22, ${p.color}08)`,
                  border: `2px solid ${p.color}`,
                  boxShadow: `0 0 24px ${glow[i]}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: i === 1 ? 22 : 18, color: p.color
                }}>
                  {p.initials}
                </div>
                <span style={{ position: 'absolute', bottom: -4, right: -4, fontSize: 18 }}>{medals[i]}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, textAlign: 'center' }}>{p.name.split(' ')[0]}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: p.color, fontWeight: 700 }}>{p.score.toLocaleString()}</div>
              {/* Podium block */}
              <div style={{
                width: i === 1 ? 110 : 90,
                height: heights[i],
                background: `linear-gradient(180deg, ${p.color}18, ${p.color}06)`,
                border: `1px solid ${p.color}33`,
                borderRadius: '8px 8px 0 0',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 12,
                fontFamily: 'JetBrains Mono', fontSize: 28, fontWeight: 900,
                color: p.color + '66'
              }}>
                {p.rank}
              </div>
            </div>
          )
        })}
      </div>

      {/* Rank Table */}
      <div className="chart-container" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="section-title" style={{ marginBottom: 0 }}>
            <Trophy size={15} style={{ color: 'var(--amber)' }} />
            <span>Full Rankings</span>
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
            {leaderboardData.length} students
          </span>
        </div>
        <table className="rank-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Score</th>
              <th><Code2 size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Solved</th>
              <th><Flame size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Streak</th>
              <th><Star size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Rating</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((p, i) => (
              <tr
                key={p.rank}
                style={{ cursor: 'pointer', background: selected === p.rank ? 'rgba(0,229,255,0.05)' : '' }}
                onClick={() => setSelected(p.rank === selected ? null : p.rank)}
              >
                <td>
                  <span className={`rank-num ${p.rank === 1 ? 'gold' : p.rank === 2 ? 'silver' : p.rank === 3 ? 'bronze' : ''}`}>
                    {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : `#${p.rank}`}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.color + '22', color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
                      {p.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13.5, color: p.rank <= 3 ? p.color : 'var(--text-primary)' }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{p.dept}</div>
                    </div>
                    {p.name === 'Sam Houston' && <span className="tag tag-cyan" style={{ fontSize: 9, padding: '1px 6px' }}>YOU</span>}
                  </div>
                </td>
                <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 13, color: p.color }}>{p.score.toLocaleString()}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 13 }}>{p.solved}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: 'var(--rose)' }}>
                  {p.streak > 20 ? '🔥' : ''} {p.streak}d
                </td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: 'var(--cyan)' }}>{p.rating}</td>
                <td>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {p.skills.map(s => <span key={s} className="tag tag-violet" style={{ fontSize: 10, padding: '2px 7px' }}>{s}</span>)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
