/* eslint-disable import/no-anonymous-default-export */
import {
  SET_CURRENT_USER,
  GET_ERRORS,
  GET_CATEGORY,
  GET_ALL_USER,
} from "../types";
import isEmpty from "../../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: {},
  category: "",
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        isLoading: false,
      };

    case GET_ERRORS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case GET_ALL_USER: {
      return {
        ...state,
        users: action.payload,
      };
    }
    default:
      return state;
  }
}
