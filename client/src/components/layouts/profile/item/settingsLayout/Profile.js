/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAddFormControl,
  deletePost,
  getAuthPosts,
  getPosts,
  showAddFormControl,
  showEditFormControl,
  unVotePost,
  votePost,
} from "../../../../../redux/actions/PostAction";
import Moment from "react-moment";
import PostModal from "../modals/PostModal";
import { defaultPhoto } from "../../../../../assets/default";

const Profile = ({ postData, userId }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts);
  const auth = useSelector((state) => state.auth);

  const [state, setState] = useState({
    showEdit: false,
    _id: "",
    _text: "",
  });

  const { showEdit, _id, _text } = state;

  const { showEditForm, showAddForm } = post;

  const showEditModal = (id) => {
    setState({ showEdit: !showEdit, _id: id });
  };

  const deleteClick = (id) => {
    setState({ showEdit: false });
    dispatch(deletePost(id, userId));
  };

  const showFormClick = (id, text) => {
    setState({ _id: id, _text: text });
    dispatch(showEditFormControl());
  };

  const closeFormClick = () => {
    setState({ _id: "", _text: "" });
    dispatch(closeAddFormControl());
  };

  const voteClick = (id) => {
    dispatch(votePost(id, userId));
  };
  const unVoteClick = (id) => {
    dispatch(unVotePost(id, userId));
  };

  const postHandleClick = () => {
    dispatch(showAddFormControl());
  };

  const findUserLike = (likes) => {
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      {auth.user.id === userId ? (
        <div className="d-flex align-items-center post">
          <span>
            <img src={defaultPhoto} alt="profile" />
          </span>
          <button className="post-btn" onClick={postHandleClick}>
            Do you have a joke {auth.user.firstName} ?
          </button>
        </div>
      ) : null}
      {postData.length > 0 ? (
        <div>
          {postData.map((item, index) => (
            <div className="post" key={index}>
              {item.text !== "" ? (
                <div>
                  <div
                    className="post-head"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex" }}>
                      <div>
                        <img
                          src={
                            item.photo !== undefined ? item.photo : defaultPhoto
                          }
                          alt=""
                        />
                      </div>
                      <div style={{ display: "block", marginLeft: 8 }}>
                        <p
                          style={{
                            fontSize: 20,
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                        >
                          {item.firstName} {item.lastName}
                        </p>
                        <p
                          className="text-muted"
                          style={{ fontSize: 12, marginTop: -18 }}
                        >
                          <Moment format="MMM D YYYY" withTitle>
                            {item.date}
                          </Moment>{" "}
                          (<Moment fromNow>{item.date}</Moment>)
                        </p>
                      </div>
                    </div>
                    {item.user === auth.user.id ? (
                      <div>
                        <i
                          onClick={() => showEditModal(item._id)}
                          className="fa fa-ellipsis-v "
                          aria-hidden="true"
                          style={{
                            fontSize: 20,
                            color: "rgba(0,0,0,0.6)",
                            cursor: "pointer",
                            padding: "0 5px",
                          }}
                        />
                        {showEdit && item._id === _id ? (
                          <div className="ellipsis-menu">
                            <a
                              className="dropdown-item"
                              onClick={() => showFormClick(item._id, item.text)}
                              style={{
                                borderBottom: "1px solid rgba(0,0,0,0.13)",
                                cursor: "pointer",
                              }}
                            >
                              Edit
                            </a>
                            <a
                              className="dropdown-item"
                              onClick={() => deleteClick(item._id)}
                              style={{ cursor: "pointer" }}
                            >
                              Delete
                            </a>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div className="post-content text-center mt-3">
                    <div className="mx-auto pb-2 pt-2" style={{ width: "80%" }}>
                      <h4 style={{ fontWeight: 600 }}>{item.text}</h4>
                    </div>
                    <hr />
                    <div style={{ display: "flex" }}>
                      <button
                        type="button"
                        onClick={() => voteClick(item._id)}
                        style={{ outline: "none" }}
                      >
                        <i
                          className="fa fa-thumbs-up"
                          aria-hidden="true"
                          style={{
                            color: findUserLike(item.vote) ? "blue" : "black",
                          }}
                        />
                        <span style={{ fontSize: 14, marginLeft: 2 }}>
                          {item.vote.length}
                        </span>
                      </button>
                      <button
                        type="button"
                        className="ml-1"
                        onClick={() => unVoteClick(item._id)}
                        style={{ outline: "none" }}
                      >
                        <i
                          className="fa fa-thumbs-o-down"
                          aria-hidden="true"
                        ></i>
                      </button>
                      <button
                        type="button"
                        className="ml-1"
                        style={{ outline: "none" }}
                      >
                        <i
                          className="fa fa-commenting-o"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between">
                  No Jokes Posted Yet
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="d-flex justify-content-between"
          style={{
            background: "white",
            border: "1px solid rgba(0,0,0,0.3)",
            borderRadius: "5px",
            padding: 20,
          }}
        >
          No Jokes Posted Yet
        </div>
      )}

      {showEditForm ? (
        <PostModal
          id={_id}
          edit_text={_text}
          handleClose={closeFormClick}
          userId={userId}
        />
      ) : null}
      {showAddForm ? (
        <PostModal id="" edit_text="" handleClose={closeFormClick} />
      ) : null}
    </div>
  );
};

export default Profile;
