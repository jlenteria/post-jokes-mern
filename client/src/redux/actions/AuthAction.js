import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { GET_ERRORS, SET_CURRENT_USER } from '../types';

export const registerAccount = (data, history) => dispatch => {
  axios
    .post('/api/register', data)
    .then(() => {
      setTimeout(() => {
        history.push('/login');
      }, 2000);
      toast.success('Succesfull Registered');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      toast.error(err.response.data);
    });
};

export const loginAccount = data => dispatch => {
  axios
    .post('/api/login', data)
    .then(res => {
      const { token } = res.data;
      setTimeout(() => {
        toast.success('Successfully Login');
      }, 200);
      //set Token to ls
      localStorage.setItem('jwtToken', token);
      //Set to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set Current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      toast.error(err.response.data);
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => dispatch => {
  setTimeout(() => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    window.location.reload();
  }, 2000);
  toast.error('Signing out ...');
};

export const changeProfileTitle = (data, id) => dispatch => {
  axios.put(`/api/user/title/${id}`, data).then(res => {
    const { token } = res.data;
    //set Token to ls
    localStorage.setItem('jwtToken', token);
    //Set to Auth header
    setAuthToken(token);
    //Decode token to get user data
    const decoded = jwt_decode(token);
    //Set Current user
    dispatch(setCurrentUser(decoded));
  });
};
