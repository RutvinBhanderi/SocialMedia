import { combineReducers } from "@reduxjs/toolkit";
import { post } from "./postReducer";
import { auth } from "./authReducer";
export default combineReducers({
  post,
  auth,
});
