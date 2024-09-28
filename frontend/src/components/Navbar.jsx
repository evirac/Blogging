import React from "react";
import { logout } from "../redux/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../sass/Navbar.scss";
import logo from "../assets/Logo.svg";
import { GoHome } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import { BsFileBarGraph } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { GoGear } from "react-icons/go";
import { IoMdExit } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // If you're using react-router

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Redirect to login page after logout (if using react-router)
  };

  return (
    <div>
      <div className="navbar">
        <ul className="navbar-nav">
          <img src={logo} alt="Jadwa Logo" className="logo h-8 w-8" />

          <li className="nav-item">
            <a href="#" className="nav-link">
              <GoHome /> <span className="link-text"> Dashboard </span>
            </a>
          </li>
          <li className="nav-item active">
            <a href="#" className="nav-link">
              <CgNotes /> <span className="link-text"> Blogs </span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <BsFileBarGraph /> <span className="link-text"> Finances </span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <VscGraphLine /> <span className="link-text"> Pitches </span>
            </a>
          </li>
          <div className="bottom">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <GoGear /> <span className="link-text"> Settings </span>
              </a>
            </li>

            <li className="nav-item">
              <a href="#" onClick={handleLogout} className="nav-link">
                <IoMdExit /> <span className="link-text"> Logout </span>
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
