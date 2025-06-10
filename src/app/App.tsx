import './App.css'
import '../colors.css'
import Layout from './Layout.tsx'

const App: React.FC = () => {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={Home()} />
          <Route path="/studyplan" element={Studyplan()} />
          <Route path="/todo" element={Todo()} />
          <Route path="/modules" element={ModulPage()} />
          <Route path="/somepage" element={SomePage()} />
          <Route path="/modules/:moduleId" element={<TopicPage />} />
          <Route path="/modules/:moduleId/topics/:topicId" element={<DetailPage />} />
        </Routes>
      <h1>aöslkdjfaösldjf</h1>
    </Layout>
  )
}

export default App