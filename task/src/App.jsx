import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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
import Start from './Components/Start.jsx'
import Employeelogin from './Components/Employeelogin.jsx'
import Employeedetails from './Components/Employeedetails.jsx'
import React from 'react'
function App() {
  
  useEffect(() => {
    axios.get('http://localhost:3000/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === 'admin') {
            Navigate('/dashboard')
          } else {
            Navigate('/Employeedetails/' + result.data.id)
          }
        } else {
          Navigate('/start')
        }
      })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />} ></Route>
        <Route path="/employeelogin" element={<Employeelogin />} ></Route>
        <Route path='/employeedetails/:id' element={<Employeedetails />}> </Route>
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path='' element={<Home />}> </Route>
          <Route path='/dashboard/employee' element={<Employee />}> </Route>
          <Route path='/dashboard/category' element={<Category />}> </Route>
          <Route path='/dashboard/profile' element={<Profile />}> </Route>
          <Route path='/dashboard/addcategory' element={<Addcategory />}> </Route>
          <Route path='/dashboard/addemployee' element={<Addemployee />}> </Route>
          <Route path='/dashboard/Edit_employee/:id' element={<Editemployee />}> </Route>
        </Route>
      </Routes >
    </BrowserRouter >
  )
}

export default App
