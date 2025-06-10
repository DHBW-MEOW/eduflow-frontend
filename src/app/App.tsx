import { Routes, Route } from 'react-router-dom'
import './App.css'
import '../colors.css'
import Layout from './Layout.tsx'
import ModulPage from './modules/ModulPage.tsx'
import TopicPage from './modules/TopicPage.tsx'
import SomePage from './somePage/SomePage.tsx'
import DetailPage from './modules/DetailPage.tsx'

const App: React.FC = () => {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={ModulPage()} />
          <Route path="/modules/:moduleId" element={<TopicPage />} />
          <Route path="/modules/:moduleId/topics/:topicId" element={<DetailPage />} />
        </Routes>
    </Layout>
  )
}

export default App