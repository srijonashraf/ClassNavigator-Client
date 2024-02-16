import { getAccessToken } from "../../helper/SessionHelper.js";
//Checking if user is logged in or not
export default function useAuth() {
  const auth = getAccessToken();
  // console.log(auth);
  return auth ? true : false;
}
