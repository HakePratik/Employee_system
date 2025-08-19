import React from 'react'
import { useNavigate } from 'react-router-dom'
const Start = () => {

const Navigate = useNavigate()
  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
        <div className='p-3 rounded w-25 border loginform'>
            <h2 className='text-center '>Login Us</h2>
            <div className='text-wrap'>
                <button type="button" className='m-2 btn btn-primary'
                onClick={() => {Navigate('/employeelogin')}}>Employee</button>
                <button type="button" className='m-2 btn btn-success'
                onClick={() => {Navigate('/adminlogin')}}>Admin</button>
            </div>
        </div>
    </div>
  )
}

export default Start