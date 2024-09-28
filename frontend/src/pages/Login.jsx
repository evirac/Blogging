import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import "../sass/AuthForm.scss";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <ButtonComponent type="submit" disabled={loading} inverted>
            Login
          </ButtonComponent>
          {error && <p className="error-message">{error}</p>}
        </form>
        <Link to="/register" className="auth-link">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
