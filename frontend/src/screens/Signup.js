import React, { useState } from 'react'
import { Link } from "react-router-dom";


export default function Signup() {

  const [credentials, setCredentials] = useState({name: "test 22", email: "gaurab@gmail.com", password: "234234",location: "asdasdasdasd"});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const response = await fetch("http://localhost:7000/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
  }


  const updateCredentials = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });

  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={updateCredentials} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" name='email' value={credentials.email} onChange={updateCredentials} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={updateCredentials} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" className="form-control" name='location' value={credentials.location} onChange={updateCredentials} />
        </div>

        <button type="submit" className="m-3 btn btn-success" >Submit</button>
        <Link to="/login" className='m-3 btn btn-danger' >Already a User</Link>
      </form>
    </div>
  )
}
