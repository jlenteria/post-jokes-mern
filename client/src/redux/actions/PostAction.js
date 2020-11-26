import axios from 'axios';
import { toast } from 'react-toastify';

import {
  CLOSE_ADD_FORM,
  GET_AUTH_POSTS,
  GET_ERRORS,
  GET_POSTS,
  GET_USER_POSTS,
  LATEST_POST,
  SHOW_ADD_FORM,
  SHOW_EDIT_FORM,
  SHOW_FEED,
  SHOW_LATEST,
  SHOW_TOP,
  TOP_POST,
} from '../types';

export const addPost = data => dispatch => {
  axios
    .post('/api/user/joke', data)
    .then(() => {
      dispatch(getPosts());
      setTimeout(() => {
        toast.success('Joke successfully posted!');
      }, 500);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getPosts = () => dispatch => {
  dispatch(getTopPost());
  dispatch(getLatestPost());
  dispatch(getAuthPosts());
  axios
    .get('/api/user/jokes')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch(() =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

export const editPost = (id, text) => dispatch => {
  axios
    .put(`/api/user/jokes/list-of-jokes/${id}`, text)
    .then(() => {
      dispatch(getPosts());
      setTimeout(() => {
        toast.success('Joke successfully Edited!');
      }, 500);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deletePost = id => dispatch => {
  axios
    .delete(`/api/user/jokes/list-of-jokes/${id}`)
    .then(() => {
      dispatch(getPosts());
      setTimeout(() => {
        toast.success('Joke successfully deleted!');
      }, 500);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

export const getTopPost = () => dispatch => {
  axios
    .get('/api/user/joke/top-jokes')
    .then(res =>
      dispatch({
        type: TOP_POST,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getLatestPost = () => dispatch => {
  axios
    .get('/api/user/joke/latest-jokes')
    .then(res =>
      dispatch({
        type: LATEST_POST,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const votePost = (id, vote, userId) => dispatch => {
  axios
    .post(`/api/user/jokes/vote/${id}`)
    .then(() => {
      if (vote === 1) {
        dispatch(getPosts());
      } else if (vote === 2) {
        dispatch(getTopPost());
      } else if (vote === 3) {
        dispatch(getLatestPost());
      } else if (vote === 4) {
        dispatch(getAuthPosts());
      } else if (vote === 5) {
        dispatch(getUserPostsAction(userId));
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const unVotePost = (id, vote, userId) => dispatch => {
  axios
    .post(`/api/user/jokes/unvote/${id}`)
    .then(() => {
      if (vote === 1) {
        dispatch(getPosts());
      } else if (vote === 2) {
        dispatch(getTopPost());
      } else if (vote === 3) {
        dispatch(getLatestPost());
      } else if (vote === 4) {
        dispatch(getAuthPosts());
      } else if (vote === 5) {
        dispatch(getUserPostsAction(userId));
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getAuthPosts = () => dispatch => {
  axios
    .get('/api/user/jokes/list-of-jokes')
    .then(res =>
      dispatch({
        type: GET_AUTH_POSTS,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getUserPostsAction = id => dispatch => {
  axios
    .get(`/api/user/profile-joke/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER_POSTS,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const filter = filtered => dispatch => {
  if (filtered === '1') {
    dispatch(getAuthPosts());
  } else {
  }
};

//FORMS
export const showAddFormControl = () => dispatch => {
  dispatch({
    type: SHOW_ADD_FORM,
  });
};

export const showEditFormControl = () => dispatch => {
  dispatch({
    type: SHOW_EDIT_FORM,
  });
};

export const closeAddFormControl = () => dispatch => {
  dispatch({
    type: CLOSE_ADD_FORM,
  });
};

export const showFeed = () => dispatch => {
  dispatch({
    type: SHOW_FEED,
  });
};
export const showTop = () => dispatch => {
  dispatch({
    type: SHOW_TOP,
  });
};

export const showLatest = () => dispatch => {
  dispatch({
    type: SHOW_LATEST,
  });
};
