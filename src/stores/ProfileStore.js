import axios from "axios";
import { create } from "zustand";
import { getToken, setUserRole } from "../helper/sessionHelper";

const BASE_URL = "http://localhost:4500/api/v1/";
const ProfileStore = create((set) => ({
  ProfileDetails: null,
  ProfileDetailsRequest: async () => {
    let res = await axios.get(`${BASE_URL}/profileDetails`, {
      headers: { token: getToken() },
    });
    if (res.data["status"] === "success") {
      set({
        ProfileDetails: res.data.data,
      });
      setUserRole(res.data.data.role);
    }
  },
}));

export default ProfileStore;
