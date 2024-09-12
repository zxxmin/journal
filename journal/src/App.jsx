import './App.scss'
import { Routes, Route } from "react-router-dom"
import Month from './pages/Month'
import Days from './pages/Days'
import Tasks from './pages/Tasks'
import Word from './pages/Word'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Month />} />
      <Route path='/days' element={<Days />} />
      <Route path='/tasks:id' element={<Tasks />} />
      <Route path='/word' element={<Word />} />
    </Routes>
    </>
  )
}

export default App
