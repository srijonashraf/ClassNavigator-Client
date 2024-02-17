import axios from "axios";
import {
  clearSessions,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./SessionHelper.js";
import Cookies from "js-cookie";
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
    async function (error) {
      if (error.response && error.response.status === 401) {
        try {
          await AutoRefreshTokens();
        } catch (refreshError) {
          console.error("Error auto-refreshing tokens:", refreshError);
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

      console.log("From AutoRefreshToken Response: ", response.data);
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
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
