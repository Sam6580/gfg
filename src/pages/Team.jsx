import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const teamMembers = [
  {
    name: 'Aisha Rahman',
    role: 'President & Founder',
    bio: 'Leading the club vision. Passionate about AI and community building. Previously interned at Google.',
    avatar: 'A',
    color: 'emerald',
    socials: { github: '#', linkedin: '#', twitter: '#' }
  },
  {
    name: 'Rahul Singh',
    role: 'Technical Lead',
    bio: 'Full-stack developer and competitive programmer. Maintains the club platform. 5-star on CodeChef.',
    avatar: 'R',
    color: 'cyan',
    socials: { github: '#', linkedin: '#' }
  },
  {
    name: 'Priya Verma',
    role: 'Events Coordinator',
    bio: 'Organizes weekly workshops and hackathons. Loves bringing people together to build cool things.',
    avatar: 'P',
    color: 'violet',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Sam Houston',
    role: 'Developer / Member',
    bio: '4th year CSE student exploring cloud architecture and machine learning.',
    avatar: 'S',
    color: 'amber',
    socials: { github: '#', linkedin: '#' }
  }
]

const avatarBg = {
  emerald: 'rgba(16,185,129,0.15)',
  cyan: 'rgba(0,229,255,0.15)',
  violet: 'rgba(168,85,247,0.15)',
  amber: 'rgba(245,158,11,0.15)',
}
const avatarColor = {
  emerald: 'var(--emerald)',
  cyan: 'var(--cyan)',
  violet: 'var(--violet-bright)',
  amber: 'var(--amber)',
}

export default function Team() {
  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// OUR TEAM</div>
        <h1><span className="gradient-text">Meet the Leaders</span></h1>
        <p>The passionate students behind the GFG Campus Club, working to bridge the gap between classroom and industry.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {teamMembers.map((member, i) => (
          <div key={i} className={`glass-card card-glow-${member.color}`} style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: avatarBg[member.color], color: avatarColor[member.color],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, fontWeight: 'bold'
              }}>
                {member.avatar}
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontSize: 13, color: avatarColor[member.color], fontWeight: 500 }}>{member.role}</div>
              </div>
            </div>
            
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, marginBottom: 20 }}>
              {member.bio}
            </p>

            <div style={{ display: 'flex', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              {member.socials.github && (
                <a href={member.socials.github} style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                  <Github size={18} />
                </a>
              )}
              {member.socials.linkedin && (
                <a href={member.socials.linkedin} style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0A66C2'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                  <Linkedin size={18} />
                </a>
              )}
              {member.socials.twitter && (
                <a href={member.socials.twitter} style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#1DA1F2'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                  <Twitter size={18} />
                </a>
              )}
              <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', marginLeft: 'auto' }} onMouseEnter={e => e.target.style.color = 'var(--cyan)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                <Mail size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="glass-card" style={{ marginTop: 40, padding: 32, textAlign: 'center' }}>
        <h3 style={{ marginBottom: 12, fontSize: 20 }}>Want to join the core team?</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24, maxWidth: 600, marginInline: 'auto' }}>
          We recruit new organizers and technical leads at the start of every semester. Look out for announcements on our Discord.
        </p>
        <button className="btn btn-primary">Apply for Core Team</button>
      </div>
    </div>
  )
}
