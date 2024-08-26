import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup.js";
import MyOrder from "./screens/MyOrders.js"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from "./components/ContextReducer.js";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route exact path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
          <Routes>
            <Route exact path="/myorder" element={<MyOrder />} />
          </Routes>
        </div>

      </Router>
    </CartProvider>

  );
}

export default App;
