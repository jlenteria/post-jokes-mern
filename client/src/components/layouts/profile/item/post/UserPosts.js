/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserPostsAction,
  unVotePost,
  votePost,
} from "../../../../../redux/actions/PostAction";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";

const UserPosts = ({ userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts);
  const errors = useSelector((state) => state.errors);
  const { userPosts } = posts;

  useEffect(() => {
    errors.error = "";
  });
  useEffect(() => {
    dispatch(getUserPostsAction(userId));
  }, [userId, dispatch]);

  const voteClick = (_id) => {
    if (!auth.isAuthenticated) {
      history.push("/login");
    } else {
      dispatch(votePost(_id, 5, userId));
    }
  };
  const unVoteClick = (_id) => {
    if (!auth.isAuthenticated) {
      history.push("/login");
    } else {
      dispatch(unVotePost(_id, 5, userId));
    }
  };

  const findUserLike = (likes) => {
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const userClick = (user, firstname, lastname) => {
    if (user === auth.user.id) {
      history.push("/profile-me");
    } else {
      history.push({
        pathname: `/profile/${firstname}`,
        state: { user, firstname, lastname },
      });
    }
  };
  return (
    <div>
      {userPosts.length > 0 ? (
        <div>
          {" "}
          {userPosts.map((item, index) => (
            <div className="post" key={index}>
              <div
                className="post-head"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ display: "flex" }}>
                  <div>
                    <img src={item.photo} />
                  </div>
                  <div style={{ display: "block", marginLeft: 8 }}>
                    <div className="d-flex align-items-center">
                      <p
                        style={{
                          fontSize: 20,
                          fontWeight: 500,
                          cursor: "pointer",
                          marginRight: 20,
                        }}
                        onClick={() =>
                          userClick(item.user, item.firstName, item.lastName)
                        }
                      >
                        {item.firstName} {item.lastName}
                      </p>
                      <span
                        className="text-muted"
                        style={{ fontSize: 12, marginTop: -10 }}
                      >
                        <Moment format="MMM D YYYY" withTitle>
                          {item.date}
                        </Moment>{" "}
                        (<Moment fromNow>{item.date}</Moment>)
                      </span>
                    </div>
                    <p
                      style={{ marginTop: -18, fontSize: 15 }}
                      className="text-muted"
                    >
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
              <div className="post-content text-center mt-3">
                <div className="mx-auto pb-2 pt-2" style={{ width: "70%" }}>
                  <h5>{item.text}</h5>
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
                    <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
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
    </div>
  );
};

export default UserPosts;
