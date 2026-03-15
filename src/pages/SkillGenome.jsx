import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts'
import { Dna, TrendingUp } from 'lucide-react'

const skills = [
  { name: 'Web Development', students: 120, growth: 18, color: '#00e5ff', icon: '🌐' },
  { name: 'Data Structures & Algo', students: 98,  growth: 12, color: '#a855f7', icon: '🧩' },
  { name: 'Machine Learning / AI', students: 72,   growth: 31, color: '#10b981', icon: '🤖' },
  { name: 'Competitive Programming',students: 60,  growth: 8,  color: '#f59e0b', icon: '🏆' },
  { name: 'Mobile Development',      students: 45, growth: 22, color: '#ec4899', icon: '📱' },
  { name: 'DevOps & Cloud',          students: 38, growth: 42, color: '#3b82f6', icon: '☁️' },
  { name: 'Cybersecurity',           students: 28, growth: 35, color: '#f43f5e', icon: '🔐' },
  { name: 'Blockchain / Web3',       students: 18, growth: 60, color: '#8b5cf6', icon: '⛓️' },
  { name: 'AR / VR / Spatial',       students: 12, growth: 75, color: '#06b6d4', icon: '🥽' },
]

const radarData = [
  { subject: 'Web', score: 88 },
  { subject: 'ML/AI', score: 65 },
  { subject: 'CP', score: 72 },
  { subject: 'Mobile', score: 48 },
  { subject: 'Cloud', score: 42 },
  { subject: 'Security', score: 35 },
  { subject: 'DSA', score: 80 },
  { subject: 'Web3', score: 22 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(10,16,30,0.95)', border: '1px solid rgba(0,229,255,0.2)',
      borderRadius: 8, padding: '10px 14px', fontSize: 12, fontFamily: 'JetBrains Mono, monospace'
    }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#00e5ff' }}>{payload[0]?.value} students</div>
    </div>
  )
}

const MAX = 120

export default function SkillGenome() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// CAMPUS DNA</div>
        <h1><span className="gradient-text-emerald">Campus Skill Genome</span></h1>
        <p>This visualizes the coding DNA of the campus community. See what RIT excels at and where the next opportunity lies.</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 28 }}>
        {[
          { label: 'Total Skills Tracked', value: '9', color: 'cyan' },
          { label: 'Students Profiled', value: '491', color: 'violet' },
          { label: 'Fastest Growing', value: 'AR/VR', color: 'emerald' },
          { label: 'Campus Strength', value: 'Web Dev', color: 'amber' },
        ].map((s,i) => (
          <div className={`stat-card ${s.color}`} key={i}>
            <div className={`stat-value ${s.color}`} style={{ fontSize: 22, marginBottom: 6 }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-65-35" style={{ marginBottom: 24 }}>
        {/* Skill Bars */}
        <div className="chart-container">
          <div className="chart-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Dna size={16} style={{ color: 'var(--emerald)' }} />
              Skill Distribution Map
            </span>
            <span className="tag tag-emerald">491 students</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {skills.map((skill, i) => {
              const pct = Math.round((skill.students / MAX) * 100)
              const isHov = hovered === i
              return (
                <div
                  key={i}
                  style={{ cursor: 'default', opacity: hovered !== null && !isHov ? 0.55 : 1, transition: 'opacity 0.2s' }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{skill.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: isHov ? skill.color : 'var(--text-primary)', transition: 'color 0.2s' }}>
                        {skill.name}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: 'var(--emerald)', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <TrendingUp size={10} /> +{skill.growth}%
                      </span>
                      <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono', color: skill.color, fontWeight: 700 }}>
                        {skill.students}
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar-wrap" style={{ height: 8 }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                        transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
                        boxShadow: isHov ? `0 0 10px ${skill.color}66` : 'none',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Radar + bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="chart-container">
            <div className="chart-title">Campus Strengths Radar</div>
            <ResponsiveContainer width="100%" height={230}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }} />
                <Radar name="Campus" dataKey="score" stroke="#00e5ff" fill="#00e5ff" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <div className="chart-title">YoY Growth Hotspots</div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={skills.slice(0,6)} margin={{ top: 0, right: 5, bottom: 0, left: -25 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={false} />
                <YAxis tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'var(--text-muted)' }} />
                <Tooltip
                  content={({ active, payload }) => (
                    active && payload?.length ? (
                      <div style={{ background: 'rgba(10,16,30,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', fontSize: 11 }}>
                        <div style={{ color: payload[0].payload.color, fontWeight: 700 }}>
                          {payload[0].payload.name}
                        </div>
                        <div style={{ color: 'var(--emerald)' }}>+{payload[0].value}% growth</div>
                      </div>
                    ) : null
                  )}
                />
                <Bar dataKey="growth" radius={[4,4,0,0]}>
                  {skills.slice(0,6).map((s,i) => (
                    <Cell key={i} fill={s.color} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Genome detail cards */}
      <div className="section-title"><span className="dot" /> Skill Profiles</div>
      <div className="grid-auto">
        {skills.map((skill, i) => (
          <div className="glass-card card-glow-cyan" key={i} style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 24 }}>{skill.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: skill.color }}>{skill.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                  {skill.students} students enrolled
                </div>
              </div>
            </div>
            <div className="progress-bar-wrap" style={{ marginBottom: 10 }}>
              <div className="progress-bar" style={{
                width: `${Math.round((skill.students / MAX) * 100)}%`,
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}77)`,
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
              <span>Campus adoption</span>
              <span style={{ color: 'var(--emerald)', fontFamily: 'JetBrains Mono' }}>
                ↑ {skill.growth}% YoY
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
