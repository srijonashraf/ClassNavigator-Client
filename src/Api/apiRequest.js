import axios from "axios";
import Cookies from "js-cookie";
import { setAccessToken, setRefreshToken } from "../helper/SessionHelper.js";
import { axiosHeader, getBaseURL } from "../helper/FunctionHelper.js";
import { LogoutWhenSessionExpired } from "./../helper/FunctionHelper";
let BaseURL = getBaseURL();

if (process.env.NODE_ENV !== "production") {
  console.log("BaseURL: ", BaseURL);
}

LogoutWhenSessionExpired();

export const Register = async (data) => {
  const response = await axios.post(`${BaseURL}/registration`, data);
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

//!! This withCredentials: true is not working in production
export const Login = async (data) => {
  const response = await axios.post(`${BaseURL}/login`, data);

  if (response.status === 404) {
    return false;
  }
  if (response.data.status === "success") {
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    return response;
  } else {
    return false;
  }
};

export const Logout = async () => {
  try {
    const response = await axios.get(`${BaseURL}/logout`);
    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};

export const ProfileDetails = async () => {
  const response = await axios.get(`${BaseURL}/profileDetails`, axiosHeader());
  if (response.data.status === "success") {
    return response.data.data;
  } else {
    return false;
  }
};

export const FetchAllTogether = async () => {
  const response = await axios.get(
    `${BaseURL}/fetchAllTogether`,
    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const AddNewClass = async (data) => {
  const response = await axios.post(
    `${BaseURL}/addNewClass`,
    data,
    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const FetchClassesById = async (classId) => {
  const response = await axios.get(
    `${BaseURL}/fetchClassesById/${classId}`,
    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const EditClassDetails = async (data, classId) => {
  const response = await axios.post(
    `${BaseURL}/editClassDetails/${classId}`,
    data,

    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const EnrollClass = async (classId) => {
  const response = await axios.get(
    `${BaseURL}/enrollClass/${classId}`,
    axiosHeader()
  );

  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const UnEnrollClass = async (classId) => {
  const response = await axios.get(
    `${BaseURL}/unEnrollClass/${classId}`,
    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const DeleteClass = async (classId) => {
  const response = await axios.get(
    `${BaseURL}/deleteClass/${classId}`,
    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const AddNewCourses = async (data, classId) => {
  const response = await axios.post(
    `${BaseURL}/addCourse/${classId}`,
    data,
    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const FetchCoursesById = async (classId, courseId) => {
  const response = await axios.get(
    `${BaseURL}/fetchCoursesById/${classId}/${courseId}`,
    axiosHeader()
  );

  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const EditCourseDetails = async (data, classId, courseId) => {
  const response = await axios.post(
    `${BaseURL}/${classId}/editCourseDetails/${courseId}`,
    data,
    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const DeleteCourse = async (classId, courseId) => {
  const response = await axios.get(
    `${BaseURL}/${classId}/deleteCourse/${courseId}`,
    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const AddNewTask = async (data, classId, courseId) => {
  const response = await axios.post(
    `${BaseURL}/${classId}/${courseId}/addTask`,
    data,
    axiosHeader()
  );

  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const FetchTaskById = async (classId, courseId, taskId) => {
  const response = await axios.get(
    `${BaseURL}/fetchTasksById/${classId}/${courseId}/${taskId}`,
    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const EditTaskDetails = async (data, classId, courseId, taskId) => {
  const response = await axios.post(
    `${BaseURL}/${classId}/${courseId}/editTaskDetails/${taskId}`,
    data,
    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const DeleteTask = async (classId, courseId, taskId) => {
  const response = await axios.get(
    `${BaseURL}/${classId}/${courseId}/deleteTask/${taskId}`,
    axiosHeader()
  );

  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const TaskCompletion = async (classId, courseId, taskId) => {
  const response = await axios.get(
    `${BaseURL}/taskCompletionByUser/${classId}/${courseId}/${taskId}`,
    axiosHeader()
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const AddNewAdmin = async (classId, data) => {
  const response = await axios.post(
    `${BaseURL}/addNewAdmin/${classId}`,
    { newAdminEmails: data },
    axiosHeader()
  );

  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};
