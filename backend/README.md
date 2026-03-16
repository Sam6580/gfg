# CodeVerse AI — Backend Setup Guide

## Prerequisites
- Node.js 20+
- MongoDB (local or MongoDB Atlas free tier)
- Groq API key → https://console.groq.com (free, takes 30 seconds)

---

## 1. Backend Setup

```bash
cd codeverse-backend
npm install
```

Copy the env file and fill in your values:
```bash
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb://localhost:27017/codeverse
JWT_SECRET=any_random_long_string_here
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx   ← paste your Groq key here
```

Seed the database with all campus data:
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```

Backend runs at: http://localhost:5000/api

---

## 2. Frontend Setup

In the root of the project (where package.json for React is):
```bash
# .env already created — just run:
npm run dev
```

Frontend runs at: http://localhost:5173

---

## 3. Test the AI endpoints

```bash
# Study Plan
curl -X POST http://localhost:5000/api/ai/study-plan \
  -H "Content-Type: application/json" \
  -d '{"goal":"Crack FAANG","timeframe":"3 months"}'

# Find Teammates
curl -X POST http://localhost:5000/api/ai/find-teammates \
  -H "Content-Type: application/json" \
  -d '{"projectIdea":"Build an AI study planner","domain":"AI / Machine Learning"}'

# Suggest Events (also fetches GitHub trending topics live)
curl -X POST http://localhost:5000/api/ai/suggest-events \
  -H "Content-Type: application/json" \
  -d '{}'

# Build Team
curl -X POST http://localhost:5000/api/ai/build-team \
  -H "Content-Type: application/json" \
  -d '{"hackathonType":"AI/ML","teamSize":4}'
```

---

## 4. Login credentials (seeded)

| Name         | Email              | Password    |
|--------------|--------------------|-------------|
| Sam Houston  | sam@rit.edu        | password123 |
| Rahul Singh  | rahul@rit.edu      | password123 |
| Priya Kumar  | priya@rit.edu      | password123 |
| (all others) | firstname@rit.edu  | password123 |

---

## 5. API Overview

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| POST   | /api/auth/login             | Login, returns JWT token             |
| POST   | /api/auth/register          | Register new student                 |
| GET    | /api/dashboard/stats        | Live stats for dashboard             |
| GET    | /api/dashboard/charts       | Weekly activity chart data           |
| GET    | /api/dashboard/feed         | Recent activity feed                 |
| GET    | /api/skills/genome          | Campus skill distribution            |
| GET    | /api/skills/leaderboard     | Ranked student list                  |
| GET    | /api/projects               | All projects (with ?domain= filter)  |
| POST   | /api/projects               | Create project (auth required)       |
| GET    | /api/events                 | All events                           |
| POST   | /api/events/:id/vote        | Vote on an event (auth required)     |
| GET    | /api/users                  | All users (for coding graph)         |
| GET    | /api/users/:id/journey      | User milestones, XP, badges          |
| GET    | /api/users/graph/connections| Node+edge data for coding graph      |
| POST   | /api/ai/study-plan          | 🤖 Groq AI: generate study roadmap   |
| POST   | /api/ai/find-teammates      | 🤖 Groq AI: match collaborators      |
| POST   | /api/ai/suggest-events      | 🤖 Groq AI + GitHub: suggest events  |
| POST   | /api/ai/build-team          | 🤖 Groq AI: build hackathon team     |

---

## 6. What to say to judges

> "We integrated Groq's LLaMA 3 LLM which dynamically generates personalized study roadmaps, matches real students from our campus database for project collaboration, and pulls live GitHub trending data to recommend the most relevant events. Every AI feature has a smart fallback so the demo never breaks."

---

## Architecture

```
React Frontend (Vite)
       ↓ fetch() via src/api.js
Express Backend (Node.js)
       ↓ Mongoose
MongoDB (all student/project/event data)
       ↓ Groq API (LLaMA 3)
Live AI responses
       ↓ GitHub API
Real trending topics for event suggestions
```
