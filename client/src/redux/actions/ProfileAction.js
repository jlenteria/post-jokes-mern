import axios from "axios";
import { toast } from "react-toastify";
import {
  EDUCATION_FORM,
  EDUCATION_MODAL,
  EXPERIENCE_FORM,
  EXPERIENCE_MODAL,
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILE_BY_ID,
  PROFILE_FORM,
  SET_CURRENT_USER,
} from "../types";
import setAuthToken from "../utils/setAuthToken";

export const addUserSettings = (data) => (dispatch) => {
  axios
    .post("/api/updateUserSettings", data)
    .then((res) => {
      const { data } = res;
      if (data.StatusCode === 400) {
        return toast.error(data.Message, { autoClose: 1500 });
      }
      toast.success("User settings successfully updated", { autoClose: 1500 });
      dispatch(getCurrentProfile());
    })
    .catch(() => toast.error("Server error"));
};

export const getCurrentProfile = () => (dispatch) => {
  axios
    .post("/api/getCurrentProfile")
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
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

export const getUsersProfile = (id) => (dispatch) => {
  axios
    .post(`/api/getUserProfile/${id}`)
    .then((res) => {
      const { data } = res;
      const { profile } = data;

      dispatch({
        type: GET_PROFILE,
        payload: profile,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addEducationAction = (data) => (dispatch) => {
  axios
    .post("/api/user/profile/education", data)
    .then(() => {
      dispatch(getCurrentProfile());
      setTimeout(() => {
        toast.success("Education successfully added");
      }, 300);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addExperienceAction = (data) => (dispatch) => {
  axios
    .post("/api/user/profile/experience", data)
    .then(() => {
      dispatch(getCurrentProfile());
      setTimeout(() => {
        toast.success("Experience successfully added");
      }, 300);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteEducationAction = (id) => (dispatch) => {
  axios
    .delete(`/api/user/profile/education/${id}`)
    .then(() => {
      dispatch(getCurrentProfile());
      setTimeout(() => {
        toast.success("Deleted successfully");
      }, 300);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const deleteExperienceAction = (id) => (dispatch) => {
  axios
    .delete(`/api/user/profile/experience/${id}`)
    .then(() => {
      dispatch(getCurrentProfile());
      setTimeout(() => {
        toast.success("Deleted successfully");
      }, 300);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getProfileByIdAction = (id) => (dispatch) => {
  axios
    .get(`/api/user/profile/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE_BY_ID,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

export const deleteAccountAction = () => (dispatch) => {
  if (window.confirm("Are you sure you want to delete?")) {
    axios
      .post("/api/deleteAccount")
      .then(() => {
        setTimeout(() => {
          localStorage.removeItem("jwtToken");
          setAuthToken(false);
          dispatch({
            type: SET_CURRENT_USER,
            payload: {},
          });
        }, 1500);
        toast.success("Account successfully deleted", { autoClose: 1400 });
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

export const updateBasicSettings = (data) => (dispatch) => {
  axios
    .post("/api/updateBasicSettings", data)
    .then(() => {
      dispatch(getCurrentProfile());
      toast.success("Basic settings successfully updated", { autoClose: 1300 });
    })
    .catch((err) => toast.error(err.response.data, { autoClose: 1300 }));
};

export const updateLinksSettings = (data) => (dispatch) => {
  axios
    .post("/api/updateLinksSettings", data)
    .then(() => {
      dispatch(getCurrentProfile());
      toast.success("Links settings successfully updated", { autoClose: 1300 });
    })
    .catch((err) => toast.error(err.response.data, { autoClose: 1300 }));
};

//FORMS

export const showProfileAction = () => (dispatch) => {
  dispatch({
    type: PROFILE_FORM,
  });
};

export const showEducationAction = () => (dispatch) => {
  dispatch({
    type: EDUCATION_FORM,
  });
};

export const showExperienceAction = () => (dispatch) => {
  dispatch({
    type: EXPERIENCE_FORM,
  });
};

export const showEducationModal = () => (dispatch) => {
  dispatch({
    type: EDUCATION_MODAL,
  });
};
export const showExperienceModal = () => (dispatch) => {
  dispatch({
    type: EXPERIENCE_MODAL,
  });
};
