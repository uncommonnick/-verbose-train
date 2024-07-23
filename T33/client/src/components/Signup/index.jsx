import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS dla spójności stylów
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-75 shadow-lg p-3 mb-5 bg-white rounded">
        <div className="col-md-6 p-5 text-center d-flex flex-column justify-content-center" style={{ backgroundColor: '#e0ebeb' }}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="btn btn-outline-primary mt-3">
              Sign in
            </button>
          </Link>
        </div>
        <div className="col-md-6 p-5">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-4">Create Account</h1>
            <div className="mb-3">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className="form-control"
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
