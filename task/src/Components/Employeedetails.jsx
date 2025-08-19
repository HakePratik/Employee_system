import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Employeedetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [details, setdetails] = useState([]) 
  useEffect(() => {
    axios.get(`http://localhost:3000/employee/information/${id}`)
      .then((result) => {
        setdetails(result.data[0])  
      })
      .catch(err => console.log(err))
  }, [])

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid")
          navigate('/start')
        }
      }).catch(err => console.log(err))
  }

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Employee Management System</h4>
      </div>

      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        {
          <img 
            src={`http://localhost:3000/Images/${details.image}`} 
            className='employee_image' 
            alt="Employee" 
          />
        }
        <div className='d-flex align-items-center flex-column mt-5'>
          <h3>Name: {details.name}</h3>
          <h3>Email: {details.email}</h3>
          <h3>Salary: ${details.salary}</h3>
        </div>

        <div>
          <button className='btn btn-primary me-2'>Edit</button>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Employeedetails
