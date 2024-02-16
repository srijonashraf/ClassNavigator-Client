import Cookies from "js-cookie";
//Checking if user is logged in or not
export default function useAuth() {
  const auth = Cookies.get("accessToken");
  return auth ? true : false;
}
