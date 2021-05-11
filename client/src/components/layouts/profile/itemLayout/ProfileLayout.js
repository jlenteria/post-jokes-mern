import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../item/settingsLayout/Profile";
import {
  getCurrentProfile,
  getUsersProfile,
} from "../../../../redux/actions/ProfileAction";
import { defaultPhoto } from "../../../../assets/default";
import {
  getPosts,
  getUserPostsAction,
} from "../../../../redux/actions/PostAction";

const ProfileLayout = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.posts);
  const profile = useSelector((state) => state.profiles);
  const errors = useSelector((state) => state.errors);
  const { userPosts } = post;
  const { profiles } = profile;
  const _id = props.location.state.user;
  let firstName = "";
  let lastName = "";
  let photo = "";
  let category = "";

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, auth.isAuthenticated]);

  useEffect(() => {
    dispatch(getUserPostsAction(_id));
  }, [dispatch, _id]);

  useEffect(() => {
    if (_id === auth.user.id) {
      dispatch(getCurrentProfile());
    } else {
      dispatch(getUsersProfile(_id));
    }
  }, [dispatch, _id, auth.user.id]);

  useEffect(() => {
    errors.error = "";
  });
  userPosts.forEach((item) => {
    firstName = item.firstname;
    lastName = item.lastname;
    photo = item.photo;
    category = item.category;
  });

  return (
    <div
      className="row d-block profile-layout min-vh-100 "
      style={{
        marginBottom: 100,
      }}
    >
      <div className="col-md-7 mx-auto">
        <div className="profile">
          <div className=" w-100 p-4 profile-header">
            <div>
              <button
                disabled
                className="btn button-transparent"
                style={{ color: "transparent" }}
              >
                Edit Profile
              </button>
            </div>
            <div className="profile-header-center">
              <div>
                <img src={photo !== undefined ? photo : defaultPhoto} alt="" />
              </div>
              {profiles.username ? (
                <h2 className="text-white mt-2">
                  {firstName} {lastName}{" "}
                  <span style={{ fontSize: 25 }}> ({profiles.username})</span>
                </h2>
              ) : (
                <h2 className="text-white mt-2">
                  {firstName} {lastName}
                </h2>
              )}

              <p className="text-white" style={{ marginTop: -5 }}>
                {category !== "" ? category : "Beginner"} Joker
              </p>
            </div>
            <div className="profile-header-button">
              {_id === auth.user.id ? (
                <Link to="/settings">
                  <button className="btn btn-warning">Edit Profile</button>
                </Link>
              ) : null}
            </div>
          </div>
          <div className="text-center profile-header-bottom">
            {profiles.bio ? <p>" {profiles.bio} "</p> : null}
            <div
              className="social-links"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.5)",
                padding: "7px 0px",
              }}
            >
              {profiles.social && profiles.social.facebook ? (
                <a
                  href={profiles.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-facebook-square  fa-2x" />
                </a>
              ) : null}

              {profiles.social && profiles.social.youtube ? (
                <a
                  href={profiles.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-youtube-square  fa-2x" />
                </a>
              ) : null}
              {profiles.social && profiles.social.twitter ? (
                <a
                  href={profiles.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-twitter-square  fa-2x" />
                </a>
              ) : null}
              {profiles.social && profiles.social.linkedin ? (
                <a
                  href={profiles.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-linkedin-square  fa-2x" />
                </a>
              ) : null}
              {profiles.social && profiles.social.instagram ? (
                <a
                  href={profiles.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-instagram  fa-2x" />
                </a>
              ) : null}
              {profiles.website ? (
                <a
                  href={profiles.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-globe  fa-2x" />
                </a>
              ) : null}
              {profiles.github ? (
                <a
                  href={profiles.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-github-square fa-2x" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start">
          <div className="d-block mt-4 left-content">
            <p>
              {" "}
              <i className="fa fa-optin-monster" /> {userPosts.length} jokes
              posted
            </p>
          </div>
          <div className="d-block mt-4 ml-3 w-100">
            <div className="d-flex justify-content-between">
              <p className="mt-3" style={{ fontWeight: "bold", fontSize: 18 }}>
                Jokes
              </p>
              <select
                className="form-control"
                style={{ width: "20%", cursor: "pointer" }}
              >
                <option value="date">date</option>
                <option value="likes">#likes</option>
              </select>
            </div>

            <div>
              <Profile postData={userPosts} userId={_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
