import axios from "axios";
import { setToken, getToken, setUserRole } from "../helper/sessionHelper.js";
// const BaseURLAdmin = "http://localhost:4500/api/v1/admin";
// const BaseURLUser = "http://localhost:4500/api/v1/user";
// const BaseURL = "http://localhost:4500/api/v1";
const BaseURLAdmin = "https://class-navigator.onrender.com/api/v1/admin";
const BaseURLUser = "https://class-navigator.onrender.com/api/v1/user";
const BaseURL = "https://class-navigator.onrender.com/api/v1";
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

export const ProfileDetails = async () => {
  const response = await axios.get(`${BaseURL}/profileDetails`, {
    headers: { token: getToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const FetchClassesById = async () => {
  const response = await axios.get(`${BaseURL}/fetchClassByClassId`, {
    headers: { token: getToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const AddNewClassByAdmin = async (data) => {
  const response = await axios.post(`${BaseURLAdmin}/addNewClass`, data, {
    headers: { token: getToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const EnrollClass = async (classId) => {
  const response = await axios.get(`${BaseURLUser}/enrollClass/${classId}`, {
    headers: { token: getToken() },
  });

  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const UnEnrollClass = async (classId) => {
  const response = await axios.get(`${BaseURLUser}/unEnrollClass/${classId}`, {
    headers: { token: getToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

//If admin then only execute this
// export const Admin = async (...args) => {
//   const AddNewClass = async (data) => {
//     const response = await axios.post(`${BaseURLAdmin}/addNewClass`, data, {
//       headers: { token: getToken() },
//     });
//     if (response.data.status === "success") {
//       return response;
//     } else {
//       return false;
//     }
//   };
// };
