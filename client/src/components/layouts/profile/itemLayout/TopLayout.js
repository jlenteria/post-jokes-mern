import React from "react";
import TopHeader from "../../landing/TopHeader";
import Right from "../../sidebars/Right";
import { TopPost } from "../item/post/TopPost";

const TopLayout = () => {
  return (
    <div
      className="row landing"
      style={{
        minHeight: "85vh",
      }}
    >
      <div className="col-md-7 mx-auto d-flex justify-content-between">
        <div className="center-layout">
          <TopHeader />
          <TopPost />
        </div>
        <div className="sidebar-right-layout">
          <Right />
        </div>
      </div>
    </div>
  );
};

export default TopLayout;
