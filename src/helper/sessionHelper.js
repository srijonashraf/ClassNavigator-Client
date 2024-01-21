class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setLoggedIn(value) {
    localStorage.setItem("loggedIn", value);
  }

  getLoggedIn() {
    return JSON.parse(localStorage.getItem("loggedIn")) || null;
  }

  setUserRole(value) {
    localStorage.setItem("userRole", value);
  }

  getUserRole() {
    return localStorage.getItem("userRole") || null;
  }

  clearSessions() {
    localStorage.clear();
    window.location.href = "/";
  }
}

export const {
  setToken,
  getToken,
  setLoggedIn,
  getLoggedIn,
  setUserRole,
  getUserRole,
  clearSessions,
} = new SessionHelper();
