import './App.css'
import Layout from './Layout.tsx'
import Login from './somePage/SomePage.tsx'

function App() {

  return (
    <div>
      <Layout>{Login()}</Layout>
    </div>
  )
}

export default App
