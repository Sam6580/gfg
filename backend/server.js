require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/config/db')

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 CodeVerse API running on port ${PORT}`)
    console.log(`📦 MongoDB connected`)
    console.log(`🤖 Groq AI ready`)
    console.log(`🌐 http://localhost:${PORT}/api\n`)
  })
})
