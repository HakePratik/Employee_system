import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

function Editemployee() {
    const { id } = useParams()
    const [employee, setemployee] = useState({
        name: '',
        email: '',
        category_id: '',
        address: '',
        salary: ''
    })

    const [Category, setCategory] = React.useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/get_category')
            .then(result => {
                if (result.data.status) {
                    setCategory(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/get_employees/'+id)
            .then(result => {
                setemployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    salary: result.data.Result[0].salary,
                    category_id: result.data.Result[0].category_id,
                })
            }).catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.put('http://localhost:3000/auth/Editemployee/'+id, employee)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Edit Employee</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label for="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" placeholder='Enter Name' value={employee.name} autoComplete='off'
                        onChange={(e) => setemployee({ ...employee, name: e.target.value })} />
                </div>
                <div className="col-12">
                    <label for="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' value={employee.email} autoComplete='off'
                        onChange={(e) => setemployee({ ...employee, email: e.target.value })} />
                </div>

                <div className="col-12">
                    <label for="inputSalary" className="form-label">Salary</label>
                    <input type="text" className="form-control" id="inputSalary" placeholder="Enter Salary" value={employee.salary} autoComplete='off'
                        onChange={(e) => setemployee({ ...employee, salary: e.target.value })} />
                </div>
                <div className="col-12">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={employee.address} autoComplete='off'
                        onChange={(e) => setemployee({ ...employee, address: e.target.value })} />
                </div>
                <div className="col-12">
                    <label for="inputcategory" className="form-label">Category</label>
                    <select name="category" className="form-control" id="cateory" placeholder="category" autoComplete='off'
                        onChange={(e) => setemployee({ ...employee, category_id: e.target.value })} >
                        {Category.map(c => {
                            return <option value={c.id}>{c.name}</option>
                        })}
                    </select>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Edit employee</button>
                </div>
            </form>
        </div>
    )
}

export default Editemployee