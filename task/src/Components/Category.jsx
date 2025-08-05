import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Category() {
  const [Category, setCategory] = React.useState([])
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
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Category list</h3>
      </div>
      <Link to='/dashboard/addcategory' className='btn btn-success'> Add Category</Link>
      <div>
        <table className='table table-bordered table-striped mt-3'>
          <thead>
            <tr>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {Category.map(c => (
              <tr>
                <td>{c.name}</td>
              </tr>
            ))
            }
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Category