import React,{ useEffect,useState } from 'react'
import axios from 'axios'

function Home() {
  const [adminTotl, setAdminTotal] = useState();
  const [employeeTotal, setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();
  const [admindata,setadmindata] = useState([]);
  useEffect(() => {
    admincount();
    employeecount();
    salarycount();
    adminrecords();
  }, []);

const adminrecords = () => {
  axios.get('http://localhost:3000/auth/admin_recoords')
    .then((response) => { 
      if (response.data.status) {
        setadmindata(response.data.Result);
      } 
    });
}
const admincount = () => {
  axios.get('http://localhost:3000/auth/get_admins')
    .then((response) => { 
      if (response.data.status) {
        setAdminTotal(response.data.Result[0].admin);
      } 
    });
}
const employeecount = () => {
  axios.get('http://localhost:3000/auth/count_employees')
    .then((response) => { 
      if (response.data.status) {
        setEmployeeTotal(response.data.Result[0].employee);
      } 
    });
}
const salarycount = () => {
  axios.get('http://localhost:3000/auth/get_salarys')
    .then((response) => { 
      if (response.data.status) {
        setSalaryTotal(response.data.Result[0].salary);
      } 
    });
}
  return (
    <div>
      <div  className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-3 pb-2 border border-2 rounded shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h3>Admin</h3>
          </div>
          <hr/>
          <div className='text-center pb-1'>
            <h4>Total:</h4>
            <h4>{adminTotl}</h4>
          </div>
        </div>
        <div className='px-3 pt-3 pb-2 border border-2 rounded shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h3>Employee</h3>
          </div>
          <hr/>
          <div className='text-center pb-1'>
            <h4>Total:</h4>
            <h4>{employeeTotal} </h4>
          </div>
        </div>
        <div className='px-3 pt-3 pb-2 border border-2 rounded shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h3>Salary</h3>
          </div>
          <hr/>
          <div className='text-center pb-1'>
            <h4>Total:</h4>
            <h4>{salaryTotal}</h4>
          </div>
        </div>
      </div>
      <div>
        <h2>List of Admins</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admindata.map(a => (
                <tr key={a.id}>
                  <td>{a.email}</td>
                  <td>
                  <button
                    className="btn btn-info btn-sm me-2">
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm" >
                    Delete
                  </button>
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
export default Home