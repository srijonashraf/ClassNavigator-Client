import axios from "axios";
import {
  clearSessions,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./SessionHelper.js";
import Cookies from "js-cookie";
import { SessionAlertSwal } from "./ToasterHelper.js";
export const getBaseURL = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://classnavigator-srijonashraf.vercel.app/api/v1";
  } else {
    return "http://localhost:4500/api/v1";
  }
};

export const axiosHeader = () => {
  return {
    headers: { token: getAccessToken() || Cookies.get("accessToken") },
  };
};

export const LogoutWhenSessionExpired = () => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error.response && error.response.status === 401) {
        const isConfirmed = await SessionAlertSwal();
        if (isConfirmed) {
          clearSessions();
        }
      }
      return Promise.reject(error);
    }
  );
};

export const AutoRefreshTokens = async () => {
  const refreshToken = Cookies.get("refreshToken") || getRefreshToken();
  if (refreshToken) {
    try {
      let BaseURL = getBaseURL();
      const response = await axios.post(`${BaseURL}/refreshToken`, {
        refreshToken: refreshToken,
      });

      // console.log("From AutoRefreshToken Response: ", response.data);
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);
      } else {
        throw new Error("Refresh tokens failed");
      }
    } catch (error) {
      // Handle error here
      console.error("Error refreshing tokens:", error);
      throw error;
    }
  } else {
    throw new Error("No refresh token found");
  }
};

setInterval(AutoRefreshTokens, 1000 * 60 * 15);
