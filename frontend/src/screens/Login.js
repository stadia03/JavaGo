import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const response = await fetch("http://localhost:7000/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    let response_json = await response.json(); // catching the response hereee
    console.log(response_json);
    if (!response_json.success) {
      alert("Enter Valid Credentials");
    }
    else {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem("authToken", response_json.authToken);
      navigate('/')
    }
  }

  const updateCredentials = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <Navbar/>
      <div className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div className='border p-4'>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={updateCredentials} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} onChange={updateCredentials} />
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/signup" className='m-3 btn btn-danger'>I'm a New User</Link>
          </form>
        </div>
      </div>
      <Footer/>
    </div>

  )
}
