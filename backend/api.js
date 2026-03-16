// src/api.js
// Central API client — all backend calls go through here

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function getToken() {
  return localStorage.getItem('cv_token')
}

async function request(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }

  return res.json()
}

// ── Auth ──────────────────────────────────────────────────────
export const authAPI = {
  login:    (email, password) => request('/auth/login',    { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data)            => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me:       ()                => request('/auth/me'),
}

// ── Dashboard ─────────────────────────────────────────────────
export const dashboardAPI = {
  stats:    () => request('/dashboard/stats'),
  charts:   () => request('/dashboard/charts'),
  feed:     () => request('/dashboard/feed'),
  insights: () => request('/dashboard/insights'),
}

// ── Skills / Leaderboard ──────────────────────────────────────
export const skillsAPI = {
  genome:      () => request('/skills/genome'),
  leaderboard: () => request('/skills/leaderboard'),
}

// ── Projects ──────────────────────────────────────────────────
export const projectsAPI = {
  list:   (domain) => request(`/projects${domain ? `?domain=${domain}` : ''}`),
  get:    (id)     => request(`/projects/${id}`),
  create: (data)   => request('/projects',          { method: 'POST',   body: JSON.stringify(data) }),
  star:   (id)     => request(`/projects/${id}/star`,{ method: 'PATCH' }),
  delete: (id)     => request(`/projects/${id}`,    { method: 'DELETE' }),
}

// ── Events ────────────────────────────────────────────────────
export const eventsAPI = {
  list:   ()       => request('/events'),
  create: (data)   => request('/events',          { method: 'POST', body: JSON.stringify(data) }),
  vote:   (id)     => request(`/events/${id}/vote`,{ method: 'POST' }),
  delete: (id)     => request(`/events/${id}`,    { method: 'DELETE' }),
}

// ── Users ─────────────────────────────────────────────────────
export const usersAPI = {
  list:        ()       => request('/users'),
  get:         (id)     => request(`/users/${id}`),
  journey:     (id)     => request(`/users/${id}/journey`),
  graphData:   ()       => request('/users/graph/connections'),
  updateSkills:(id, d)  => request(`/users/${id}/skills`, { method: 'PATCH', body: JSON.stringify(d) }),
  logProblem:  (id, d)  => request(`/users/${id}/problems`,{ method: 'POST', body: JSON.stringify(d) }),
}

// ── AI ────────────────────────────────────────────────────────
export const aiAPI = {
  studyPlan:     (data) => request('/ai/study-plan',      { method: 'POST', body: JSON.stringify(data) }),
  findTeammates: (data) => request('/ai/find-teammates',  { method: 'POST', body: JSON.stringify(data) }),
  suggestEvents: (data) => request('/ai/suggest-events',  { method: 'POST', body: JSON.stringify(data) }),
  buildTeam:     (data) => request('/ai/build-team',      { method: 'POST', body: JSON.stringify(data) }),
}
