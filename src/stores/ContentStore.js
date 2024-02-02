import axios from "axios";
import { create } from "zustand";
import { getToken } from "../helper/sessionHelper";

let BASE_URL = "";
if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://classnavigator-srijonashraf.vercel.app/api/v1";
} else {
  BASE_URL = "http://localhost:4500/api/v1";
}

const ContentStore = create((set) => ({
  FetchAllTogether: null,
  FetchAllCoursesByClass: null,
  FetchAllTasksByCourse: null,
  FetchAllTasks: null,
  FetchAllCourses: null,

  FetchAllTaskCommonStore : null, //Applied for allTasks.jsx [By Landing will fetch all the tasks but when any class is selected then it will fetch all the tasks of that class and store here]

  FetchAllTogetherRequest: async () => {
    let res = await axios.get(`${BASE_URL}/fetchAllTogether`, {
      headers: { token: getToken() },
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
      headers: { token: getToken() },
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
        headers: { token: getToken() },
      }
    );

    if (res.data["status"] === "success") {
      set({
        FetchAllTasksByCourse: null,
        FetchAllTaskCommonStore: null,
        FetchAllTaskCommonStore:res.data.data,
        FetchAllTasksByCourse: res.data.data,
      });

      // console.log('From FetchAllTasksByCourse Store:',res.data.data);
    }
  },

  FetchAllTasksRequest: async () => {
    let res = await axios.get(`${BASE_URL}/fetchAllTasks`, {
      headers: { token: getToken() },
    });

    if (res.data["status"] === "success") {
      set({
        FetchAllTasks: null,
        FetchAllTaskCommonStore:null,
        FetchAllTaskCommonStore:res.data.data,
        FetchAllTasks: res.data.data,
      });

      // console.log("From FetchAllTasksRequest Store:", res.data.data);
    }
  },

  FetchAllCoursesRequest: async () => {
    let res = await axios.get(`${BASE_URL}/fetchAllCourses`, {
      headers: { token: getToken() },
    });
    if (res.data["status"] === "success") {
      set({
        FetchAllCourses: null,
        FetchAllCourses: res.data.data,
      });
      // console.log('Fetch All Courses:',res.data.data);
    }
  }
}));

export default ContentStore;
