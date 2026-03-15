import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import Dashboard from './pages/Dashboard'
import SkillGenome from './pages/SkillGenome'
import CodingGraph from './pages/CodingGraph'
import AIStudyPartner from './pages/AIStudyPartner'
import TeamBuilder from './pages/TeamBuilder'
import ProjectEcosystem from './pages/ProjectEcosystem'
import LearningPaths from './pages/LearningPaths'
import PersonalJourney from './pages/PersonalJourney'
import AIEventGenerator from './pages/AIEventGenerator'
import Leaderboard from './pages/Leaderboard'
import AICollaborationFinder from './pages/AICollaborationFinder'
import About from './pages/About'
import Contact from './pages/Contact'
import Team from './pages/Team'
import UpcomingEvents from './pages/UpcomingEvents'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <TopHeader />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/skill-genome" element={<SkillGenome />} />
              <Route path="/coding-graph" element={<CodingGraph />} />
              <Route path="/ai-study-partner" element={<AIStudyPartner />} />
              <Route path="/team-builder" element={<TeamBuilder />} />
              <Route path="/projects" element={<ProjectEcosystem />} />
              <Route path="/learning-paths" element={<LearningPaths />} />
              <Route path="/journey" element={<PersonalJourney />} />
              <Route path="/ai-events" element={<AIEventGenerator />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/ai-collab" element={<AICollaborationFinder />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/upcoming-events" element={<UpcomingEvents />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
