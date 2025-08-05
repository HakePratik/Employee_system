import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './Components/login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard.jsx'
import Profile from './Components/Profile.jsx'
import Category from './Components/Category.jsx'
import Employee from './Components/Employee.jsx'
import Addcategory from './Components/Addcategory.jsx'
import Addemployee from './Components/Addemployee.jsx'
import Home from './Components/Home.jsx'
import Editemployee from './Components/Editemployee.jsx'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<Login />} ></Route>
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path='' element={<Home />}> </Route>
          <Route path='/dashboard/employee' element={<Employee />}> </Route>
          <Route path='/dashboard/category' element={<Category />}> </Route>
          <Route path='/dashboard/profile' element={<Profile />}> </Route>
          <Route path='/dashboard/addcategory' element={<Addcategory />}> </Route>
          <Route path='/dashboard/addemployee' element={<Addemployee />}> </Route>
          <Route path='/dashboard/Edit_employee/:id' element={<Editemployee/>}> </Route>
        </Route>
      </Routes >
    </BrowserRouter >
  )
}

export default App
