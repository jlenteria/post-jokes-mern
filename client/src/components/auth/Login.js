/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount } from "../../redux/actions/AuthAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const [state, setState] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const { loginEmail, loginPassword } = state;

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

    const login = {
      loginEmail,
      loginPassword,
    };

    dispatch(loginAccount(login));
  };

  return (
    <div
      className="col-md-4 mx-auto"
      style={{
        background: "white",
        border: "1px solid rgba(0,0,0,0.16)",
      }}
    >
      <ToastContainer />
      <article className="container mx-auto p-4">
        <h4 className="card-title mt-3 text-center">Login Account</h4>
        <p className="text-center">Post a joke in your account</p>
        <hr className="mb-4" />
        <form onSubmit={handleSubmit}>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
            <input
              name="loginEmail"
              className="form-control"
              placeholder="Email address"
              type="email"
              onChange={handleChange("loginEmail")}
              value={loginEmail}
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
              placeholder="Login password"
              type="password"
              name="loginPassword"
              onChange={handleChange("loginPassword")}
              value={loginPassword}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
          <p className="text-left">
            No account yet? <Link to="/register">Register</Link>
          </p>
        </form>
      </article>
    </div>
  );
};

export default Login;
