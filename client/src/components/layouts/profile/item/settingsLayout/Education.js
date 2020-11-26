import React from 'react';
import EducationModal from '../modals/EducationModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentProfile,
  showEducationModal,
  deleteEducationAction,
} from '../../../../../redux/actions/ProfileAction';

const Education = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profiles);
  const { educationModal, profiles } = profile;

  const showClick = () => {
    dispatch(showEducationModal());
  };
  const handleClose = () => {
    dispatch(getCurrentProfile());
  };

  const deleteClick = id => {
    dispatch(deleteEducationAction(id));
  };

  return (
    <div className="w-100 d-block">
      <form className="mt-4">
        <div className="d-block bg-white p-4 mb-4 user">
          <div
            className="d-flex justify-content-between align-items-center pb-2 "
            style={{ borderBottom: '1px solid rgba(0,0,0,0.3)' }}
          >
            <h5 style={{ fontWeight: 'bold' }}>Schools</h5>
            <button
              type="button"
              className="btn-outline-primary"
              style={{ outline: 'none' }}
              onClick={showClick}
            >
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="mt-4 d-flex justify-content-around flex-wrap">
            {profiles.education.map((item, index) => (
              <div
                key={index}
                className="p-3 badge-light d-block mb-4"
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
                  {item.school}
                </p>

                <p style={{ fontSize: 14 }}>
                  <i className="fa fa-map-marker" style={{ fontSize: 20 }} />{' '}
                  <strong>Location: </strong>
                  {item.location}
                </p>
                <p style={{ fontSize: 14 }}>
                  <i className="fa fa-graduation-cap " />{' '}
                  <strong>Degree: </strong> {item.degree}
                </p>
                <p style={{ fontSize: 14 }}>
                  <i className=" fa fa-industry " />{' '}
                  <strong>Field of Study: </strong>
                  {item.fieldofstudy}
                </p>
                <p style={{ fontSize: 14 }}>
                  <i className="fa fa-calendar-times-o " />{' '}
                  <strong>From: </strong>
                  {item.from}
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
      {educationModal ? <EducationModal handleClose={handleClose} /> : null}
    </div>
  );
};

export default Education;
