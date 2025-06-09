import { Routes, Route } from 'react-router-dom'
import './App.css'
import '../colors.css'
import Layout from './Layout.tsx'
import ModulPage from './modulPage/ModulPage.tsx'
import TopicPage from './modulPage/TopicPage.tsx'

const App: React.FC = () => {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={ModulPage()} />
          <Route path="/module/:id" element={TopicPage()} />
        </Routes>
    </Layout>
  )
}

export default App