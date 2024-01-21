import { getToken } from "../../helper/sessionHelper";

export default function useAuth() {
  const auth = getToken();
  return auth ? true : false;
}
