import React from 'react'
import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Employee = () => {
  const [employee,setEmployee] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/auth/get_employees')
      .then(result => {
        if (result.data.status) {
          setEmployee(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err =>
        console.log(err))
  }, [])
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Employee list</h3>
      </div>
      <Link to='/dashboard/addemployee' className='btn btn-success'>
        Add Employee</Link>

      <div>
        <table className='table table-bordered table-striped mt-3'>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {
              employee.map(e => (
                <tr>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td><img src={'http://localhost:3000/images/' + e.image} className='employee_image'></img></td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>
                    <Link to={'dashboard/Edit_employee/'+ e.id} className='btn btn-primary m-2'>Edit</Link>
                    <Link className='btn btn-danger '>Delete</Link>
                  </td>

                </tr>
              ))
            }
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Employee