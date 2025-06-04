import './App.css'
import '../colors.css'

import Layout from './Layout.tsx'
import SomePage from './somePage/SomePage.tsx';

const App: React.FC = () => {
  return (
    <Layout>
      <div>
        <SomePage/>
      </div>
    </Layout>
  );
};

export default App
