import { Calendar, MapPin, Clock, Users, ChevronRight, CheckCircle2 } from 'lucide-react'

const events = [
  {
    title: 'Spring Coding Hackathon: Build AI',
    date: 'March 28, 2026',
    time: '48 Hours',
    location: 'Main Auditorium & Online',
    type: 'Hackathon',
    participants: 124,
    tags: ['AI', 'Web3', 'Open Source'],
    color: 'violet',
    status: 'Registration Open',
    statusColor: 'var(--emerald)'
  },
  {
    title: 'Data Structures & Algorithms Bootcamp',
    date: 'April 5, 2026',
    time: '2:00 PM - 5:00 PM',
    location: 'CS Lab 3',
    type: 'Workshop',
    participants: 45,
    tags: ['DSA', 'Interviews', 'CPP'],
    color: 'emerald',
    status: 'Upcoming',
    statusColor: 'var(--cyan)'
  },
  {
    title: 'Tech Talk: Scaling Microservices',
    date: 'April 12, 2026',
    time: '6:00 PM - 7:30 PM',
    location: 'Seminar Hall 1',
    type: 'Speaker Session',
    participants: 80,
    tags: ['System Design', 'Backend'],
    color: 'cyan',
    status: 'Completed',
    statusColor: 'var(--text-muted)'
  }
]

const tagColors = {
  emerald: { bg: 'rgba(16,185,129,0.15)', text: 'var(--emerald)', border: 'rgba(16,185,129,0.3)' },
  cyan: { bg: 'rgba(0,229,255,0.15)', text: 'var(--cyan)', border: 'rgba(0,229,255,0.3)' },
  violet: { bg: 'rgba(168,85,247,0.15)', text: 'var(--violet-bright)', border: 'rgba(168,85,247,0.3)' }
}

export default function UpcomingEvents() {
  return (
    <div className="anim-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="eyebrow">// EVENTS</div>
          <h1><span className="gradient-text">Upcoming Events</span></h1>
          <p>Register for hackathons, workshops, and speaker sessions happening on campus.</p>
        </div>
        <button className="btn btn-primary" style={{ marginTop: 16 }}>Suggest an Event</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {events.map((evt, i) => (
          <div key={i} className={`glass-card card-glow-${evt.color}`} style={{ padding: 24, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {/* Left Calendar Block */}
            <div style={{
              width: 80, height: 80, borderRadius: 16,
              background: 'var(--bg-glass)', border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: tagColors[evt.color].text, textTransform: 'uppercase', letterSpacing: 1 }}>{evt.date.split(' ')[0]}</span>
              <span style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{evt.date.split(' ')[1].replace(',', '')}</span>
            </div>

            {/* Middle Info Block */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 12, background: tagColors[evt.color].bg, color: tagColors[evt.color].text, border: `1px solid ${tagColors[evt.color].border}` }}>
                  {evt.type}
                </span>
                {evt.tags.map((tag, j) => (
                  <span key={j} style={{ fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 12, background: 'var(--bg-glass)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <h3 style={{ fontSize: 20, margin: 0 }}>{evt.title}</h3>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: 'var(--bg-glass)', color: evt.statusColor, border: `1px solid ${evt.statusColor}44`, textTransform: 'uppercase' }}>
                  {evt.status}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <Clock size={16} style={{ color: 'var(--text-muted)' }} /> {evt.time}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <MapPin size={16} style={{ color: 'var(--text-muted)' }} /> {evt.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <Users size={16} style={{ color: 'var(--text-muted)' }} /> {evt.participants} Enrolled
                </div>
              </div>
            </div>

            {/* Right Action Block */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 150 }}>
              {i === 0 ? (
                <button className="btn btn-primary" style={{ width: '100%', padding: '12px 0', justifyContent: 'center' }}>
                  Register Now <ChevronRight size={16} />
                </button>
              ) : (
                <button className="btn" style={{ width: '100%', padding: '12px 0', justifyContent: 'center', background: 'var(--bg-glass)', border: '1px solid var(--border)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--emerald)' }} /> Registered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
