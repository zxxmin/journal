import './App.scss'
import { Router, Routes, Route } from "react-router-dom"
import Month from './pages/Month'
import Days from './pages/Days'
import Tasks from './pages/Tasks'
import Word from './pages/Word'
import Nav from './components/Nav'

function App() {

  return (
    <div className="Container">
      <Nav />
      
      <Routes>
        <Route path='/' element={<Month />} />
        <Route path='/month/:month' element={<Month />} />
        <Route path='/days/:month' element={<Days />} />
        <Route path='/tasks/:id' element={<Tasks />} />
        <Route path='/word/:month' element={<Word />} />
      </Routes>
    </div>
  )
}

export default App
