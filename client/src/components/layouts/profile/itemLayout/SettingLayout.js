import React, { useEffect } from 'react';
import ProfileSetting from '../item/settingsLayout/ProfileSetting';
import { useDispatch, useSelector } from 'react-redux';
import {
  showProfileAction,
  showEducationAction,
  showExperienceAction,
  deleteAccountAction,
  getCurrentProfile,
} from '../../../../redux/actions/ProfileAction';
import Experience from '../item/settingsLayout/Experience';
import Education from '../item/settingsLayout/Education';
import { Alert } from 'react-bootstrap';

const SettingLayout = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profiles);
  const auth = useSelector(state => state.auth);
  const { showProfile, showEducation, showExperience, profiles } = profile;

  const profileClick = () => {
    dispatch(showProfileAction());
  };

  const educationClick = () => {
    if (profiles.length === 0) {
      alert('Please Create Profile First');
    } else {
      dispatch(showEducationAction());
    }
  };
  const experienceClick = () => {
    if (profiles.length === 0) {
      alert('Please Create Profile First');
    } else {
      dispatch(showExperienceAction());
    }
  };

  const deleteAccount = () => {
    dispatch(deleteAccountAction());
  };
  return (
    <div
      className="setting-layout min-vh-100 "
      style={{
        padding: '0px 230px',
        display: 'block',
      }}
    >
      <div className="w-100 p-3 d-block">
        <div className="d-flex justify-content-between">
          {profiles.username ? (
            <h2>
              Settings for{' '}
              <span className="text-info">{profiles.username}</span>
            </h2>
          ) : (
            <h2>
              Settings for{' '}
              <span className="text-info">
                {auth.user.firstName} {auth.user.lastName}
              </span>
            </h2>
          )}
          <button className="btn btn-danger" onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
        <div className="d-inline-flex justify-content-between mt-2 w-100">
          <div className="d-block left-setting">
            <button
              onClick={profileClick}
              style={{
                background: showProfile ? 'white' : 'transparent',
                fontWeight: showProfile ? '500' : '400',
              }}
            >
              Profile
            </button>
            <button
              onClick={educationClick}
              style={{
                background: showEducation ? 'white' : 'transparent',
                fontWeight: showEducation ? '500' : '400',
              }}
            >
              Education
            </button>
            <button
              onClick={experienceClick}
              style={{
                background: showExperience ? 'white' : 'transparent',
                fontWeight: showExperience ? '500' : '400',
              }}
            >
              Experience
            </button>
          </div>
          {showProfile ? <ProfileSetting /> : null}
          {showEducation ? <Education /> : null}
          {showExperience ? <Experience /> : null}
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
