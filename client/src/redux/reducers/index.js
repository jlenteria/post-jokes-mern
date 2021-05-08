import { combineReducers } from "redux";
import Errors from "./ErrorReducer";
import Post from "./PostReducer";
import Profile from "./ProfileReducer";
import Auth from "./AuthReducer";
import Active from "./ActiveReducer";

export default combineReducers({
  auth: Auth,
  posts: Post,
  profiles: Profile,
  errors: Errors,
  active: Active,
});
