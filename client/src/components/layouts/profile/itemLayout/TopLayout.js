import React from "react";
import TopHeader from "../../landing/TopHeader";
import Right from "../../sidebars/Right";
import { TopPost } from "../item/post/TopPost";

const TopLayout = () => {
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
        <TopPost />
      </div>
      <div className="sidebar-right-layout">
        <Right />
      </div>
    </div>
  );
};

export default TopLayout;
