import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const response = await axios.post(url, data);
      const { token } = response.data.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-75 shadow-lg p-3 mb-5 bg-white rounded">
        <div className="col-md-6 p-5">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-4">Login to Your Account</h1>

            <div className="mb-3 position-relative">
              <div className="d-flex align-items-center">
                {data.email && (
                  <i
                    className="pi pi-envelope"
                    style={{ fontSize: '1.5rem', marginRight: '10px' }}
                  ></i>
                )}
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
            </div>

            <div className="mb-3 position-relative">
              <div className="d-flex align-items-center">
                {data.password && (
                  <i
                    className="pi pi-lock"
                    style={{ fontSize: '1.5rem', marginRight: '10px' }}
                  ></i>
                )}
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
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
          </form>
        </div>
        <div
          className="col-md-6 p-5 text-center d-flex flex-column justify-content-center"
          style={{ backgroundColor: '#e0ebeb' }}
        >
          <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className="btn btn-outline-primary mt-3">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
