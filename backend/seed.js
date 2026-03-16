require('dotenv').config({ path: require('path').join(__dirname, '../../.env.example') })
const mongoose = require('mongoose')
const User     = require('../models/User')
const Project  = require('../models/Project')
const Event    = require('../models/Event')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/codeverse'

const usersData = [
  { name: 'Sam Houston',  email: 'sam@rit.edu',    passwordHash: 'password123', year: '4th Yr', dept: 'CSE', color: '#00e5ff', rating: 1824, xp: 5600, level: 6, solvedCount: 261, streak: 21, skills: ['Backend', 'Cloud', 'DevOps', 'Node.js'], role: 'Backend Engineer',
    skillLevels: { DSA: 78, 'Backend Dev': 85, 'System Design': 55, Frontend: 60, 'Cloud/DevOps': 72, 'AI/ML': 42 },
    badges: ['🚀 First Problem', '🧠 Bootcamp Join', '💯 50 Problems', '⚡ Streak 7', '🏆 Hackathon 2nd', '🤝 Team Player', '🌳 Tree Master', '🔗 Graph Hero', '💼 First Internship', '☁️ Cloud Deployed', '🔥 100 Streak', '⚔️ LeetCode Knight', '🌍 OSS Contributor', '⭐ 47 Stars', '🧬 Builder', '🏗️ Project Lead'],
    milestones: [
      { date: 'January 2024',  dot: 'cyan',    title: 'Started the DSA Journey',       desc: 'Enrolled in the campus DSA Bootcamp. Solved first 10 LeetCode problems.',  xp: 200,  badges: ['🚀 First Problem', '🧠 Bootcamp Join'] },
      { date: 'February 2024', dot: 'violet',  title: 'Hit 50-Problem Milestone',      desc: 'Solved 50 problems covering Arrays, Strings, and Binary Search.',            xp: 500,  badges: ['💯 50 Problems', '⚡ Streak 7'] },
      { date: 'March 2024',    dot: 'emerald', title: 'First Hackathon — HackFest RIT',desc: 'Built a real-time collaborative code editor with team of 4. Placed 2nd.',    xp: 800,  badges: ['🏆 Hackathon 2nd', '🤝 Team Player'] },
      { date: 'May 2024',      dot: 'amber',   title: 'Cracked Graphs & Trees',        desc: 'Completed Striver\'s Graph Series. Solved 40+ tree and graph problems.',      xp: 400,  badges: ['🌳 Tree Master', '🔗 Graph Hero'] },
      { date: 'June 2024',     dot: 'cyan',    title: 'Backend Internship @ TechOrbit',desc: 'Worked on REST APIs with Node.js and MongoDB. Deployed to AWS.',              xp: 1200, badges: ['💼 First Internship', '☁️ Cloud Deployed'] },
      { date: 'August 2024',   dot: 'violet',  title: '100-Problem Streak 🔥',         desc: 'Maintained a 21-day daily coding streak. Achieved Knight rating on LeetCode.',xp: 1000, badges: ['🔥 100 Streak', '⚔️ LeetCode Knight'] },
      { date: 'November 2024', dot: 'emerald', title: 'Open Source — 2 PRs Merged',    desc: 'Contributed to real-world open-source projects. 2 PRs merged on GitHub.',    xp: 600,  badges: ['🌍 OSS Contributor', '⭐ 47 Stars'] },
      { date: 'January 2025',  dot: 'amber',   title: 'Started CodeVerse AI Project',  desc: 'Leading development of CodeVerse AI for the college hackathon.',              xp: 900,  badges: ['🧬 Builder', '🏗️ Project Lead'] },
    ]
  },
  { name: 'Rahul Singh',  email: 'rahul@rit.edu',  passwordHash: 'password123', year: '4th Yr', dept: 'CSE', color: '#a855f7', rating: 1910, xp: 6200, level: 7, solvedCount: 312, streak: 45, skills: ['AI/ML', 'Data Science', 'Python'], role: 'ML Engineer',       badges: ['🤖 AI Pioneer', '📊 Data Wizard'] },
  { name: 'Priya Kumar',  email: 'priya@rit.edu',  passwordHash: 'password123', year: '3rd Yr', dept: 'CSE', color: '#ec4899', rating: 1760, xp: 4800, level: 5, solvedCount: 208, streak: 9,  skills: ['Frontend', 'React', 'UI/UX'],       role: 'Frontend Developer', badges: ['🎨 Design Queen', '⚛️ React Pro'] },
  { name: 'Arjun Joshi',  email: 'arjun@rit.edu',  passwordHash: 'password123', year: '2nd Yr', dept: 'CSE', color: '#10b981', rating: 1540, xp: 3200, level: 4, solvedCount: 172, streak: 6,  skills: ['UI/UX', 'Figma', 'Frontend'],       role: 'UI/UX Designer',     badges: ['🎨 Design Win'] },
  { name: 'Sara Menon',   email: 'sara@rit.edu',   passwordHash: 'password123', year: '3rd Yr', dept: 'CSE', color: '#f59e0b', rating: 1680, xp: 4200, level: 5, solvedCount: 244, streak: 18, skills: ['Backend', 'Node.js', 'Security', 'Cloud'], role: 'Backend Engineer', badges: ['🔒 Security+'] },
  { name: 'Karan Patel',  email: 'karan@rit.edu',  passwordHash: 'password123', year: '3rd Yr', dept: 'CSE', color: '#3b82f6', rating: 1620, xp: 3900, level: 4, solvedCount: 231, streak: 15, skills: ['Mobile', 'React Native', 'Frontend'], role: 'Mobile Developer',  badges: ['📱 App Shipped'] },
  { name: 'Neha Verma',   email: 'neha@rit.edu',   passwordHash: 'password123', year: '4th Yr', dept: 'CSE', color: '#f43f5e', rating: 1880, xp: 5900, level: 6, solvedCount: 298, streak: 38, skills: ['Data Science', 'AI/ML', 'Cloud', 'Python'], role: 'Data Scientist', badges: ['📊 Kaggle Expert'] },
  { name: 'Dev Mishra',   email: 'dev@rit.edu',    passwordHash: 'password123', year: '2nd Yr', dept: 'CSE', color: '#8b5cf6', rating: 1510, xp: 2800, level: 3, solvedCount: 187, streak: 7,  skills: ['DevOps', 'Docker', 'Cloud', 'Backend'], role: 'DevOps Engineer',  badges: ['🐳 Docker Pro'] },
  { name: 'Aisha Raza',   email: 'aisha@rit.edu',  passwordHash: 'password123', year: '3rd Yr', dept: 'CSE', color: '#06b6d4', rating: 1720, xp: 4100, level: 5, solvedCount: 219, streak: 12, skills: ['Security', 'Backend', 'Cloud'],        role: 'Security Analyst',   badges: ['🔐 CTF Winner'] },
  { name: 'Vikram Bose',  email: 'vikram@rit.edu', passwordHash: 'password123', year: '4th Yr', dept: 'CSE', color: '#84cc16', rating: 1795, xp: 5100, level: 6, solvedCount: 275, streak: 29, skills: ['Blockchain', 'Solidity', 'Backend'],   role: 'Web3 Developer',     badges: ['⛓️ Chain Builder'] },
]

const projectsData = [
  { title: 'Smart Traffic Monitoring System', domain: 'AI/ML',       desc: 'Real-time traffic density analysis using computer vision. Edge deployment on Raspberry Pi.', tags: ['Computer Vision', 'Edge AI', 'Python'], openRoles: ['ML Engineer', 'Embedded Dev', 'Frontend'], stars: 24 },
  { title: 'CampusBot — AI for Student Queries', domain: 'AI',      desc: 'LLM-powered conversational assistant for answering campus queries about fees, events, timetables.', tags: ['LLM', 'NLP', 'FastAPI', 'React'], openRoles: ['Backend', 'AI/ML', 'UI/UX'], stars: 31 },
  { title: 'GreenTrack — Carbon Footprint Logger', domain: 'Sustainability', desc: 'Mobile app that tracks personal carbon footprint with gamification and leaderboard.', tags: ['Flutter', 'Node.js', 'Firebase'], openRoles: ['Mobile Dev', 'Backend', 'UI/UX'], stars: 19 },
  { title: 'DecentraVote — Blockchain Election', domain: 'Blockchain',desc: 'Tamper-proof campus election system built on Ethereum. Transparent, auditable, anonymous.', tags: ['Solidity', 'Web3.js', 'IPFS'], openRoles: ['Blockchain Dev', 'Frontend', 'Security'], stars: 15 },
  { title: 'HealthPulse — Rural Diagnostics', domain: 'Healthcare',  desc: 'Low-bandwidth mobile diagnostic tool for rural clinics. Offline-first with AI triage.', tags: ['React Native', 'TensorFlow Lite', 'SQLite'], openRoles: ['Mobile Dev', 'AI/ML', 'Backend'], stars: 27 },
  { title: 'CodeDuel — Real-time CP Arena', domain: 'EdTech',        desc: 'Competitive programming duel platform. Real-time multi-room coding battles with live judge.', tags: ['WebSocket', 'Go', 'React', 'Docker'], openRoles: ['Backend', 'Frontend', 'DevOps'], stars: 38 },
]

const eventsData = [
  { title: 'Intro to ML Workshop',          icon: '🤖', type: 'Workshop',  domain: 'AI/ML',       date: 'Mar 22, 2025', time: '3:00 PM', format: 'In-person', capacity: 40,  tags: ['AI/ML', 'Beginner-friendly'], color: '#a855f7', aiConfidence: 94, votes: 47, aiReason: 'Machine Learning searches spiked +47% this week. 72 students enrolled in ML track.', isAIGenerated: true },
  { title: 'System Design Bootcamp',        icon: '🏗️', type: 'Bootcamp',  domain: 'Backend',     date: 'Mar 29, 2025', time: '2:00 PM', format: 'Hybrid',    capacity: 60,  tags: ['Interview Prep', 'Advanced'],  color: '#00e5ff', aiConfidence: 89, votes: 38, aiReason: 'System Design queries up 38%. Placement season approaching.', isAIGenerated: true },
  { title: 'Mobile Dev Hackathon',          icon: '📱', type: 'Hackathon', domain: 'Mobile',      date: 'Apr 5, 2025',  time: '9:00 AM', format: 'In-person', capacity: 80,  tags: ['Mobile', 'Team event'],        color: '#ec4899', aiConfidence: 82, votes: 31, aiReason: 'React Native searches up 29%. 45 students in mobile track.', isAIGenerated: true },
  { title: 'Docker & Kubernetes Deep Dive', icon: '🐳', type: 'Workshop',  domain: 'DevOps',      date: 'Apr 12, 2025', time: '4:00 PM', format: 'Online',    capacity: 50,  tags: ['DevOps', 'Cloud'],             color: '#3b82f6', aiConfidence: 78, votes: 22, aiReason: 'DevOps searches jumped +24%. Growing Cloud & DevOps skill track.', isAIGenerated: true },
  { title: 'Web3 & Blockchain Intro',       icon: '⛓️', type: 'Talk',      domain: 'Blockchain',  date: 'Apr 18, 2025', time: '5:00 PM', format: 'Hybrid',    capacity: 35,  tags: ['Blockchain', 'Web3'],          color: '#84cc16', aiConfidence: 75, votes: 19, aiReason: 'Blockchain searches skyrocketed +62% — fastest growing topic.', isAIGenerated: true },
]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Project.deleteMany({})
    await Event.deleteMany({})
    console.log('🗑️  Cleared existing data')

    // Seed users
    const createdUsers = []
    for (const u of usersData) {
      const user = new User(u)
      await user.save()
      createdUsers.push(user)
      console.log(`👤 Created user: ${user.name}`)
    }

    // Seed projects — assign postedBy to random users
    for (let i = 0; i < projectsData.length; i++) {
      const proj = new Project({
        ...projectsData[i],
        postedBy: createdUsers[i % createdUsers.length]._id,
        suggestedCollaborators: [
          { user: createdUsers[1]._id, assignedRole: 'AI/ML' },
          { user: createdUsers[2]._id, assignedRole: 'Frontend' },
          { user: createdUsers[3]._id, assignedRole: 'UI/UX' },
        ]
      })
      await proj.save()
      console.log(`📁 Created project: ${proj.title}`)
    }

    // Seed events
    for (const e of eventsData) {
      const event = new Event({ ...e, createdBy: createdUsers[0]._id })
      await event.save()
      console.log(`📅 Created event: ${event.title}`)
    }

    console.log('\n✅ Database seeded successfully!')
    console.log(`👥 ${createdUsers.length} users`)
    console.log(`📁 ${projectsData.length} projects`)
    console.log(`📅 ${eventsData.length} events`)
    console.log('\n🔑 Login with any user:')
    console.log('   Email: sam@rit.edu | Password: password123')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()
