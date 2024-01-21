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
    clearSessions,

} = new SessionHelper();
