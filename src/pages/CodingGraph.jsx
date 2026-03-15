import { useState, useRef, useEffect } from 'react'
import { Network, Info, X } from 'lucide-react'

// Node data
const students = [
  { id: 1, name: 'Sam H.', initials: 'SH', skills: ['Backend', 'DSA', 'Python'], x: 400, y: 220, color: '#00e5ff' },
  { id: 2, name: 'Rahul S.', initials: 'RS', skills: ['AI/ML', 'Python', 'Research'], x: 200, y: 130, color: '#a855f7' },
  { id: 3, name: 'Priya K.', initials: 'PK', skills: ['Frontend', 'React', 'UI/UX'], x: 600, y: 130, color: '#ec4899' },
  { id: 4, name: 'Arjun J.', initials: 'AJ', skills: ['Embedded', 'C++', 'IoT'], x: 150, y: 340, color: '#10b981' },
  { id: 5, name: 'Sara M.', initials: 'SM', skills: ['DSA', 'CP', 'Java'], x: 300, y: 370, color: '#f59e0b' },
  { id: 6, name: 'Karan P.', initials: 'KP', skills: ['DevOps', 'Cloud', 'Docker'], x: 550, y: 360, color: '#3b82f6' },
  { id: 7, name: 'Neha V.', initials: 'NV', skills: ['AI/ML', 'Data Science', 'R'], x: 650, y: 280, color: '#f43f5e' },
  { id: 8, name: 'Dev M.', initials: 'DM', skills: ['Mobile', 'Flutter', 'Dart'], x: 700, y: 160, color: '#8b5cf6' },
  { id: 9, name: 'Aisha R.', initials: 'AR', skills: ['Security', 'Networking'], x: 100, y: 200, color: '#06b6d4' },
  { id: 10, name: 'Vikram B.', initials: 'VB', skills: ['Backend', 'Go', 'Cloud'], x: 480, y: 110, color: '#84cc16' },
]

const edges = [
  [1,2], [1,3], [1,5], [1,6],
  [2,7], [2,5], [2,9],
  [3,7], [3,8], [3,6],
  [4,5], [4,9],
  [5,2], [5,1],
  [6,10], [6,3],
  [7,8], [7,2],
  [8,3],
  [10,1], [10,6],
]

function skillMatch(a, b) {
  return a.skills.some(s => b.skills.includes(s))
}

export default function CodingGraph() {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const svgRef = useRef()

  const activeNode = selected ?? hovered

  const isConnected = (nA, nB) =>
    edges.some(([a,b]) => (a===nA && b===nB)||(a===nB && b===nA))

  const nodeOpacity = (id) => {
    if (!activeNode) return 1
    if (id === activeNode) return 1
    if (isConnected(id, activeNode)) return 0.95
    return 0.18
  }

  const edgeOpacity = (a, b) => {
    if (!activeNode) return 0.25
    if (a === activeNode || b === activeNode) return 0.9
    return 0.05
  }

  const edgeColor = (a, b) => {
    if (!activeNode) return '#ffffff'
    if (a === activeNode || b === activeNode) return '#00e5ff'
    return '#ffffff'
  }

  const activeStudentData = activeNode ? students.find(s => s.id === activeNode) : null

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// NETWORK INTELLIGENCE</div>
        <h1><span className="gradient-text">Campus Coding Graph</span></h1>
        <p>An interactive map of the coding network. Each node is a student. Connections represent shared skills, collaborations, and project partnerships. Hover or click to explore.</p>
      </div>

      <div className="grid-65-35">
        {/* SVG Graph */}
        <div className="chart-container" style={{ position: 'relative', padding: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 16, left: 16, zIndex: 5,
            display: 'flex', gap: 10, alignItems: 'center', padding: '8px 14px',
            background: 'rgba(2,4,8,0.8)', borderRadius: 8, border: '1px solid var(--border)'
          }}>
            <Network size={14} style={{ color: 'var(--cyan)' }} />
            <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono' }}>
              {students.length} nodes · {edges.length} edges
            </span>
          </div>
          <svg
            ref={svgRef}
            width="100%"
            viewBox="0 0 820 480"
            style={{ display: 'block', cursor: 'default', minHeight: 380 }}
          >
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
              </pattern>
              <radialGradient id="nodeGlow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="white" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="820" height="480" fill="url(#grid)" />

            {/* Edges */}
            {edges.map(([a,b], i) => {
              const sA = students.find(s => s.id === a)
              const sB = students.find(s => s.id === b)
              return (
                <line
                  key={i}
                  x1={sA.x} y1={sA.y} x2={sB.x} y2={sB.y}
                  stroke={edgeColor(a, b)}
                  strokeWidth={activeNode && (a===activeNode||b===activeNode) ? 1.5 : 0.75}
                  strokeOpacity={edgeOpacity(a,b)}
                  strokeDasharray={activeNode && (a===activeNode||b===activeNode) ? 'none' : '4 4'}
                  style={{ transition: 'all 0.3s ease' }}
                />
              )
            })}

            {/* Nodes */}
            {students.map(student => (
              <g
                key={student.id}
                transform={`translate(${student.x}, ${student.y})`}
                style={{
                  cursor: 'pointer',
                  opacity: nodeOpacity(student.id),
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={() => setHovered(student.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(s => s === student.id ? null : student.id)}
              >
                {/* Outer pulse ring */}
                {(selected === student.id) && (
                  <circle r="28" fill="none" stroke={student.color} strokeWidth="1.5" strokeOpacity="0.5"
                    style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
                  />
                )}
                {/* Node circle */}
                <circle
                  r={selected === student.id ? 22 : 18}
                  fill={`${student.color}22`}
                  stroke={student.color}
                  strokeWidth={selected === student.id ? 2 : 1.5}
                  style={{ transition: 'all 0.25s ease', filter: `drop-shadow(0 0 8px ${student.color}66)` }}
                />
                {/* Initials */}
                <text
                  textAnchor="middle" dominantBaseline="central"
                  fontSize="11" fontWeight="700" fill={student.color}
                  fontFamily="Space Grotesk, sans-serif"
                  style={{ pointerEvents: 'none' }}
                >
                  {student.initials}
                </text>
                {/* Name label */}
                <text
                  y="30" textAnchor="middle"
                  fontSize="10" fill="rgba(176,195,232,0.7)"
                  fontFamily="Space Grotesk, sans-serif"
                  style={{ pointerEvents: 'none' }}
                >
                  {student.name}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Info Panel */}
        <div>
          {activeStudentData ? (
            <div className="glass-card card-glow-cyan" style={{ padding: 22, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="team-avatar" style={{ background: activeStudentData.color + '22', color: activeStudentData.color, width: 46, height: 46, fontSize: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {activeStudentData.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{activeStudentData.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                      {edges.filter(([a,b]) => a===activeStudentData.id||b===activeStudentData.id).length} connections
                    </div>
                  </div>
                </div>
                {selected && (
                  <button className="btn-icon" onClick={() => setSelected(null)}>
                    <X size={14} />
                  </button>
                )}
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 1 }}>Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {activeStudentData.skills.map(s => (
                    <span key={s} className="tag tag-cyan">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 1 }}>Connected With</div>
                {students
                  .filter(s => s.id !== activeStudentData.id && isConnected(s.id, activeStudentData.id))
                  .map(s => (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.color + '22', color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10 }}>
                        {s.initials}
                      </div>
                      <span style={{ fontSize: 13 }}>{s.name}</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginLeft: 'auto' }}>
                        {s.skills.filter(sk => activeStudentData.skills.includes(sk)).slice(0,2).map(sk => (
                          <span key={sk} className="tag tag-violet" style={{ fontSize: 10, padding: '2px 7px' }}>{sk}</span>
                        ))}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ) : (
            <div className="insight-card cyan" style={{ marginBottom: 20 }}>
              <Info size={18} style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className="insight-title">Interactive Graph</div>
                <div className="insight-text">Hover over any student node to see connections. Click to lock focus and explore collaboration opportunities.</div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="glass-card" style={{ padding: 18 }}>
            <div className="section-title" style={{ fontSize: 13, marginBottom: 14 }}><span className="dot" /> Student Nodes</div>
            {students.map(s => (
              <div
                key={s.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '7px 0', borderBottom: '1px solid var(--border)',
                  cursor: 'pointer', opacity: activeNode && activeNode !== s.id && !isConnected(s.id, activeNode ?? -1) ? 0.4 : 1,
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(p => p === s.id ? null : s.id)}
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                <span style={{ fontSize: 13, flex: 1 }}>{s.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                  {s.skills[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
