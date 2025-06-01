import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './home/Home.tsx'
import Layout from './Layout.tsx'
import Modules from './modules/Modules.tsx'
import Studyplan from './studyplan/Studyplan.tsx'
import Todo from './todo/Todo.tsx'
//import React from 'react'
//import ReactDOM from 'react-dom';

function App() {

  return (
    <Layout>
        <Routes>
          <Route path="/" element={Home()} />
          <Route path="/studyplan" element={Studyplan()} />
          <Route path="/todo" element={Todo()} />
          <Route path="/modules" element={Modules()} />
        </Routes>
    </Layout>
  )
}

export default App
