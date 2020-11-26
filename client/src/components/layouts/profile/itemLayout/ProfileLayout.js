import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../item/settingsLayout/Profile';
import { getCurrentProfile } from '../../../../redux/actions/ProfileAction';

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const post = useSelector(state => state.posts);
  const profile = useSelector(state => state.profiles);
  const errors = useSelector(state => state.errors);
  const { authPosts } = post;
  const { profiles } = profile;

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    errors.error = '';
  });

  return (
    <div
      className="profile-layout min-vh-100 "
      style={{
        padding: '0px 200px',
        display: 'block',
        marginBottom: 100,
      }}
    >
      <div className="profile">
        <div className=" w-100 p-4 profile-header">
          <div>
            <button
              disabled
              className="btn button-transparent"
              style={{ color: 'transparent' }}
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
            {profiles.username ? (
              <h2 className="text-info mt-2">
                {auth.user.firstName} {auth.user.lastName}{' '}
                <span style={{ fontSize: 25 }}> ({profiles.username})</span>
              </h2>
            ) : (
              <h2 className="text-info mt-2">
                {auth.user.firstName} {auth.user.lastName}
              </h2>
            )}

            <p className="text-muted" style={{ marginTop: -5 }}>
              Joker
            </p>
          </div>
          <div className="profile-header-button">
            <Link to="/settings">
              <button className="btn btn-warning">Edit Profile</button>
            </Link>
          </div>
        </div>
        <div className="text-center profile-header-bottom">
          {profiles.bio ? <p>" {profiles.bio} "</p> : null}
          <div
            className="social-links"
            style={{
              borderTop: '1px solid rgba(0,0,0,0.07)',
              padding: '7px 0px',
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
            {' '}
            <i className="fa fa-optin-monster" /> {authPosts.length} jokes
            posted
          </p>
          <p>
            {' '}
            <i className="fa fa-comment" /> 1 comments written
          </p>
        </div>
        <div className="d-block mt-4 ml-3 w-100">
          {authPosts.length > 0 ? (
            <div className="d-flex justify-content-between">
              <p className="mt-3" style={{ fontWeight: 'bold', fontSize: 18 }}>
                Jokes
              </p>
              <select
                className="form-control"
                style={{ width: '20%', cursor: 'pointer' }}
              >
                <option value="date">date</option>
                <option value="likes">#likes</option>
              </select>
            </div>
          ) : null}

          <div>
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
