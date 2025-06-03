import './App.css'
import '../colors.css'

import Layout from './Layout.tsx'
import PopUpExample from './popUpExamplePage/PopUpExample.tsx';

const App: React.FC = () => {
  return (
    <Layout>
      <PopUpExample/>
    </Layout>
  );
};

export default App
