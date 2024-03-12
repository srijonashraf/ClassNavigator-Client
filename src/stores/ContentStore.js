import axios from "axios";
import { create } from "zustand";
import { axiosHeader, getBaseURL } from "../helper/FunctionHelper.js";
let BaseURL = getBaseURL();

const ContentStore = create((set) => ({
  FetchAllTogether: null,
  FetchAllCoursesByClass: null,
  FetchAllTasksByCourse: null,
  FetchAllTasks: null,
  FetchAllCourses: null,
  FetchEnrolledStudentList: null,
  FetchAdminList: null,

  FetchAllTaskCommonStore: null, //Applied for allTasks.jsx [By Landing will fetch all the tasks but when any class is selected then it will fetch all the tasks of that class and store here]

  FetchAllTogetherRequest: async () => {
    try {
      let res = await axios.get(`${BaseURL}/fetchAllTogether`, axiosHeader());
      if (res.data["status"] === "success") {
        set({
          FetchAllTogether: null,
          FetchAllTogether: res.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  FetchAllCoursesByClassRequest: async (classId) => {
    try {
      let res = await axios.get(
        `${BaseURL}/fetchAllCoursesByClass/${classId}`,
        axiosHeader()
      );

      if (res.data["status"] === "success") {
        set({
          FetchAllCoursesByClass: null,
          FetchAllCoursesByClass: res.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  FetchAllTasksByCourseRequest: async (classId, courseId) => {
    try {
      let res = await axios.get(
        `${BaseURL}/fetchAllTasksByCourse/${classId}/${courseId}`,
        axiosHeader()
      );

      if (res.data["status"] === "success") {
        set({
          FetchAllTasksByCourse: null,
          FetchAllTaskCommonStore: null,
          FetchAllTaskCommonStore: res.data.data,
          FetchAllTasksByCourse: res.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  FetchAllTasksRequest: async () => {
    let res = await axios.get(`${BaseURL}/fetchAllTasks`, axiosHeader());

    if (res.data["status"] === "success") {
      set({
        FetchAllTasks: null,
        FetchAllTaskCommonStore: null,
        FetchAllTaskCommonStore: res.data.data,
        FetchAllTasks: res.data.data,
      });
    }
  },

  FetchCompletedTaskByCourseRequest: async (classId, courseId) => {
    try {
      let res = await axios.get(
        `${BaseURL}/fetchCompletedTasksByCourse/${classId}/${courseId}`,
        axiosHeader()
      );
      if (res.data["status"] === "success") {
        set({
          FetchAllTasksByCourse: null,
          FetchAllTasksByCourse: res.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  FetchUnCompletedTaskByCourseRequest: async (classId, courseId) => {
    try {
      let res = await axios.get(
        `${BaseURL}/fetchUnCompletedTasksByCourse/${classId}/${courseId}`,
        axiosHeader()
      );
      if (res.data["status"] === "success") {
        set({
          FetchAllTasksByCourse: null,
          FetchAllTasksByCourse: res.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  FetchAllCoursesRequest: async () => {
    try {
      let res = await axios.get(`${BaseURL}/fetchAllCourses`, axiosHeader());
      if (res.data["status"] === "success") {
        set({
          FetchAllCourses: null,
          FetchAllCourses: res.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  FetchEnrolledStudentListRequest: async (classId) => {
    try {
      const response = await axios.get(
        `${BaseURL}/fetchEnrollStudentList/${classId}`,
        axiosHeader()
      );
      if (response.data["status"] === "success") {
        set({
          FetchEnrolledStudentList: null,
          FetchEnrolledStudentList: response.data.data,
        });
        // console.log(response.data.data);
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  },

  FetchAdminListRequest: async (classId) => {
    try {
      const response = await axios.get(
        `${BaseURL}/fetchAdminList/${classId}`,
        axiosHeader()
      );
      if (response.data["status"] === "success") {
        set({
          FetchAdminList: null,
          FetchAdminList: response.data.data,
        });
        // console.log(response.data.data);
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  },

  FetchRoutineByClassId: null,
  FetchRoutineByClassIdRequest: async (classId) => {
    try {
      const response = await axios.get(
        `${BaseURL}/fetchRoutineByClassId/${classId}`,
        axiosHeader()
      );
      if (response.data["status"] === "success") {
        set({
          FetchRoutineByClassId: response.data.data,
        });
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  },

  FetchClassById: null,
  FetchClassByIdRequest: async (classId) => {
    try {
      const response = await axios.get(
        `${BaseURL}/fetchClassesById/${classId}`,
        axiosHeader()
      );
      if (response.data["status"] === "success") {
        set({
          FetchClassById: response.data.data,
        });
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default ContentStore;
