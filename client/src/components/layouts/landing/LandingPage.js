import React from 'react';
import FeedLayout from '../profile/itemLayout/FeedLayout';
import Left from '../sidebars/Left';
import Right from '../sidebars/Right';

const LandingPage = () => {
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
        <FeedLayout />
      </div>
      <div className="sidebar-right-layout">
        <Right />
      </div>
    </div>
  );
};

export default LandingPage;
