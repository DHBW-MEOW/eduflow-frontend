import './App.css'
import '../colors.css'

import Layout from './Layout.tsx'
import PopUpExample from './popUpExamplePage/PopUpExample.tsx';
import GridExamplePage from './gridExamplePage/GridExamplePage.tsx';

const App: React.FC = () => {
  return (
    <Layout>
      <GridExamplePage/>
    </Layout>
  );
};

export default App
