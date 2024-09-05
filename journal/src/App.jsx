import './App.css'
import './assets/css/style.scss'
import { useReducer } from 'react'
import { Routes, Route } from "react-router-dom"
import Month from "./pages/Month"
import Days from "./pages/Days"
import Word from "./pages/Word"
import Task from "./pages/Task"
import Notfound from './pages/Notfound'

function reducer(state, action) {
  return state;
}

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  return (
    <>
      <Routes>
        <Route path="/:id" element={<Month />} />
        <Route path="/days" element={<Days />} />
        <Route path="/word" element={<Word />} />
        <Route path="/task/:id" element={<Task />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
