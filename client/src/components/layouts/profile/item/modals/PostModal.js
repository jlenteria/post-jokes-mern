/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, editPost } from '../../../../../redux/actions/PostAction';

const PostModal = ({ handleClose, id, edit_text }) => {
  const [state, setState] = useState({
    text: '',
    formHeader: 'Add Joke',
  });

  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);
  const auth = useSelector(state => state.auth);
  const post = useSelector(state => state.posts);
  const { showEditForm } = post;
  const { text, formHeader } = state;

  useEffect(() => {
    errors.error = '';
  });

  useEffect(() => {
    if (showEditForm) {
      setState({ text: edit_text, formHeader: 'Edit Joke' });
    }
  }, [edit_text, showEditForm]);

  const handleChange = e => {
    setState({ ...state, text: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newPost = {
      text,
      photo: auth.user.photo,
    };
    if (showEditForm) {
      dispatch(editPost(id, newPost));
    } else {
      dispatch(addPost(newPost));
    }
  };

  return (
    <Modal
      show={true}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      <Modal.Header closeButton style={{ background: 'rgba(163, 228, 215)' }}>
        <Modal.Title>{formHeader}</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <textarea
              rows="6"
              cols="3"
              className="form-control"
              placeholder={`Do you have something else, ${auth.user.firstName} ?`}
              name="text"
              onChange={handleChange}
              value={text}
            />
            {errors.error !== '' ? (
              <p className="alert alert-danger mt-2">{errors.error}</p>
            ) : null}
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

export default PostModal;
