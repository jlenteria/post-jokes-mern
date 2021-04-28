import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  showFeed,
  showLatest,
  showTop,
} from "../../../redux/actions/PostAction";

const TopHeader = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const { showTopLayout, showLatestLayout, showFeedLayout } = posts;

  const showFeedClick = () => {
    history.push("/");
    dispatch(showFeed());
  };
  const showLatestClick = () => {
    history.push("/latest");
    dispatch(showLatest());
  };
  const showTopClick = () => {
    history.push("/top");
    dispatch(showTop());
  };

  return (
    <div className="feed-header">
      <div>
        <p style={{ fontWeight: "bold", fontSize: 18 }}>Jokes</p>
      </div>
      <div className="feed-header-link">
        <p
          onClick={showFeedClick}
          style={{
            color: "white",
            borderBottom: showFeedLayout ? "3px solid red" : "3px solid black",
          }}
        >
          Feed
        </p>
        <p
          onClick={showTopClick}
          style={{
            borderBottom: showTopLayout ? "3px solid red" : "3px solid black",
          }}
        >
          Top
        </p>
        <p
          onClick={showLatestClick}
          style={{
            borderBottom: showLatestLayout
              ? "3px solid red"
              : "3px solid black",
          }}
        >
          Latest
        </p>
      </div>
    </div>
  );
};

export default TopHeader;
