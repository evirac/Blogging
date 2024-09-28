import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent"; // Adjust the import path as needed
import "../sass/AuthForm.scss";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const { name, designation, email, password } = form;
    dispatch(register({ name, designation, email, password }));
  };

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            onChange={handleChange}
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
          <ButtonComponent type="submit" disabled={loading} inverted>
            Register
          </ButtonComponent>
          {error && <p className="error-message">{error}</p>}
        </form>
        <Link to="/login" className="auth-link">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
