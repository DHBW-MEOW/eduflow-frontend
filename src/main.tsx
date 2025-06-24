import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";

import Start from './app/start/Start';
import StartLayout from './app/StartLayout';

import './colors.css';
import './index.css';
import Login from './app/login/Login';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
        <Route element={<StartLayout />}>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login />} />
        </Route>
    </Routes>
  </BrowserRouter>
)