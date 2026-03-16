const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const authRoutes      = require('./routes/auth')
const dashboardRoutes = require('./routes/dashboard')
const skillRoutes     = require('./routes/skills')
const projectRoutes   = require('./routes/projects')
const eventRoutes     = require('./routes/events')
const userRoutes      = require('./routes/users')
const aiRoutes        = require('./routes/ai')

const app = express()

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

// Global rate limiter — 200 req/15min per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests, please try again later.' }
}))

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth',      authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/skills',    skillRoutes)
app.use('/api/projects',  projectRoutes)
app.use('/api/events',    eventRoutes)
app.use('/api/users',     userRoutes)
app.use('/api/ai',        aiRoutes)

// Health check
app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'CodeVerse AI API', version: '1.0.0' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  })
})

module.exports = app
