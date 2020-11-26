/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserPostsAction,
  unVotePost,
  votePost,
} from '../../../../../redux/actions/PostAction';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';

const UserPosts = ({ userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const posts = useSelector(state => state.posts);
  const errors = useSelector(state => state.errors);
  const { userPosts } = posts;

  useEffect(() => {
    errors.error = '';
  });
  useEffect(() => {
    dispatch(getUserPostsAction(userId));
  }, [userId, dispatch]);

  const voteClick = _id => {
    if (!auth.isAuthenticated) {
      history.push('/login');
    } else {
      dispatch(votePost(_id, 5, userId));
    }
  };
  const unVoteClick = _id => {
    if (!auth.isAuthenticated) {
      history.push('/login');
    } else {
      dispatch(unVotePost(_id, 5, userId));
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
      {userPosts.map((item, index) => (
        <div className="post" key={index}>
          <div
            className="post-head"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex' }}>
              <div>
                <img src={item.photo} />
              </div>
              <div style={{ display: 'block', marginLeft: 8 }}>
                <p style={{ fontSize: 20, fontWeight: 500, cursor: 'pointer' }}>
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
  );
};

export default UserPosts;
