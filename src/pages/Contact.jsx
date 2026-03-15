import { useState } from 'react'
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react'

const socials = [
  { icon: Github,        label: 'GitHub',   href: '#', color: '#f0f4ff' },
  { icon: MessageCircle, label: 'Discord',  href: '#', color: '#5865F2' },
  { icon: Linkedin,      label: 'LinkedIn', href: '#', color: '#0A66C2' },
  { icon: Twitter,       label: 'Twitter',  href: '#', color: '#1DA1F2' },
]

const quickLinks = ['Dashboard', 'AI Study Partner', 'Team Builder', 'Leaderboard', 'AI Events']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSend = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    }, 1200)
  }

  return (
    <div className="anim-fade-in">
      <div className="page-header">
        <div className="eyebrow">// GET IN TOUCH</div>
        <h1><span className="gradient-text">Contact Us</span></h1>
        <p>Have a question, idea, or want to collaborate? Reach out and we'll get back to you soon.</p>
      </div>

      <div className="grid-65-35">
        {/* Left — Contact Form */}
        <div>
          <div className="glass-card card-glow-cyan" style={{ padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,229,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={18} style={{ color: 'var(--cyan)' }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Send a Message</span>
            </div>

            <form onSubmit={handleSend}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Your Name</label>
                  <input className="form-input" placeholder="Sam Houston" value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="sam@example.com" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" placeholder="What's this about?" value={form.subject} onChange={e => update('subject', e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-textarea"
                  placeholder="Write your message here…"
                  rows={5}
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={!form.name || !form.email || !form.message || sending}
              >
                {sending ? (
                  <>Sending…</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>

              {sent && (
                <div style={{
                  marginTop: 14, padding: '10px 16px', borderRadius: 8,
                  background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                  color: 'var(--emerald)', fontSize: 13, fontWeight: 600, textAlign: 'center',
                }}>
                  ✓ Message sent successfully! We'll respond within 24 hours.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right — Info + Socials */}
        <div>
          {/* Contact Info */}
          <div className="glass-card" style={{ padding: 22, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Contact Info</div>
            {[
              { icon: Mail,   label: 'contact@gfgcampusclub.com' },
              { icon: Phone,  label: '+1 234 567 890' },
              { icon: MapPin, label: 'CS Department, Main Campus' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
                padding: '10px 14px', borderRadius: 8,
                background: 'var(--bg-glass)', border: '1px solid var(--border)',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(0,229,255,0.1)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <item.icon size={14} style={{ color: 'var(--cyan)' }} />
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="glass-card card-glow-violet" style={{ padding: 22, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Follow Us</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px', borderRadius: 8, textDecoration: 'none',
                    background: 'var(--bg-glass)', border: '1px solid var(--border)',
                    transition: 'all 0.2s', cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '55'; e.currentTarget.style.background = s.color + '11' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-glass)' }}
                >
                  <s.icon size={16} style={{ color: s.color }} />
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)' }}>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="glass-card" style={{ padding: 22 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Newsletter</div>
            <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.5 }}>
              Subscribe to get the latest updates on events, workshops, and opportunities.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="form-input"
                placeholder="Email Address"
                style={{ flex: 1, padding: '9px 12px', fontSize: 12.5 }}
              />
              <button className="btn btn-primary" style={{ padding: '9px 14px', flexShrink: 0 }}>
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div style={{
        marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
          <span style={{ fontSize: 16 }}>⚡</span>
          <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>GFG Club</span>
          <span>· GFG Campus Club</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
          © 2026 GeeksforGeeks Campus Club. All rights reserved.
        </div>
      </div>
    </div>
  )
}
