import React from "react";
import FeedLayout from "../profile/itemLayout/FeedLayout";
import Right from "../sidebars/Right";

const LandingPage = () => {
  return (
    <div
      className="row"
      style={{
        minHeight: "85vh",
      }}
    >
      <div className="col-md-7 mx-auto d-flex justify-content-between">
        <div className="center-layout">
          <FeedLayout />
        </div>
        <div className="sidebar-right-layout">
          <Right />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
