import Axios from "axios";
import { USER_SIGNIN_API } from "../constants/Cyberbugs/Cyberbugs";

export const signinCyberBugActionAction = (email, password) => ({
  type: USER_SIGNIN_API,
  userLogin: {
    email: email,   
    password: password,
  },
});
