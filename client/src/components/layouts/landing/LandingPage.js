import React from "react";
import FeedLayout from "../profile/itemLayout/FeedLayout";
import Right from "../sidebars/Right";

const LandingPage = () => {
  return (
    <div
      className="landing"
      style={{
        padding: "0px 250px",
        minHeight: "85vh",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className="center-layout">
        <FeedLayout />
      </div>
      <div className="sidebar-right-layout">
        <Right />
      </div>
    </div>
  );
};

export default LandingPage;
