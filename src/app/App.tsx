import './App.css'
import '../colors.css'

import Layout from './Layout.tsx'
import SomePage from './somePage/SomePage.tsx'

const App: React.FC = () => {
  return (
    <div>
      <Layout>
        {SomePage()}
      </Layout>
    </div>
  )
}

export default App
