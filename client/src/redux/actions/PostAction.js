import axios from "axios";
import { toast } from "react-toastify";
import { resultData } from "../../assets/default";

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
} from "../types";

export const addPost = (data, userId) => (dispatch) => {
  axios
    .post("/api/user/joke", data)
    .then(() => {
      dispatch(getPosts());
      setTimeout(() => {
        dispatch(getUserPostsAction(userId));
      }, 500);
      toast.success("Joke successfully posted!", { autoClose: 2000 });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getAllPosts = () => (dispatch) => {
  axios.get("/api/user/joke/get-all-jokes").then((res) => {
    const { data } = res;
    const newArr = [];
    data.forEach((item) => {
      getUserData(item.user).then((item2) => {
        if (item2 !== undefined) {
          const obj = {
            date: item.date,
            text: item.text,
            vote: item.vote,
            firstName: item2.firstname,
            lastName: item2.lastname,
            photo: item2.photo,
            category: item2.category,
            _id: item._id,
            user: item.user,
          };
          newArr.push(obj);
        }
        dispatch({
          type: GET_POSTS,
          payload: newArr,
        });
      });
    });
  });
};

export const getUserData = (id) => {
  return axios
    .get(`/api/getUserData/${id}`)
    .then((res) => {
      const { user } = res.data;
      const result = {
        firstname: user.firstName,
        lastname: user.lastName,
        photo: user.photo,
        category: user.category,
      };
      return result;
    })
    .catch((err) => {});
};

export const getPosts = () => (dispatch) => {
  dispatch(getTopPost());
  dispatch(getLatestPost());
  axios
    .get("/api/user/jokes")
    .then((res) => {
      const { data } = res;
      const newArr = [];
      data.forEach((item) => {
        getUserData(item.user).then((item2) => {
          if (item2 !== undefined) {
            const obj = {
              date: item.date,
              text: item.text,
              vote: item.vote,
              firstName: item2.firstname,
              lastName: item2.lastname,
              photo: item2.photo,
              category: item2.category,
              _id: item._id,
              user: item.user,
            };
            newArr.push(obj);
          }
          dispatch({
            type: GET_POSTS,
            payload: newArr,
          });
        });
      });
    })
    .catch(() =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

export const editPost = (id, text, userId) => (dispatch) => {
  axios
    .put(`/api/user/jokes/list-of-jokes/${id}`, text)
    .then(() => {
      dispatch(getPosts());
      setTimeout(() => {
        dispatch(getUserPostsAction(userId));
      }, 500);
      toast.success("Joke successfully updated!", { autoClose: 1500 });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deletePost = (id, userId) => (dispatch) => {
  axios
    .delete(`/api/user/jokes/list-of-jokes/${id}`)
    .then(() => {
      dispatch(getPosts());
      setTimeout(() => {
        dispatch(getUserPostsAction(userId));
      }, 500);
      toast.success("Joke successfully deleted!", { autoClose: 1500 });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

export const getTopPost = () => (dispatch) => {
  axios
    .get("/api/user/joke/top-jokes")
    .then((res) => {
      const { data } = res;
      const newArr = [];

      data.forEach((item) => {
        getUserData(item.user).then((item2) => {
          if (item2 !== undefined) {
            const obj = {
              date: item.date,
              text: item.text,
              vote: item.vote,
              firstName: item2.firstname,
              lastName: item2.lastname,
              photo: item2.photo,
              category: item2.category,
              _id: item._id,
              user: item.user,
            };
            newArr.push(obj);
          }
          dispatch({
            type: TOP_POST,
            payload: newArr,
          });
        });
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getLatestPost = () => (dispatch) => {
  axios
    .get("/api/user/joke/latest-jokes")
    .then((res) => {
      const { data } = res;
      const newArr = [];

      data.forEach((item) => {
        getUserData(item.user).then((item2) => {
          if (item2 !== undefined) {
            const obj = {
              date: item.date,
              text: item.text,
              vote: item.vote,
              firstName: item2.firstname,
              lastName: item2.lastname,
              photo: item2.photo,
              category: item2.category,
              _id: item._id,
              user: item.user,
            };
            newArr.push(obj);
          }
          dispatch({
            type: LATEST_POST,
            payload: newArr,
          });
        });
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const votePost = (id, vote, userId) => (dispatch) => {
  axios
    .post(`/api/user/jokes/vote/${id}`)
    .then(() => {
      if (vote !== "") {
        dispatch(getPosts());
      }
      dispatch(getUserPostsAction(userId));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const unVotePost = (id, vote, userId) => (dispatch) => {
  axios
    .post(`/api/user/jokes/unvote/${id}`)
    .then(() => {
      if (vote !== "") {
        dispatch(getPosts());
      }
      dispatch(getUserPostsAction(userId));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getAuthPosts = () => (dispatch) => {
  axios
    .get("/api/user/jokes/list-of-jokes")
    .then((res) =>
      dispatch({
        type: GET_AUTH_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getUserPostsAction = (id) => (dispatch) => {
  getUserData(id)
    .then((dataResult) => {
      if (dataResult !== undefined) {
        axios
          .get(`/api/user/profile-joke/${id}`)
          .then((res) => {
            const { data } = res;
            const newData = [];
            if (data.length > 0) {
              data.forEach((item) => {
                const newObj = {
                  date: item.date,
                  text: item.text,
                  vote: item.vote,
                  user: item.user,
                  _id: item._id,
                  firstname: dataResult.firstname,
                  lastname: dataResult.lastname,
                  photo: dataResult.photo,
                  category: dataResult.category,
                };
                newData.push(newObj);
              });
            } else {
              const newObj = {
                date: "",
                text: "",
                vote: [],
                user: "",
                _id: "",
                firstname: dataResult.firstname,
                lastname: dataResult.lastname,
                photo: dataResult.photo,
                category: dataResult.category,
              };
              newData.push(newObj);
            }

            dispatch({
              type: GET_USER_POSTS,
              payload: newData,
            });
          })
          .catch((err) =>
            dispatch({
              type: GET_ERRORS,
              payload: err,
            })
          );
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const filter = (filtered) => (dispatch) => {
  if (filtered === "1") {
    dispatch(getAuthPosts());
  } else {
  }
};

//FORMS
export const showAddFormControl = () => (dispatch) => {
  dispatch({
    type: SHOW_ADD_FORM,
  });
};

export const showEditFormControl = () => (dispatch) => {
  dispatch({
    type: SHOW_EDIT_FORM,
  });
};

export const closeAddFormControl = () => (dispatch) => {
  dispatch({
    type: CLOSE_ADD_FORM,
  });
};
