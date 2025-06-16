import './App.css'
import '../colors.css'
import Layout from './Layout.tsx'
import ModulPage from './modules/ModulPage.tsx'
import TopicPage from './modules/TopicPage.tsx'
import { Route, Routes } from 'react-router'

const App: React.FC = () => {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={ModulPage()} />
          <Route path="/modules/:moduleId" element={<TopicPage />} />
        </Routes>
    </Layout>
  )
}

export default App