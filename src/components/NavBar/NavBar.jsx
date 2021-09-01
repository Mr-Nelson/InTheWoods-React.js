import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav  ">
            <li className="nav-item">
              
                <Link to="/home" className="nav-link active">
                  Home
                </Link>
            </li>

            <li className="nav-item">
              <Link to="/document" className="nav-link active">
                Documents
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/department" className="nav-link active">
                Departments
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/login" className="nav-link active">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/profile" className="nav-link active">
                Profile
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/register" className="nav-link active">
                Register
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/event" className="nav-link active">
                Add Event
              </Link>
              </li>

              <li className="nav-item">
              <Link to="/calendar" className="nav-link active">
                Calendar
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/map" className="nav-link active">
                Map of Events
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/logout" className="nav-link active">
                Logout
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;