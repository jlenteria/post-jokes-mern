import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Right = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="right-sidebar">
      {!auth.isAuthenticated ? (
        <div className="content-1">
          JLikes is a community of persons that has sense of humor.
          <Link to="/register">
            <button type="button" className="btn btn-primary">
              Create New Account
            </button>
          </Link>
          <Link to="/login">
            <button type="button" className="btn btn-outline-success">
              Login
            </button>
          </Link>
        </div>
      ) : null}

      <div className="content-2">
        <p style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}>
          <strong>Memes</strong>
        </p>
        <p className="mt-2 text-break"></p>
      </div>
      <div className="content-2">
        <p style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}>
          <strong>Famous Filipino Comedians</strong>
        </p>
        <p className="mt-2 text-break"></p>
      </div>
    </div>
  );
};

export default Right;
