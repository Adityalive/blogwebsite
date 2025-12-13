import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './page/LoginPage'
import Post from './page/Post'
import Create from './page/Create'
import Register from './page/Register'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/post" element={<Post />} />
        <Route path="/create" element={<Create />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App