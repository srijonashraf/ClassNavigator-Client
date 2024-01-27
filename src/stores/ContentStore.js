import axios from "axios";
import { create } from "zustand";
import { getToken } from "../helper/sessionHelper";

let BASE_URL = "";
if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://class-navigator.onrender.com/api/v1";
} else {
  BASE_URL = "http://localhost:4500/api/v1";
}

const ContentStore = create((set) => ({
  FetchAllTogether: null,
  FetchAllCoursesByClass: null,
  FetchAllTogetherRequest: async () => {
    let res = await axios.get(`${BASE_URL}/fetchAllTogether`, {
      headers: { token: getToken() },
    });
    if (res.data["status"] === "success") {
      set({
        FetchAllTogether: res.data.data,
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
        FetchAllCoursesByClass: res.data.data,
      });

      // console.log(res.data.data);
    }
  },
}));

export default ContentStore;
