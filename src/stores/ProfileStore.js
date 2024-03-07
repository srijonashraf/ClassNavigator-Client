import axios from "axios";
import { create } from "zustand";
import {
  LogoutWhenSessionExpired,
  axiosHeader,
  getBaseURL,
} from "../helper/FunctionHelper.js";
let BaseURL = getBaseURL();

LogoutWhenSessionExpired();

const ProfileStore = create((set) => ({
  ProfileDetails: null,
  AdminAccessClasses: null,
  completedTasks: null,
  ProfileDetailsRequest: async () => {
    try {
      let res = await axios.get(`${BaseURL}/profileDetails`, axiosHeader());
      if (res.data["status"] === "success") {
        set({
          ProfileDetails: res.data.data,
          AdminAccessClasses: res.data.data.adminAccessClasses,
          completedTasks: res.data.data.completedTasks,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default ProfileStore;
