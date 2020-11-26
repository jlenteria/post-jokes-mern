import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { addExperienceAction } from '../../../../../redux/actions/ProfileAction';

const ExperienceModal = ({ handleClose }) => {
  const [state, setState] = useState({
    title: '',
    location: '',
    company: '',
    from: '',
    to: '',
    current: false,
    description: '',
    disabled: false,
  });

  const {
    title,
    location,
    company,
    from,
    to,
    current,
    description,
    disabled,
  } = state;

  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);
  const { error } = errors;
  const post = useSelector(state => state.posts);
  const { showEditForm } = post;

  useEffect(() => {
    errors.error = '';
  });

  const handleChange = text => e => {
    setState({ ...state, [text]: e.target.value });
  };

  const onCheck = e => {
    setState({
      ...state,
      disabled: !disabled,
      current: !current,
      to: '',
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newExp = {
      title,
      location,
      company,
      from,
      to,
      current,
      description,
    };

    dispatch(addExperienceAction(newExp));
  };

  return (
    <Modal
      show={true}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Experience</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <label>Company</label>
            <input
              className="form-control"
              type="text"
              name="company"
              value={company}
              onChange={handleChange('company')}
            />
            {error.company ? (
              <p className="alert alert-danger mt-2">{error.company}</p>
            ) : null}
          </div>
          <div className="form-group">
            <label>Job Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              value={title}
              onChange={handleChange('title')}
            />
            {error.title ? (
              <p className="alert alert-danger mt-2">{error.title}</p>
            ) : null}
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              className="form-control"
              type="text"
              name="location"
              value={location}
              onChange={handleChange('location')}
            />
            {error.location ? (
              <p className="alert alert-danger mt-2">{error.location}</p>
            ) : null}
          </div>

          <div className="d-flex">
            <div className="form-group w-50 mr-3">
              <label>From</label>
              <input
                className="form-control"
                type="date"
                value={from}
                name="from"
                min="1980-01-01"
                max="2020-01-01"
                onChange={handleChange('from')}
              />
              {error.from ? (
                <p className="alert alert-danger mt-2">{error.from}</p>
              ) : null}
            </div>
            <div className="form-group w-50">
              <div className="d-flex justify-content-between">
                <label>To</label>
                <div className="d-flex">
                  <input
                    style={{
                      border: '1px solid black',
                      marginTop: 5,
                    }}
                    name="current"
                    type="checkbox"
                    value={current}
                    onChange={onCheck}
                  />
                  <label className="ml-1">Current</label>
                </div>
              </div>
              <input
                disabled={disabled}
                className="form-control"
                type="date"
                value={to}
                name="to"
                min="1980-01-01"
                max="2020-01-01"
                onChange={handleChange('to')}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="5"
              cols="5"
              className="form-control"
              type="text"
              name="description"
              value={description}
              onChange={handleChange('description')}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {showEditForm ? (
            <Button variant="primary" type="submit">
              Update
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Post
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ExperienceModal;
