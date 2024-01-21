import { getUserRole } from "../../helper/sessionHelper";
//Checking the user Role
export default function useAuthAdmin() {
  const auth = getUserRole();
  return auth === "admin" ? true : false;
}
