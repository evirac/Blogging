import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown, Search, User } from "lucide-react";
import { fetchUser } from "../redux/AuthSlice";
import "../sass/Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUser());
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <header className="header">
      <div className="menu-container">
        <div className="dropdown">
          <button className="dropdown-button" disabled>
            <span>Afterglow</span>
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="dropdown">
          <span className="dropdown-label">Scenario</span>
          <button className="dropdown-button">
            <span>Default</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="right-container">
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <Search className="search-icon" size={18} />
        </div>

        <div className="profile-container">
          <div className="profile-image">
            <User size={24} />
          </div>
          <div className="profile-info">
            <p className="profile-name">{user?.name || "User"}</p>
            <p className="profile-title">{user?.designation || "Role"}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
