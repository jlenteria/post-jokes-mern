import React, { useEffect } from 'react';

import TopHeader from '../../landing/TopHeader';
import Left from '../../sidebars/Left';
import Right from '../../sidebars/Right';
import { LatestPost } from '../item/post/LatestPost';

const LatestLayout = () => {
  return (
    <div
      className="landing"
      style={{
        padding: '0px 80px',
        minHeight: '85vh',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <div className="sidebar-left-layout">
        <Left />
      </div>
      <div className="center">
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
