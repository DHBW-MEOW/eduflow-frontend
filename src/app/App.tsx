import './App.css'
import '../colors.css'

import Layout from './Layout.tsx'
import Quicklinks from '../components/quicklinks/Quicklinks.tsx'

const App: React.FC = () => {
  return (
    <div>
      <Layout>
        <Quicklinks/>
      </Layout>
    </div>
  )
}

export default App
