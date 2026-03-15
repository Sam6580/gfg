import { Target, Users, Zap, Award, Code, BookOpen } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Learn Daily',
    desc: 'Consistent practice with DSA, system design, and new technologies.',
    color: 'emerald',
  },
  {
    icon: Users,
    title: 'Build Together',
    desc: 'Collaborate on projects, hackathons, and open-source initiatives.',
    color: 'cyan',
  },
  {
    icon: Zap,
    title: 'Compete Hard',
    desc: 'Weekly contests, CodeForces rounds, and interview preparation drives.',
    color: 'violet',
  },
  {
    icon: Award,
    title: 'Grow Careers',
    desc: '95% of our members secured internships or placements at top tech companies.',
    color: 'amber',
  },
]

const stats = [
  { value: '2021', label: 'FOUNDED', color: 'var(--emerald)' },
  { value: '500+', label: 'MEMBERS', color: 'var(--cyan)' },
  { value: '48', label: 'EVENTS', color: 'var(--violet-bright)' },
  { value: '12K+', label: 'SUBMISSIONS', color: 'var(--amber)' },
]

const iconBg = {
  emerald: 'rgba(16,185,129,0.12)',
  cyan: 'rgba(0,229,255,0.12)',
  violet: 'rgba(168,85,247,0.12)',
  amber: 'rgba(245,158,11,0.12)',
}
const iconFg = {
  emerald: 'var(--emerald)',
  cyan: 'var(--cyan)',
  violet: 'var(--violet-bright)',
  amber: 'var(--amber)',
}

export default function About() {
  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// ABOUT US</div>
        <h1><span className="gradient-text">Building the Next Generation of Developers</span></h1>
      </div>

      <div className="grid-65-35" style={{ marginBottom: 32 }}>
        {/* Left — Story */}
        <div>
          <div className="glass-card" style={{ padding: 28 }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>
              <strong style={{ color: 'var(--text-primary)' }}>GeeksforGeeks Campus Club</strong> was founded in 2021 by a group of
              passionate coders who wanted to bridge the gap between classroom learning and real-world technical skills.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>
              Today, we are a thriving community of <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>500+ students</span> from CSE,
              IT, and ECE departments — holding weekly coding contests, hackathons, mock interviews, and workshops every semester.
            </p>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--border)', paddingTop: 24 }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: 'center',
                  borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 4 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Mission */}
        <div>
          <div className="glass-card card-glow-cyan" style={{ padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,229,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code size={18} style={{ color: 'var(--cyan)' }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Our Mission</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Empower every student on campus to become a confident, industry-ready software engineer through peer learning,
              competitive programming, and hands-on project experience.
            </p>
          </div>
          <div className="glass-card card-glow-violet" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(168,85,247,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={18} style={{ color: 'var(--violet-bright)' }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Our Vision</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Be the most active, tech-forward student community where every member gets placed, publishes, or launches a startup.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="section-title" style={{ marginBottom: 18 }}><span className="dot" /> What We Do</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {features.map((f, i) => (
          <div className="glass-card" key={i} style={{ padding: 22, transition: 'all 0.25s' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, marginBottom: 16,
              background: iconBg[f.color], display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <f.icon size={20} style={{ color: iconFg[f.color] }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
