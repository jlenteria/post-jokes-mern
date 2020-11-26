import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  showFeed,
  showLatest,
  showTop,
} from '../../../redux/actions/PostAction';

const TopHeader = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const { showTopLayout, showLatestLayout, showFeedLayout } = posts;

  const showFeedClick = () => {
    history.push('/');
    dispatch(showFeed());
  };
  const showLatestClick = () => {
    history.push('/latest');
    dispatch(showLatest());
  };
  const showTopClick = () => {
    history.push('/top');
    dispatch(showTop());
  };

  return (
    <div className="feed-header">
      <div>
        <p style={{ fontWeight: 'bold', fontSize: 18 }}>Jokes</p>
      </div>
      <div className="feed-header-link">
        <p
          onClick={showFeedClick}
          style={{
            backgroundColor: showFeedLayout ? 'rgb(226, 225, 225)' : '#eef0f1',
            borderBottom: showFeedLayout
              ? '3px solid blueViolet'
              : '3px solid #eef0f1',
          }}
        >
          Feed
        </p>
        <p
          onClick={showTopClick}
          style={{
            background: showTopLayout ? 'rgb(226, 225, 225)' : '#eef0f1',
            borderBottom: showTopLayout
              ? '3px solid blueViolet'
              : '3px solid #eef0f1',
          }}
        >
          Top
        </p>
        <p
          onClick={showLatestClick}
          style={{
            background: showLatestLayout ? 'rgb(226, 225, 225)' : '#eef0f1',
            borderBottom: showLatestLayout
              ? '3px solid blueViolet'
              : '3px solid #eef0f1',
          }}
        >
          Latest
        </p>
      </div>
    </div>
  );
};

export default TopHeader;
