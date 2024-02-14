import axios from "axios";
import { create } from "zustand";
import { clearSessions, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "../helper/sessionHelper";
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

const ProfileStore = create((set) => ({
  ProfileDetails: null,
  AdminAccessClasses: null,
  completedTasks: null,
  ProfileDetailsRequest: async () => {
    let res = await axios.get(`${BASE_URL}/profileDetails`, {
      headers: { token: getAccessToken() },
    });

    if (res.data["status"] === "success") {
      set({
        ProfileDetails: res.data.data,
        AdminAccessClasses: res.data.data.adminAccessClasses,
        completedTasks: res.data.data.completedTasks,
      });
      // console.log('Profile Store:',res.data.data.completedTasks);
      // console.log(res.data.data.adminAccessClasses);
    }
  },
}));

export default ProfileStore;
