import axios from 'axios';
import { toast } from 'react-toastify';
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
} from '../types';

export const addProfileAction = data => dispatch => {
  axios
    .post('/api/user/profile', data)
    .then(() => {
      dispatch(getCurrentProfile());
      setTimeout(() => {
        toast.success('Profile save successfully');
      }, 300);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getCurrentProfile = () => dispatch => {
  axios
    .get('/api/user/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
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

export const addEducationAction = data => dispatch => {
  axios
    .post('/api/user/profile/education', data)
    .then(() => {
      dispatch(getCurrentProfile());
      setTimeout(() => {
        toast.success('Education successfully added');
      }, 300);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addExperienceAction = data => dispatch => {
  axios
    .post('/api/user/profile/experience', data)
    .then(() => {
      dispatch(getCurrentProfile());
      setTimeout(() => {
        toast.success('Experience successfully added');
      }, 300);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteEducationAction = id => dispatch => {
  axios
    .delete(`/api/user/profile/education/${id}`)
    .then(() => {
      dispatch(getCurrentProfile());
      setTimeout(() => {
        toast.success('Deleted successfully');
      }, 300);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const deleteExperienceAction = id => dispatch => {
  axios
    .delete(`/api/user/profile/experience/${id}`)
    .then(() => {
      dispatch(getCurrentProfile());
      setTimeout(() => {
        toast.success('Deleted successfully');
      }, 300);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getProfileByIdAction = id => dispatch => {
  axios
    .get(`/api/user/profile/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE_BY_ID,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

export const deleteAccountAction = () => dispatch => {
  if (window.confirm('Are you sure you want to delete?')) {
    axios
      .delete('/api/user/delete')
      .then(() =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

//FORMS

export const showProfileAction = () => dispatch => {
  dispatch({
    type: PROFILE_FORM,
  });
};

export const showEducationAction = () => dispatch => {
  dispatch({
    type: EDUCATION_FORM,
  });
};

export const showExperienceAction = () => dispatch => {
  dispatch({
    type: EXPERIENCE_FORM,
  });
};

export const showEducationModal = () => dispatch => {
  dispatch({
    type: EDUCATION_MODAL,
  });
};
export const showExperienceModal = () => dispatch => {
  dispatch({
    type: EXPERIENCE_MODAL,
  });
};
