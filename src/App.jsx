import { useState } from 'react'
import {Routes, Route, Link, Navigate, Router, BrowserRouter} from 'react-router-dom'
import Homepage from './pages/Homepage'
import SavingsOptions from './pages/SavingsOptions'
import UserInfo from './pages/UserInfo'
import Signup from './pages/SignUp'
import Dashboard from './pages/Dashboard'
function App() {
  return (
// manages the navigation between pages inside the app. It allows the app to render different components based on the current URL.
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/options" element={<SavingsOptions />} />
      <Route path="/userInfo" element={<UserInfo />} />
     <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

  );
}

export default App
