/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "../../assets/style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAccount } from "../../redux/actions/AuthAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = (props) => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const auth = useSelector((state) => state.auth);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { firstName, lastName, email, password1, password2 } = state;

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
  });

  useEffect(() => {
    errors.error = "";
  });

  const handleChange = (text) => (e) => {
    setState({ ...state, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      email,
      password1,
      password2,
    };

    dispatch(registerAccount(newUser, props.history));
  };
  return (
    <div
      className="col-5 mx-auto"
      style={{
        background: "white",
        border: "1px solid rgba(0,0,0,0.16)",
      }}
    >
      <ToastContainer />
      <article className="container mx-auto p-4">
        <h4 className="card-title mt-3 text-center">Create Account</h4>
        <p className="text-center">Get started with your free account</p>
        <hr className="mb-4" />

        <form onSubmit={handleSubmit}>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" style={{ padding: "0 15px" }}>
                <i className="fa fa-user"></i>
              </span>
            </div>
            <input
              name="firstName"
              className="form-control mr-2"
              placeholder="First name"
              type="text"
              onChange={handleChange("firstName")}
              value={firstName}
            />
            <input
              name="lastName"
              className="form-control"
              placeholder="Last name"
              type="text"
              onChange={handleChange("lastName")}
              value={lastName}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
            <input
              name="email"
              className="form-control"
              placeholder="Email address"
              type="email"
              onChange={handleChange("email")}
              value={email}
            />
          </div>
          <p style={{ fontSize: 12, marginTop: -15 }}>
            (Register your email to gravatar to have picture)
          </p>

          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" style={{ padding: "0 15px" }}>
                <i className="fa fa-lock"></i>
              </span>
            </div>
            <input
              className="form-control"
              placeholder="Create password"
              type="password"
              name="password1"
              onChange={handleChange("password1")}
              value={password1}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" style={{ padding: "0 15px" }}>
                <i className="fa fa-lock"></i>
              </span>
            </div>
            <input
              className="form-control"
              placeholder="Confirm password"
              type="password"
              name="password2"
              onChange={handleChange("password2")}
              value={password2}
            />
          </div>
          <div className="form-group text-left">
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </div>
          <p className="text-left">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </article>
    </div>
  );
};

export default Register;
