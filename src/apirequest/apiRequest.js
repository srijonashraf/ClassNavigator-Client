import axios from "axios";
import { setToken, getToken } from "../helper/sessionHelper.js";
let BaseURL = "";

if (process.env.NODE_ENV === "production") {
  BaseURL = "https://class-navigator.onrender.com/api/v1";
} else {
  BaseURL = "http://localhost:4500/api/v1";
}

// Now you can use the BaseURL in your application
console.log("Base URL:", BaseURL);

export const Login = async (data) => {
  const response = await axios.post(`${BaseURL}/login`, data);
  if (response.data.status === "success") {
    setToken(response.data.token);
    return response;
  } else {
    return false;
  }
};

export const Register = async (data) => {
  const response = await axios.post(`${BaseURL}/registration`, data);
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
    // console.log(response.data.data);
    return response.data.data;
  } else {
    return false;
  }
};

export const FetchAllTogether = async () => {
  const response = await axios.get(`${BaseURL}/fetchAllTogether`, {
    headers: { token: getToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const AddNewClass = async (data) => {
  const response = await axios.post(`${BaseURL}/addNewClass`, data, {
    headers: { token: getToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const EnrollClass = async (classId) => {
  const response = await axios.get(`${BaseURL}/enrollClass/${classId}`, {
    headers: { token: getToken() },
  });

  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const UnEnrollClass = async (classId) => {
  const response = await axios.get(`${BaseURL}/unEnrollClass/${classId}`, {
    headers: { token: getToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const DeleteClass = async (classId) => {
  const response = await axios.get(`${BaseURL}/deleteClass/${classId}`, {
    headers: { token: getToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};


export const AddNewCourses = async (data, classId) => {
  const response = await axios.post(`${BaseURL}/addCourse/${classId}`, data, {
    headers: { token: getToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
}