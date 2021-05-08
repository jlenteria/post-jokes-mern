import React, { useEffect } from "react";

import TopHeader from "../../landing/TopHeader";
import Right from "../../sidebars/Right";
import { LatestPost } from "../item/post/LatestPost";

const LatestLayout = () => {
  return (
    <div
      className="landing"
      style={{
        minHeight: "85vh",
      }}
    >
      <div className="col-md-7 mx-auto d-flex justify-content-between">
        <div className="center-layout">
          <TopHeader />
          <LatestPost />
        </div>
        <div className="sidebar-right-layout">
          <Right />
        </div>
      </div>
    </div>
  );
};

export default LatestLayout;
