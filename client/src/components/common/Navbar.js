/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/AuthAction";
import {
  closeAddFormControl,
  showAddFormControl,
} from "../../redux/actions/PostAction";

import { ToastContainer } from "react-toastify";
import PostModal from "../layouts/profile/item/modals/PostModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({ showMenu: false });
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.posts);
  const profile = useSelector((state) => state.profiles);

  const { profiles } = profile;
  const { showMenu } = state;

  const handleClick = () => {
    setState({ showMenu: !showMenu });
  };

  const logoutClick = () => {
    dispatch(logoutUser());
  };

  const showFormClick = () => {
    dispatch(showAddFormControl());
  };
  const closeFormClick = () => {
    dispatch(closeAddFormControl());
  };

  const userClick = () => {
    const user = auth.user.id;
    history.push({
      pathname: "/profile-me",
      state: { user },
    });
  };

  return (
    <nav
      className="row navbar navbar-expand-lg navbar-light bg-light border-bottom"
      style={{ padding: "25px 0px 10px 0px" }}
    >
      <div className="col-md-7 mx-auto d-flex justify-content-lg-between">
        <ToastContainer />
        <Link to="/">
          <span className="navbar-brand">
            <strong>JLikes</strong>
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="mr-auto w-25">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
          {auth.isAuthenticated ? (
            <div style={{ display: "flex  " }}>
              <button
                className="btn btn-outline-dark my-2 my-sm-0 mr-5"
                type="button"
                onClick={showFormClick}
              >
                Write a Joke
              </button>
              <div className="profile-menu" onClick={handleClick}>
                <img
                  src="https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png"
                  alt=""
                />
                {showMenu ? (
                  <div className="menu-item">
                    <button
                      className="btn btn-light dropdown-item"
                      onClick={userClick}
                      style={{ fontWeight: "600" }}
                    >
                      {profiles.username ? (
                        <span>{profiles.username}</span>
                      ) : (
                        <span> {auth.user.firstName}</span>
                      )}
                    </button>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/settings">
                      Settings
                    </Link>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      onClick={logoutClick}
                      style={{ fontWeight: 500, cursor: "pointer" }}
                    >
                      <i className="fa fa-sign-out" />
                      Logout
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="form-inline my-2 my-lg-0">
              <Link to="/login">
                <button
                  className="btn btn-outline-success my-2 my-sm-0 mr-2"
                  type="button"
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn btn-primary my-2 my-sm-0" type="button">
                  Create account
                </button>
              </Link>
            </div>
          )}
        </div>
        {post.showAddForm ? <PostModal handleClose={closeFormClick} /> : null}
      </div>
    </nav>
  );
};

export default Navbar;
