import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";

import Start from './app/start/Start';
import StartLayout from './app/StartLayout';

import './colors.css';
import './index.css';

import Login from './app/login/Login';
import AppLayout from './app/AppLayout';
import ModulPage from './app/modules/ModulPage';
import Register from './app/register/Register';
import Profile from './app/profile/Profile';
import Home from './app/home/Home';
import Studyplan from './app/studyplan/Studyplan';
import TopicPage from './app/modules/TopicPage';
import DetailTopicPage from './app/modules/DetailTopicPage';
import DetailExamPage from './app/modules/DetailExamPage';
import NotFoundPage from './app/error/NotFoundPage';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
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
  </BrowserRouter>
)