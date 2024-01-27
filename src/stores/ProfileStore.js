import axios from "axios";
import { create } from "zustand";
import { getToken } from "../helper/sessionHelper";
let BASE_URL = "";
if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://class-navigator.onrender.com/api/v1";
} else {
  BASE_URL = "http://localhost:4500/api/v1";
}
const ProfileStore = create((set) => ({
  ProfileDetails: null,
  AdminAccessClasses: null,
  ProfileDetailsRequest: async () => {
    let res = await axios.get(`${BASE_URL}/profileDetails`, {
      headers: { token: getToken() },
    });
    if (res.data["status"] === "success") {
      set({
        ProfileDetails: res.data.data,
        AdminAccessClasses: res.data.data.adminAccessClasses,
      });
      console.log(res.data.data);
      // console.log(res.data.data.adminAccessClasses);
    }
  },
}));


export default ProfileStore;
