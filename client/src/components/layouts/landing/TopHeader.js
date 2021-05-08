import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const TopHeader = () => {
  const history = useHistory();
  const active = useSelector((state) => state.active);

  const showFeedClick = () => {
    history.push("/");
  };
  const showLatestClick = () => {
    history.push("/latest");
  };
  const showTopClick = () => {
    history.push("/top");
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
            borderBottom:
              active.activeHeader === 0 ? "3px solid red" : "3px solid black",
          }}
        >
          Feed
        </p>
        <p
          onClick={showTopClick}
          style={{
            borderBottom:
              active.activeHeader === 1 ? "3px solid red" : "3px solid black",
          }}
        >
          Top
        </p>
        <p
          onClick={showLatestClick}
          style={{
            borderBottom:
              active.activeHeader === 2 ? "3px solid red" : "3px solid black",
          }}
        >
          Latest
        </p>
      </div>
    </div>
  );
};

export default TopHeader;
