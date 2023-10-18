import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/_Navbar.style.scss";

const Navbar = () => {
  return (
    <div className="sidebar w-1/6 h-screen">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/create" className="cart">
            Create
          </Link>
        </li>
        <li>
          <Link to="/products">Permissions</Link>
        </li>
        <li>
          <Link to="/about">Users</Link>
        </li>
        <li>
          <Link to="/about">Github</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
