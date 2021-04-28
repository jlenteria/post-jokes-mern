import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileByIdAction } from "../../../../redux/actions/ProfileAction";

import UserPosts from "../item/post/UserPosts";

const ProfileLayout_2 = (props) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts);
  const profile = useSelector((state) => state.profiles);
  const { userPosts } = post;
  const { profileById } = profile;

  const _id = props.location.state.user;
  const _firstname = props.location.state.firstname;
  const _lastname = props.location.state.lastname;

  useEffect(() => {
    dispatch(getProfileByIdAction(_id));
  }, [_id, dispatch]);

  return (
    <div
      className="profile-layout min-vh-100 "
      style={{
        padding: "0px 250px",
        display: "block",
        marginBottom: 100,
      }}
    >
      <div className="profile">
        {profileById !== null ? (
          <div>
            <div className=" w-100 p-4 profile-header">
              <div>
                <button disabled className="btn button-transparent"></button>
              </div>
              <div className="profile-header-center">
                <div>
                  <img
                    src="https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png"
                    alt=""
                  />
                </div>
                <h2 className="mt-2">
                  {profileById.firstname} {profileById.lastname}{" "}
                  <span style={{ fontSize: 25 }}>({profileById.username})</span>
                </h2>

                <p className="text-white" style={{ marginTop: -5 }}>
                  Joker
                </p>
              </div>
              <div className="profile-header-button">
                <button
                  disabled
                  className="btn button-transparent"
                  style={{ color: "transparent" }}
                ></button>
              </div>
            </div>
            <div className="text-center profile-header-bottom">
              {profileById.bio ? <p>" {profileById.bio} "</p> : null}
              <div
                className="social-links"
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.07)",
                  padding: "7px 0px",
                }}
              >
                {profileById.social && profileById.social.facebook ? (
                  <a
                    href={profileById.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-facebook-square  fa-2x" />
                  </a>
                ) : null}

                {profileById.social && profileById.social.youtube ? (
                  <a
                    href={profileById.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-youtube-square  fa-2x" />
                  </a>
                ) : null}
                {profileById.social && profileById.social.twitter ? (
                  <a
                    href={profileById.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-twitter-square  fa-2x" />
                  </a>
                ) : null}
                {profileById.social && profileById.social.linkedin ? (
                  <a
                    href={profileById.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-linkedin-square  fa-2x" />
                  </a>
                ) : null}
                {profileById.social && profileById.social.instagram ? (
                  <a
                    href={profileById.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-instagram  fa-2x" />
                  </a>
                ) : null}
                {profileById.website ? (
                  <a
                    href={profileById.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-globe  fa-2x" />
                  </a>
                ) : null}
                {profileById.github ? (
                  <a
                    href={profileById.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-github-square fa-2x" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
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
                <img
                  src="https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png"
                  alt=""
                />
              </div>
              <h2 className="text-info mt-2">
                {_firstname} {_lastname}
              </h2>

              <p className="text-muted" style={{ marginTop: -5 }}>
                Joker
              </p>
            </div>
            <div className="profile-header-button">
              <button
                disabled
                className="btn button-transparent"
                style={{ color: "transparent" }}
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-start">
        <div className="d-block mt-4 left-content">
          <p>
            {" "}
            <i className="fa fa-optin-monster" /> {userPosts.length} jokes
            posted
          </p>
          <p>
            {" "}
            <i className="fa fa-comment" /> 1 comments written
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
            <UserPosts userId={_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout_2;
