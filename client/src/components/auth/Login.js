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
      className="card mx-auto"
      style={{
        background: "white",
        width: "50%",
        border: "1px solid rgba(0,0,0,0.16)",
      }}
    >
      <ToastContainer />
      <article className="card-body mx-auto" style={{ width: "80%" }}>
        <h4 className="card-title mt-3 text-center">Login Account</h4>
        <p className="text-center">Post a joke in your account</p>
        <p className="text-center">
          <a href="" className="btn btn-danger  w-100 btn-twitter">
            <i className="fa fa-google"></i>   Login via Google
          </a>
          <a href="" className="btn btn-primary w-100 mt-2 btn-facebook ">
            <i className="fa fa-facebook-f"></i>   Login via facebook
          </a>
        </p>
        <p className="divider-text">
          <span className="bg-light">OR</span>
        </p>
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
            <button type="submit" className="btn btn-success btn-block">
              Login
            </button>
          </div>
          <p className="text-center">
            No account yet? <Link to="/register">Register</Link>
          </p>
        </form>
      </article>
    </div>
  );
};

export default Login;
