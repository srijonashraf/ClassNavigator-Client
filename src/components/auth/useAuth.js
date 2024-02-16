import Cookies from "js-cookie";
import { getAccessToken } from "../../helper/sessionHelper";
//Checking if user is logged in or not
export default function useAuth() {
  const auth = getAccessToken();
  return auth ? true : false;
}
