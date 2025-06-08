import { Routes, Route } from 'react-router-dom'
import './App.css'
import '../colors.css'
import Layout from './Layout.tsx'
import Home from './home/Home.tsx'
import Modules from './modules/Modules.tsx'
import Studyplan from './studyplan/Studyplan.tsx'
import Todo from './todo/Todo.tsx'
import SomePage from './somePage/SomePage.tsx'

const App: React.FC = () => {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={Home()} />
          <Route path="/studyplan" element={Studyplan()} />
          <Route path="/todo" element={Todo()} />
          <Route path="/modules" element={Modules()} />
          <Route path="/somepage" element={SomePage()} />
        </Routes>
    </Layout>
  )
}

export default App
