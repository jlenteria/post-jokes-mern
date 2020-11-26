import { combineReducers } from 'redux';
import Errors from './ErrorReducer';
import Post from './PostReducer';
import Profile from './ProfileReducer';
import Auth from './AuthReducer';

export default combineReducers({
  auth: Auth,
  posts: Post,
  profiles: Profile,
  errors: Errors,
});
