import axios from "axios";
import {
  clearSessions,
  getAccessToken,
  setSessionExpire,
} from "./SessionHelper.js";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import { errorToast } from "./ToasterHelper.js";

export const getBaseURL = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://classnavigator-srijonashraf.vercel.app/api/v1";
  } else {
    return "http://localhost:4500/api/v1";
  }
};

export const axiosHeader = () => {
  // console.log(getAccessToken(), Cookies.get('accessToken'));
  return {
    headers: { token: getAccessToken() || Cookies.get("accessToken") },
  };
};

export const LogoutWhenSessionExpired = () => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response && error.response.status === 401) {
        clearSessions();
      }
      return Promise.reject(error);
    }
  );
};
