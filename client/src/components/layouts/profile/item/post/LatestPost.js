/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeAddFormControl,
  deletePost,
  getLatestPost,
  showEditFormControl,
  unVotePost,
  votePost,
} from '../../../../../redux/actions/PostAction';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import PostModal from '../modals/PostModal';

export const LatestPost = () => {
  const [state, setState] = useState({
    showEdit: false,
    _id: '',
    _text: '',
  });

  const { showEdit, _id, _text } = state;
  const history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector(state => state.posts);
  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);
  const { latestPosts, showEditForm } = post;

  useEffect(() => {
    dispatch(getLatestPost());
  }, [dispatch]);

  useEffect(() => {
    errors.error = '';
  });

  const showEditModal = id => {
    setState({ showEdit: !showEdit, _id: id });
  };

  const deleteClick = id => {
    setState({ showEdit: false });
    dispatch(deletePost(id));
  };

  const showFormClick = (id, text) => {
    setState({ _id: id, _text: text });
    dispatch(showEditFormControl());
  };

  const closeFormClick = () => {
    setState({ _id: '', _text: '' });
    dispatch(closeAddFormControl());
  };

  const voteClick = id => {
    if (!auth.isAuthenticated) {
      history.push('/login');
    } else {
      dispatch(votePost(id, 3));
    }
  };
  const unVoteClick = id => {
    if (!auth.isAuthenticated) {
      history.push('/login');
    } else {
      dispatch(unVotePost(id, 3));
    }
  };

  const findUserLike = likes => {
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {latestPosts.length > 0 ? (
        <div>
          {latestPosts.map((item, index) => (
            <div className="post" key={index}>
              <div
                className="post-head"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={item.photo} alt="" />
                  </div>
                  <div style={{ display: 'block', marginLeft: 8 }}>
                    <p
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        cursor: 'pointer',
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
                      </Moment>{' '}
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
                        color: 'rgba(0,0,0,0.6)',
                        cursor: 'pointer',
                        padding: '0 5px',
                      }}
                    />
                    {showEdit && item._id === _id ? (
                      <div className="ellipsis-menu">
                        <a
                          className="dropdown-item"
                          onClick={() => showFormClick(item._id, item.text)}
                          style={{
                            borderBottom: '1px solid rgba(0,0,0,0.13)',
                            cursor: 'pointer',
                          }}
                        >
                          Edit
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => deleteClick(item._id)}
                          style={{ cursor: 'pointer' }}
                        >
                          Delete
                        </a>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="post-content text-center mt-3">
                <div className="mx-auto pb-2 pt-2" style={{ width: '70%' }}>
                  <h4 style={{ fontWeight: 600 }}>{item.text}</h4>
                </div>
                <hr />
                <div style={{ display: 'flex' }}>
                  <button
                    type="button"
                    onClick={() => voteClick(item._id)}
                    style={{ outline: 'none' }}
                  >
                    <i
                      className="fa fa-thumbs-up"
                      aria-hidden="true"
                      style={{
                        color: findUserLike(item.vote) ? 'blue' : 'black',
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
                    style={{ outline: 'none' }}
                  >
                    <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    className="ml-1"
                    style={{ outline: 'none' }}
                  >
                    <i className="fa fa-commenting-o" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center post">
          <p>No post yet</p>{' '}
        </div>
      )}

      {showEditForm ? (
        <PostModal id={_id} edit_text={_text} handleClose={closeFormClick} />
      ) : null}
    </div>
  );
};
