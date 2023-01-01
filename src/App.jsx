import { useState } from 'react'
import { Route ,Routes} from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import NavBar from './Components/NavBar'
import Posts from './Components/Posts'
import Saved from './Components/Saved'
import { db } from './firebaseconfigu'
import Register from './Components/Register'
function App() {
  console.log(db)

  return (
    <div>
      <NavBar/>
      <Routes>
         <Route path="/login" element={<Login/>} />
         <Route path="register" element={<Register/>} />
         <Route path="/" element={<Posts/>} />
         <Route path="saved" element={<Saved/>} />
      </Routes>
      
         
    </div>
  )
}

export default App
