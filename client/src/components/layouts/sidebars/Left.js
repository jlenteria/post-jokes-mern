import React, { useEffect } from 'react';
import '../../../assets/style.css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/ProfileAction';

const Left = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const profile = useSelector(state => state.profiles);
  const history = useHistory();
  const { profiles } = profile;

  const profileClick = () => {
    history.push('/profile-me');
  };

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return (
    <div className="left-sidebar">
      {auth.isAuthenticated ? (
        <div className="side-profile-menu" onClick={profileClick}>
          <img
            src="https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png"
            alt=""
            style={{ width: 55, height: 55 }}
          />
          <div style={{ display: 'block' }} className="ml-2 ">
            <span
              className="text-primary"
              style={{ fontWeight: 700, wordBreak: 'break-word' }}
            >
              {profiles.username ? (
                <span>
                  {auth.user.firstName} {auth.user.lastName}
                  <span style={{ fontSize: '13px' }}>
                    ({profiles.username})
                  </span>
                </span>
              ) : (
                <span>
                  {auth.user.firstName} {auth.user.lastName}
                </span>
              )}
            </span>
            <div>
              <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)' }}>
                Joker
              </span>
            </div>
          </div>
        </div>
      ) : (
        <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
          <p>
            <strong>Sign In / Sign Up</strong>
          </p>
        </Link>
      )}

      <p>About Us</p>
      <p>Contact Us</p>
      <div className="text-center" style={{ display: 'flex' }}>
        <a href="https://www.facebook.com/jlenteria98" target="_blank">
          <i className="fa fa-facebook mr-3" />
        </a>
        <a href="https://www.github.com/jlenteria98" target="_blank">
          <i className="fa fa-github mr-3" />
        </a>
        <a href="https://www.twitter.com/jlenteria98" target="_blank">
          <i className="fa fa-twitter mr-3" />
        </a>
        <a href="https://www.instagram.com/jlenteria98" target="_blank">
          <i className="fa fa-instagram mr-3" />
        </a>
      </div>
    </div>
  );
};

export default Left;
