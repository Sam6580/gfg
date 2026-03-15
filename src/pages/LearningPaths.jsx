import { useState } from 'react'
import { Map, AlertTriangle, ChevronRight, Lightbulb, CheckCircle2, Circle, BookOpen } from 'lucide-react'

const tracks = [
  {
    id: 'dsa', name: 'Data Structures & Algorithms', color: '#00e5ff', icon: '🧩',
    health: 68,
    alert: { level: 'rose', msg: '63% of students scored <50% on Dynamic Programming topics this week.' },
    modules: [
      { title: 'Arrays & Strings', status: 'done',    students: 312, avgScore: 82 },
      { title: 'Linked Lists',     status: 'done',    students: 298, avgScore: 76 },
      { title: 'Stacks & Queues', status: 'active',  students: 245, avgScore: 71 },
      { title: 'Trees & Graphs',  status: 'active',  students: 198, avgScore: 65 },
      { title: 'Dynamic Programming', status: 'struggle', students: 155, avgScore: 48 },
      { title: 'Advanced Graphs', status: 'locked',  students: 0,   avgScore: 0 },
    ],
    recommendation: { title: 'Workshop: Mastering Dynamic Programming', date: 'Suggested: Next Saturday 3:00 PM' }
  },
  {
    id: 'ml', name: 'Machine Learning Fundamentals', color: '#a855f7', icon: '🤖',
    health: 82,
    alert: null,
    modules: [
      { title: 'Python for Data Science',  status: 'done',   students: 142, avgScore: 88 },
      { title: 'Linear & Logistic Regression', status: 'done', students: 118, avgScore: 79 },
      { title: 'Decision Trees & Ensembles', status: 'active', students: 95, avgScore: 73 },
      { title: 'Neural Networks Basics',  status: 'active',  students: 72, avgScore: 68 },
      { title: 'CNNs & RNNs',             status: 'locked',  students: 0,  avgScore: 0 },
      { title: 'LLM & Fine-tuning',       status: 'locked',  students: 0,  avgScore: 0 },
    ],
    recommendation: { title: 'Hands-on: Building Your First Neural Network', date: 'Suggested: Next Wednesday 5:00 PM' }
  },
  {
    id: 'web', name: 'Full-Stack Web Development', color: '#10b981', icon: '🌐',
    health: 91,
    alert: null,
    modules: [
      { title: 'HTML/CSS Mastery',        status: 'done',   students: 210, avgScore: 91 },
      { title: 'JavaScript ES6+',         status: 'done',   students: 195, avgScore: 85 },
      { title: 'React & State Management',status: 'done',   students: 172, avgScore: 80 },
      { title: 'Node.js & REST APIs',     status: 'active', students: 140, avgScore: 76 },
      { title: 'Databases & MongoDB',     status: 'active', students: 112, avgScore: 72 },
      { title: 'Deployment & DevOps',     status: 'locked', students: 0,   avgScore: 0 },
    ],
    recommendation: null
  },
]

const statusConfig = {
  done:     { label: 'Completed',  color: 'var(--emerald)', icon: CheckCircle2 },
  active:   { label: 'In Progress', color: 'var(--cyan)',   icon: Circle },
  struggle: { label: 'Struggling', color: 'var(--rose)',    icon: AlertTriangle },
  locked:   { label: 'Locked',     color: 'rgba(255,255,255,0.2)', icon: Circle },
}

export default function LearningPaths() {
  const [activeTrack, setActiveTrack] = useState('dsa')
  const track = tracks.find(t => t.id === activeTrack)

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// ADAPTIVE AI</div>
        <h1><span className="gradient-text">Self-Updating Learning Paths</span></h1>
        <p>The platform continuously monitors student performance and automatically adapts learning roadmaps. Struggle zones trigger recommendations.</p>
      </div>

      <div className="grid-40-60">
        {/* Track selector + health */}
        <div>
          <div className="section-title" style={{ marginBottom: 14 }}><span className="dot" /> Learning Tracks</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {tracks.map(t => (
              <div
                key={t.id}
                className="glass-card"
                style={{
                  padding: '16px 18px', cursor: 'pointer',
                  border: `1px solid ${activeTrack === t.id ? t.color + '44' : 'var(--border)'}`,
                  boxShadow: activeTrack === t.id ? `0 0 16px ${t.color}22` : 'none',
                  transition: 'all 0.2s'
                }}
                onClick={() => setActiveTrack(t.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 20 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                      Health: <span style={{ color: t.health > 80 ? 'var(--emerald)' : t.health > 65 ? 'var(--amber)' : 'var(--rose)' }}>{t.health}%</span>
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: activeTrack === t.id ? t.color : 'var(--text-muted)' }} />
                </div>
                <div className="progress-bar-wrap" style={{ height: 5 }}>
                  <div className="progress-bar" style={{
                    width: `${t.health}%`,
                    background: `linear-gradient(90deg, ${t.color}, ${t.color}88)`,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Campus alerts */}
          <div className="section-title" style={{ marginBottom: 14 }}><span className="dot" style={{ background: 'var(--rose)' }} /> AI Struggle Alerts</div>
          {tracks.filter(t => t.alert).map(t => (
            <div key={t.id} className={`insight-card ${t.alert.level}`}>
              <AlertTriangle size={18} style={{ color: 'var(--rose)', flexShrink: 0 }} />
              <div>
                <div className="insight-title" style={{ color: 'var(--rose)' }}>{t.name}</div>
                <div className="insight-text">{t.alert.msg}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Track detail */}
        <div>
          <div className="glass-card" style={{ padding: 22, marginBottom: 20, borderColor: track.color + '33' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ fontSize: 28 }}>{track.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: track.color }}>{track.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{track.modules.length} modules · {track.modules.filter(m=>m.status==='done').length} completed</div>
              </div>
            </div>

            {/* Module list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {track.modules.map((mod, i) => {
                const cfg = statusConfig[mod.status]
                const Icon = cfg.icon
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 14px', borderRadius: 10,
                      background: mod.status === 'struggle' ? 'rgba(244,63,94,0.06)' : mod.status === 'locked' ? 'transparent' : 'var(--bg-glass)',
                      border: `1px solid ${mod.status === 'struggle' ? 'rgba(244,63,94,0.2)' : mod.status === 'active' ? track.color + '33' : 'var(--border)'}`,
                      opacity: mod.status === 'locked' ? 0.4 : 1,
                    }}
                  >
                    <Icon size={16} style={{ color: cfg.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>{mod.title}</div>
                      {mod.students > 0 && (
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontFamily: 'JetBrains Mono' }}>
                          {mod.students} students · avg score: <span style={{ color: mod.avgScore < 60 ? 'var(--rose)' : mod.avgScore < 75 ? 'var(--amber)' : 'var(--emerald)' }}>{mod.avgScore}%</span>
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 11, color: cfg.color, fontFamily: 'JetBrains Mono', fontWeight: 600 }}>{cfg.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI Recommendation */}
          {track.recommendation && (
            <div className="insight-card violet" style={{ padding: 18, borderRadius: 12 }}>
              <Lightbulb size={20} style={{ color: 'var(--violet-bright)', flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div className="insight-title" style={{ color: 'var(--violet-bright)', fontSize: 14, marginBottom: 4 }}>
                  🤖 AI Recommendation
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{track.recommendation.title}</div>
                <div className="insight-text" style={{ marginBottom: 12 }}>{track.recommendation.date}</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-violet btn-sm">Schedule Workshop</button>
                  <button className="btn btn-ghost btn-sm">View Details</button>
                </div>
              </div>
            </div>
          )}

          {/* Resources */}
          <div className="glass-card" style={{ padding: 18, marginTop: 20 }}>
            <div className="section-title" style={{ fontSize: 13, marginBottom: 14 }}>
              <BookOpen size={14} style={{ color: 'var(--cyan)' }} />
              <span>Curated Resources</span>
            </div>
            {[
              { title: 'Striver\'s DSA Sheet — 450 Problems', type: 'Problem Set', link: '#' },
              { title: 'NeetCode 150 — Video Solutions', type: 'Video', link: '#' },
              { title: 'CS Dojo — DP Masterclass', type: 'Course', link: '#' },
              { title: 'GeeksforGeeks — Topic-wise Practice', type: 'Practice', link: '#' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 5px var(--cyan)', flexShrink: 0 }} />
                <span style={{ fontSize: 13, flex: 1 }}>{r.title}</span>
                <span className="tag tag-cyan">{r.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
