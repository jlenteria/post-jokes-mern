/* eslint-disable import/no-anonymous-default-export */
import {
  CLOSE_ADD_FORM,
  GET_POSTS,
  SHOW_ADD_FORM,
  ADD_POST,
  SHOW_EDIT_FORM,
  LATEST_POST,
  TOP_POST,
  GET_AUTH_POSTS,
  GET_USER_POSTS,
  FILTER_DATE,
  FILTER_LIKES,
} from "../types";

const initialState = {
  posts: [],
  topPosts: [],
  latestPosts: [],
  userPosts: [],
  isLoading: true,
  showAddForm: false,
  showEditForm: false,
  showFeedLayout: true,
  showTopLayout: false,
  showLatestLayout: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
        showEditForm: false,
        showAddForm: false,
      };
    case SHOW_ADD_FORM:
      return {
        ...state,
        showAddForm: true,
        showEditForm: false,
      };

    case CLOSE_ADD_FORM:
      return {
        ...state,
        showAddForm: false,
        showEditForm: false,
      };
    case SHOW_EDIT_FORM:
      return {
        ...state,
        showAddForm: false,
        showEditForm: true,
      };

    case LATEST_POST:
      return {
        ...state,
        latestPosts: action.payload,
      };

    case TOP_POST:
      return {
        ...state,
        topPosts: action.payload,
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
        showEditForm: false,
        showAddForm: false,
      };

    case FILTER_LIKES:
      return {
        ...state,
        authPosts: action.payload,
      };

    default:
      return state;
  }
}
