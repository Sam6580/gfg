import { useState } from 'react'
import { Zap, Award, Flame, Star, Trophy, TrendingUp } from 'lucide-react'

const milestones = [
  {
    date: 'January 2024', dot: 'cyan', title: 'Started the DSA Journey',
    desc: 'Enrolled in the campus DSA Bootcamp. Solved first 10 LeetCode problems. Joined GFG Club.',
    xp: 200, badges: ['🚀 First Problem', '🧠 Bootcamp Join']
  },
  {
    date: 'February 2024', dot: 'violet', title: 'Hit 50-Problem Milestone',
    desc: 'Solved 50 problems covering Arrays, Strings, and Binary Search. Rated Easy+Medium. Top 30% in batch.',
    xp: 500, badges: ['💯 50 Problems', '⚡ Streak 7']
  },
  {
    date: 'March 2024', dot: 'emerald', title: 'First Hackathon — HackFest RIT',
    desc: 'Participated in internal hackathon with team of 4. Built a real-time collaborative code editor. Placed 2nd.',
    xp: 800, badges: ['🏆 Hackathon 2nd', '🤝 Team Player']
  },
  {
    date: 'May 2024', dot: 'amber', title: 'Cracked Graphs & Trees',
    desc: 'Completed Striver\'s Graph Series. Solved 40+ tree and graph problems. Attempted first Hard-level BFS/DFS.',
    xp: 400, badges: ['🌳 Tree Master', '🔗 Graph Hero']
  },
  {
    date: 'June 2024', dot: 'cyan', title: 'Backend Internship @ TechOrbit',
    desc: 'Landed first backend internship. Worked on REST APIs with Node.js and MongoDB. Deployed to AWS.',
    xp: 1200, badges: ['💼 First Internship', '☁️ Cloud Deployed']
  },
  {
    date: 'August 2024', dot: 'violet', title: '100-Problem Streak 🔥',
    desc: 'Maintained a 21-day daily coding streak. Cleared 100 LeetCode problems. Achieved Knight rating on LeetCode.',
    xp: 1000, badges: ['🔥 100 Streak', '⚔️ LeetCode Knight']
  },
  {
    date: 'November 2024', dot: 'emerald', title: 'Open Source — 2 PRs Merged',
    desc: 'Contributed to real-world open-source projects. 2 pull requests merged on GitHub. 47 stars earned.',
    xp: 600, badges: ['🌍 OSS Contributor', '⭐ 47 Stars']
  },
  {
    date: 'January 2025', dot: 'amber', title: 'Started GFG Club Platform Project',
    desc: 'Leading development of the GFG Club platform — a self-evolving campus coding ecosystem built for the community.',
    xp: 900, badges: ['🧬 Builder', '🏗️ Project Lead']
  },
]

const totalXP = milestones.reduce((acc, m) => acc + m.xp, 0)
const level = Math.floor(totalXP / 1000) + 1
const xpToNext = 1000 - (totalXP % 1000)

const skills = [
  { name: 'DSA', level: 78, color: '#00e5ff' },
  { name: 'Backend Dev', level: 85, color: '#a855f7' },
  { name: 'System Design', level: 55, color: '#10b981' },
  { name: 'Frontend', level: 60, color: '#ec4899' },
  { name: 'Cloud / DevOps', level: 72, color: '#3b82f6' },
  { name: 'AI / ML', level: 42, color: '#f59e0b' },
]

export default function PersonalJourney() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// YOUR STORY</div>
        <h1><span className="gradient-text-amber">Sam's Coding Journey</span></h1>
        <p>Every problem solved, every hackathon conquered, every project shipped. Your complete coding story — gamified and visualized.</p>
      </div>

      {/* XP / Level Banner */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 28, background: 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(168,85,247,0.08))', borderColor: 'rgba(0,229,255,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ width: 68, height: 68, borderRadius: 16, background: 'linear-gradient(135deg, var(--cyan), var(--violet-bright))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 900, flexShrink: 0, boxShadow: 'var(--glow-cyan)' }}>
            {level}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 18, marginRight: 10 }}>Level {level} Coder</span>
                <span className="tag tag-cyan">Sam Houston</span>
              </div>
              <span style={{ fontFamily: 'JetBrains Mono', color: 'var(--cyan)', fontWeight: 700, fontSize: 16 }}>
                {totalXP.toLocaleString()} XP
              </span>
            </div>
            <div className="progress-bar-wrap" style={{ height: 10 }}>
              <div className="progress-bar" style={{
                width: `${Math.round(((1000 - xpToNext) / 1000) * 100)}%`,
                background: 'linear-gradient(90deg, var(--cyan), var(--violet-bright))',
              }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 5, fontFamily: 'JetBrains Mono' }}>
              {xpToNext} XP to Level {level + 1}
            </div>
          </div>
          {[
            { icon: Trophy, label: 'Hackathons', value: 3, color: 'var(--amber)' },
            { icon: Flame,  label: 'Best Streak', value: '21d', color: 'var(--rose)' },
            { icon: Star,   label: 'Problems', value: 142, color: 'var(--violet-bright)' },
            { icon: TrendingUp, label: 'CP Rating', value: 1824, color: 'var(--cyan)' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '0 16px' }}>
              <s.icon size={20} style={{ color: s.color, marginBottom: 4 }} />
              <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 18, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-65-35">
        {/* Timeline */}
        <div>
          <div className="section-title" style={{ marginBottom: 20 }}><span className="dot" /> Journey Timeline</div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div
                className="timeline-item"
                key={i}
                style={{ cursor: 'pointer', animationDelay: `${i * 0.07}s` }}
                onClick={() => setSelected(selected === i ? null : i)}
              >
                <div className={`timeline-dot ${m.dot}`} />
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 10,
                    background: selected === i ? 'rgba(0,229,255,0.06)' : 'var(--bg-card)',
                    border: `1px solid ${selected === i ? 'rgba(0,229,255,0.25)' : 'var(--border)'}`,
                    transition: 'all 0.2s',
                  }}
                >
                  <div className="timeline-date">{m.date}</div>
                  <div className="timeline-title">{m.title}</div>
                  {selected === i && (
                    <div className="anim-fade-in" style={{ marginTop: 8 }}>
                      <div className="timeline-desc" style={{ marginBottom: 10 }}>{m.desc}</div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                        {m.badges.map(b => (
                          <span key={b} className="badge badge-earned" style={{ width: 'auto', height: 'auto', padding: '3px 8px', fontSize: 12, background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 8 }}>
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: selected === i ? 0 : 4 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.badges[0]}</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--violet-bright)', fontWeight: 700 }}>+{m.xp} XP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills + Badges */}
        <div>
          <div className="section-title" style={{ marginBottom: 14 }}><span className="dot" style={{ background: 'var(--violet-bright)' }} /> Skill Levels</div>
          <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: s.color, fontWeight: 700 }}>
                    Lv.{Math.round(s.level / 20)} · {s.level}%
                  </span>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" style={{
                    width: `${s.level}%`,
                    background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                    transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div className="section-title" style={{ marginBottom: 14 }}><span className="dot" style={{ background: 'var(--amber)' }} /> Badge Cabinet</div>
          <div className="glass-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {milestones.flatMap(m => m.badges).map((b, i) => (
                <div
                  key={i}
                  className="badge badge-earned"
                  title={b}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    fontSize: 22,
                    cursor: 'help',
                    transition: 'transform 0.2s',
                    width: 48, height: 48,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                  onClick={() => {}}
                >
                  {b.split(' ')[0]}
                </div>
              ))}
              {/* Locked badges */}
              {['🎯','🌐','🔮'].map((b, i) => (
                <div key={`locked_${i}`} className="badge badge-locked" style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, fontSize: 22,
                  width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {b}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textAlign: 'center' }}>
              {milestones.flatMap(m => m.badges).length} earned · 3 locked
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
