import axios from "axios";
import { create } from "zustand";
import { clearSessions, getAccessToken, setAccessToken } from "../helper/sessionHelper";
import Cookies from "js-cookie";

let BASE_URL = "";
if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://classnavigator-srijonashraf.vercel.app/api/v1";
} else {
  BASE_URL = "http://localhost:4500/api/v1";
}

// axios.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   function(error) {
//     if (error.response && error.response.status === 401) {
//       clearSessions();
//     }
//     return Promise.reject(error);
//   }
// );

const AutomaticallyRefreshToken = async () => {
  if (getAccessToken()) {
    const response = await axios.post(`${BASE_URL}/refreshToken`, {
      refreshToken: Cookies.get("refreshToken"),
    });

    if (response.data.status === "success") {
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);
    }
  }
};

setInterval(AutomaticallyRefreshToken, 15 * 60 * 1000);


const ContentStore = create((set) => ({
  FetchAllTogether: null,
  FetchAllCoursesByClass: null,
  FetchAllTasksByCourse: null,
  FetchAllTasks: null,
  FetchAllCourses: null,

  FetchAllTaskCommonStore: null, //Applied for allTasks.jsx [By Landing will fetch all the tasks but when any class is selected then it will fetch all the tasks of that class and store here]

  FetchAllTogetherRequest: async () => {
    let res = await axios.get(`${BASE_URL}/fetchAllTogether`, {
      headers: { token: getAccessToken() },
    });
    if (res.data["status"] === "success") {
      set({
        FetchAllTogether: null,
        FetchAllTogether: res.data.data,
        // FetchAllCoursesByClass: null,
      });
      // console.log(res.data.data);
    }
  },

  FetchAllCoursesByClassRequest: async (classId) => {
    let res = await axios.get(`${BASE_URL}/fetchAllCoursesByClass/${classId}`, {
      headers: { token: getAccessToken() },
    });

    if (res.data["status"] === "success") {
      set({
        FetchAllCoursesByClass: null,
        FetchAllCoursesByClass: res.data.data,
      });

      // console.log(res.data.data);
    }
  },

  FetchAllTasksByCourseRequest: async (classId, courseId) => {
    let res = await axios.get(
      `${BASE_URL}/fetchAllTasksByCourse/${classId}/${courseId}`,
      {
        headers: { token: getAccessToken() },
      }
    );

    if (res.data["status"] === "success") {
      set({
        FetchAllTasksByCourse: null,
        FetchAllTaskCommonStore: null,
        FetchAllTaskCommonStore: res.data.data,
        FetchAllTasksByCourse: res.data.data,
      });

      // console.log('From FetchAllTasksByCourse Store:',res.data.data);
    }
  },

  FetchAllTasksRequest: async () => {
    let res = await axios.get(`${BASE_URL}/fetchAllTasks`, {
      headers: { token: getAccessToken() },
    });

    if (res.data["status"] === "success") {
      set({
        FetchAllTasks: null,
        FetchAllTaskCommonStore: null,
        FetchAllTaskCommonStore: res.data.data,
        FetchAllTasks: res.data.data,
      });

      // console.log("From FetchAllTasksRequest Store:", res.data.data);
    }
  },

  FetchCompletedTaskByCourseRequest: async (classId, courseId) => {
    let res = await axios.get(
      `${BASE_URL}/fetchCompletedTasksByCourse/${classId}/${courseId}`,
      {
        headers: { token: getAccessToken() },
      }
    );
    if (res.data["status"] === "success") {
      set({
        FetchAllTasksByCourse: null,
        FetchAllTasksByCourse: res.data.data,
      });
    }
  },

  FetchUnCompletedTaskByCourseRequest: async (classId, courseId) => {
    let res = await axios.get(
      `${BASE_URL}/fetchUnCompletedTasksByCourse/${classId}/${courseId}`,
      {
        headers: { token: getAccessToken() },
      }
    );
    if (res.data["status"] === "success") {
      set({
        FetchAllTasksByCourse: null,
        FetchAllTasksByCourse: res.data.data,
      });
    }
  },

  FetchAllCoursesRequest: async () => {
    let res = await axios.get(`${BASE_URL}/fetchAllCourses`, {
      headers: { token: getAccessToken() },
    });
    if (res.data["status"] === "success") {
      set({
        FetchAllCourses: null,
        FetchAllCourses: res.data.data,
      });
      // console.log('Fetch All Courses:',res.data.data);
    }
  },
}));

export default ContentStore;
