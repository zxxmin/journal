import './App.css'
import './assets/css/style.scss'
import { Routes, Route } from "react-router-dom"
import Month from "./pages/Month"
import Days from "./pages/Days"
import Word from "./pages/Word"
import Task from "./pages/Task"
import Notfound from './pages/Notfound'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Month />} />
      <Route path="/days" element={<Days />} />
      <Route path="/word" element={<Word />} />
      <Route path="/task" element={<Task />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  )
}

export default App
