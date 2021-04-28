import React, { useEffect } from "react";

import TopHeader from "../../landing/TopHeader";
import Right from "../../sidebars/Right";
import { LatestPost } from "../item/post/LatestPost";

const LatestLayout = () => {
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
        <TopHeader />
        <LatestPost />
      </div>
      <div className="sidebar-right-layout">
        <Right />
      </div>
    </div>
  );
};

export default LatestLayout;
