import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Cart from "../screens/Cart";
import Modal from "../Model";

import { useCart } from '../components/ContextReducer';

function Navbar() {
  const [cartView, setCartView] = useState(false);
  let data = useCart();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/');
  }
  const loadCart = () => {
    setCartView(true)
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark success-light ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 mukta-bold" to="/">JavaGo</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                </li>
                : ""}


            </ul>

            <div className='d-flex'>

              {(!localStorage.getItem("authToken")) ?
                <div>
                  <Link className="btn bg-white text-success mx-1" to="/login">LOGIN</Link>

                  <Link className="btn bg-white text-success mx-1" to="/signup">SIGN UP</Link>

                </div>
                :
                <div>
                  <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                    My Cart{" "}
                    <Badge pill bg="danger">{data.length}</Badge>
                  </div>
                  {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                  <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout </div>
                </div>

              }

            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;