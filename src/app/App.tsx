import './App.css'
import '../colors.css'

import Layout from './Layout.tsx'
import Calendar from '../components/calendar/Calendar.tsx';

const App: React.FC = () => {
  return (
    <Layout>
      <div>
        <Calendar/>
      </div>
    </Layout>
  );
};

export default App
