import { Routes, Route } from "react-router";

import Start from './start/Start';
import StartLayout from './StartLayout';

import './App.css'
import '../colors.css';
import '../index.css';

import Login from './login/Login';
import AppLayout from './AppLayout';
import ModulPage from './modules/ModulPage';
import Register from './register/Register';
import Profile from './profile/Profile';
import Home from './home/Home';
import Studyplan from './studyplan/Studyplan';
import TopicPage from './modules/TopicPage';
import DetailTopicPage from './modules/DetailTopicPage';
import DetailExamPage from './modules/DetailExamPage';
import NotFoundPage from './error/NotFoundPage';

export const App: React.FC = () => {
  return (
    <Routes>
        <Route element={<StartLayout />}>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AppLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/studyplan" element={<Studyplan />} />

            <Route path="/modules" element={<ModulPage />} />
            <Route path="/modules/:moduleId" element={<TopicPage />} />
            <Route path="/modules/:moduleId/topics/:topicId" element={<DetailTopicPage />} />
            <Route path="/modules/:moduleId/exams/:examId" element={<DetailExamPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App