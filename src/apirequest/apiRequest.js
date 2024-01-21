import axios from "axios";
import { setToken, getToken } from "../helper/sessionHelper.js";
const BaseURLAdmin = "http://localhost:4500/api/v1/admin";
const BaseURLUser = "http://localhost:4500/api/v1/user";
const BaseURL = "http://localhost:4500/api/v1";
const AxiosHeader = getToken();
export const LoginByAdmin = async (data) => {
  const response = await axios.post(`${BaseURLAdmin}/login`, data);
  if (response.data.status === "success") {
    setToken(response.data.token);
    return response;
  } else {
    return false;
  }
};

export const LoginByUser = async (data) => {
  const response = await axios.post(`${BaseURLUser}/login`, data);
  if (response.data.status === "success") {
    setToken(response.data.token);
    return response;
  } else {
    return false;
  }
};

export const RegisterByAdmin = async (data) => {
  const response = await axios.post(`${BaseURLAdmin}/registration`, data);
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const RegisterByUser = async (data) => {
  const response = await axios.post(`${BaseURLUser}/registration`, data);
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const FetchClassesById = async () => {
  const response = await axios.get(`${BaseURL}/fetchClassByClassId`,{ headers: { token: getToken() } });
  if (response.data.status === "success") {
    console.log(response.data.data);
    return response;
  } else {
    return false;
  }
};
