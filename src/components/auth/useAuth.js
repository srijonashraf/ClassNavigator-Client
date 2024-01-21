import { getToken } from "../../helper/sessionHelper";
//Checking if user is logged in or not
export default function useAuth() {
  const auth = getToken();
  return auth ? true : false;
}
