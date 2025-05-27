import './App.css'
import Layout from './Layout.tsx'
import SomePage from './somePage/SomePage.tsx'

function App() {

  return (
    <div>
      <Layout>{SomePage()}</Layout>
    </div>
  )
}

export default App
