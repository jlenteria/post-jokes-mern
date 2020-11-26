/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import TopHeader from '../../landing/TopHeader';
import PostItem from '../item/post/PostItem';

const FeedLayout = () => {
  return (
    <div className="feed" style={{ display: 'block' }}>
      <TopHeader />
      <div className="feed-content">
        <PostItem />
      </div>
    </div>
  );
};

export default FeedLayout;
