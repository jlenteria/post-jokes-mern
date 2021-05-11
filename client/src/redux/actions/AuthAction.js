import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import {
  GET_ALL_USER,
  GET_CATEGORY,
  GET_ERRORS,
  SET_CURRENT_USER,
} from "../types";

let changePass = false;

export const registerAccount = (data, history) => (dispatch) => {
  axios
    .post("/api/register", data)
    .then(() => {
      setTimeout(() => {
        history.push("/login");
      }, 1000);
      toast.success("Succesfull Registered", { autoClose: 1500 });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      toast.error(err.response.data, { autoClose: 1500 });
    });
};

export const loginAccount = (data) => (dispatch) => {
  axios
    .post("/api/login", data)
    .then((res) => {
      const { token } = res.data;

      setTimeout(() => {
        toast.success("Successfully Login", { autoClose: 1500 });
      }, 200);
      //set Token to ls
      localStorage.setItem("jwtToken", token);
      //Set to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set Current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      toast.error(err.response.data, { autoClose: 1500 });
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  setTimeout(() => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    window.location.reload();
  }, 1000);
  if (!changePass) {
    toast.error("Signing out ...", { autoClose: 1500 });
  }
};

export const updatePassword = (data, setState, state) => (dispatch) => {
  axios
    .post("/api/updatePassword", data)
    .then((res) => {
      if (res.data.StatusCode === 200) {
        changePass = true;
        setTimeout(() => {
          dispatch(logoutUser());
        }, 1000);
        toast.success(
          "Successfully updated password, directing to login page..",
          { autoClose: 1700 }
        );
      } else {
        setState({
          ...state,
          error: "Incorrect old password, please try again",
        });
      }
    })
    .catch((err) => console.log(err.response.data));
};

export const getCategory = () => (dispatch) => {
  dispatch({
    type: GET_CATEGORY,
    payload: "Beginner",
  });
};

export const getUserByName = (data) => (dispatch) => {
  axios
    .get("/api/all-users", data)
    .then((res) => {
      const { data } = res;
      dispatch({
        type: GET_ALL_USER,
        payload: data,
      });
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};
