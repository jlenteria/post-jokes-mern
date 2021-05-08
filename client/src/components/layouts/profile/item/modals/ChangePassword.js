import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { updatePassword } from "../../../../../redux/actions/AuthAction";

const ChangePassword = ({ handleClose }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    error: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.oldPassword !== "" && state.newPassword !== "") {
      const data = {
        oldPassword: state.oldPassword,
        newPassword: state.newPassword,
      };

      dispatch(updatePassword(data, setState, state));
    } else {
      setState({ ...state, error: "Please fill out all fields" });
    }
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value, error: "" });
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
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <label>Input Old Password</label>
            <input
              className="form-control"
              type="password"
              value={state.oldPassword}
              name="oldPassword"
              onChange={handleChange}
            />
            <label>New Password</label>
            <input
              className="form-control"
              type="password"
              value={state.newPassword}
              name="newPassword"
              onChange={handleChange}
            />
            {state.error !== "" ? (
              <p className="alert alert-danger mt-3">{state.error}</p>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ChangePassword;
