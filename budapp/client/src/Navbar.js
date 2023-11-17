import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Nav">
      <nav>
        <ul>
          <Link to="/">Home</Link>

          <Link to="/login">Login</Link>

          <Link to="/signup">Signup</Link>

          <Link to="/transactions">Transactions</Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
