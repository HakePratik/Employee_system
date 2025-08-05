import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function AddEmployee() {
    const [employee, setemployee] = useState({
        name: '',
        email: '',
        password: '',
        category_id: '',
        address: '',
        salary: '',
        image: ''
    })

    const [Category, setCategory] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/get_category')
            .then(result => {
                if (result.data.status) {
                    setCategory(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => {
                console.log(err)
            })
    }, [])
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('name', employee.name)
        formData.append('email', employee.email)
        formData.append('password', employee.password)
        formData.append('address', employee.address)
        formData.append('salary', employee.salary)
        formData.append('category_id', employee.category_id)
        formData.append('image', employee.image)
        axios.post('http://localhost:3000/auth/Addemployee', formData)
            .then(result => {
                if (result.data.status) {
                    navigate('/dashboard/employee')
                }
                else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err));

    }
    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Employee</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label for="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                        onChange={(e) => setemployee({ ...employee, name: e.target.value })} />
                </div>
                <div className="col-12">
                    <label for="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                        onChange={(e) => setemployee({ ...employee, email: e.target.value })} />
                </div>
                <div className="col-12">
                    <label for="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
                        onChange={(e) => setemployee({ ...employee, password: e.target.value })} />
                </div>
                <div className="col-12">
                    <label for="inputSalary" className="form-label">Salary</label>
                    <input type="text" className="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
                        onChange={(e) => setemployee({ ...employee, salary: e.target.value })} />
                </div>
                <div className="col-12">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
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
                <div className="col-12 mb-3">
                    <label className="form-label" for="inputGroupFile01">Select Image</label>
                    <input type="file" className="form-control" id="inputGroupFile01" name='image'
                        onChange={(e) => setemployee({ ...employee, image: e.target.files[0] })} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>

    )
}

export default AddEmployee