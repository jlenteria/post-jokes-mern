import React, { useState } from 'react';
import ExperienceModal from '../modals/ExperienceModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentProfile,
  showExperienceModal,
  deleteExperienceAction,
} from '../../../../../redux/actions/ProfileAction';

const Experience = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profiles);
  const { experienceModal, profiles } = profile;

  const showClick = () => {
    dispatch(showExperienceModal());
  };
  const handleClose = () => {
    dispatch(getCurrentProfile());
  };

  const deleteClick = id => {
    dispatch(deleteExperienceAction(id));
  };

  return (
    <div className="w-100 d-block">
      <form className="mt-4">
        <div className="d-block bg-white p-4 mb-4 user">
          <div
            className="d-flex justify-content-between align-items-center pb-2 "
            style={{ borderBottom: '1px solid rgba(0,0,0,0.3)' }}
          >
            <h5 style={{ fontWeight: 'bold' }}>Experience</h5>
            <button
              className="btn-outline-primary"
              type="button"
              style={{ outline: 'none' }}
              onClick={showClick}
            >
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="mt-4 d-flex justify-content-around flex-wrap">
            {profiles.experience.map((item, index) => (
              <div
                key={index}
                className="p-3 badge-light d-block mb-4 "
                style={{
                  border: '1px solid rgba(255,255,255,0.5)',
                  width: '45%',
                }}
              >
                <p
                  className="text-center"
                  style={{
                    borderBottom: '1px solid rgba(0,0,0,0.3)',
                    marginBottom: 20,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}
                >
                  {item.company}
                </p>
                <p style={{ fontSize: 14 }}>
                  <i className="fa fa-map-marker" style={{ fontSize: 20 }} />{' '}
                  <strong>Location: </strong> {item.location}
                </p>
                <p style={{ fontSize: 14 }}>
                  <i className="fa fa-user " style={{ fontSize: 20 }} />{' '}
                  <strong>Job Title: </strong> {item.title}
                </p>
                <p style={{ fontSize: 14 }}>
                  <i className="fa fa-calendar-times-o " />{' '}
                  <strong>From: </strong> {item.from}
                </p>
                <p style={{ fontSize: 14 }}>
                  <i className=" fa fa-calendar-times-o " />{' '}
                  <strong>To: </strong>{' '}
                  {item.current ? 'Until now' : <span>{item.to}</span>}
                </p>
                <p
                  className="text-center"
                  style={{
                    padding: '10px',
                    fontStyle: 'italic',
                    wordBreak: 'break-word',
                  }}
                >
                  {item.description}
                </p>
                <button
                  className="btn btn-danger w-100 mt-3 "
                  type="button"
                  onClick={() => deleteClick(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
      {experienceModal ? <ExperienceModal handleClose={handleClose} /> : null}
    </div>
  );
};

export default Experience;
