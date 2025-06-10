import './App.css'
import '../colors.css'
import Layout from './Layout.tsx'

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