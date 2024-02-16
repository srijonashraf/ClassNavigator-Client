import Cookies from "js-cookie";

class SessionHelper {
  setAccessToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  setRefreshToken(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  setLoggedIn(value) {
    localStorage.setItem("loggedIn", value);
  }

  getLoggedIn() {
    return JSON.parse(localStorage.getItem("loggedIn")) || null;
  }

  clearSessions() {
    localStorage.clear();
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    window.location.href = "/";
  }
}

export const {
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getRefreshToken,
  setLoggedIn,
  getLoggedIn,
  clearSessions,
} = new SessionHelper();
