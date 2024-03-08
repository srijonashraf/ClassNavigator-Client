import axios from "axios";
import Cookies from "js-cookie";
import { setAccessToken, setRefreshToken } from "../helper/SessionHelper.js";
import {
  LogoutWhenSessionExpired,
  axiosHeader,
  getBaseURL,
} from "../helper/FunctionHelper.js";
let BaseURL = getBaseURL();

if (process.env.NODE_ENV !== "production") {
  console.log("BaseURL: ", BaseURL);
}

LogoutWhenSessionExpired();

export const Register = async (data) => {
  try {
    const response = await axios.post(`${BaseURL}/registration`, data);
    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in registration");
  }
};

//!! This withCredentials: true is not working in production
export const Login = async (data) => {
  try {
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
  } catch (error) {
    console.log("Error in Login: ", error);
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
  try {
    const response = await axios.get(
      `${BaseURL}/profileDetails`,
      axiosHeader()
    );
    console.log(response);
    if (response.data.status === "success") {
      return response.data.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Profile Details Error: ", error);
  }
};

export const FetchAllTogether = async () => {
  try {
    const response = await axios.get(
      `${BaseURL}/fetchAllTogether`,
      axiosHeader()
    );
    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Fetch All Together Error: ", error);
  }
};

export const AddNewClass = async (data) => {
  try {
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
  } catch (error) {
    console.error("Add New Class Error: ", error);
  }
};

export const FetchClassesById = async (classId) => {
  try {
    const response = await axios.get(
      `${BaseURL}/fetchClassesById/${classId}`,
      axiosHeader()
    );
    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Fetch Classes By Id Error: ", error);
  }
};

export const EditClassDetails = async (data, classId) => {
  try {
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
  } catch (error) {
    console.error("Edit Class Details Error: ", error);
  }
};

export const EnrollClass = async (classId) => {
  try {
    const response = await axios.get(
      `${BaseURL}/enrollClass/${classId}`,
      axiosHeader()
    );

    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Enroll Class Error: ", error);
  }
};

export const UnEnrollClass = async (classId) => {
  try {
    const response = await axios.get(
      `${BaseURL}/unEnrollClass/${classId}`,
      axiosHeader()
    );
    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("UnEnroll Class Error: ", error);
  }
};

export const DeleteClass = async (classId) => {
  try {
    const response = await axios.get(
      `${BaseURL}/deleteClass/${classId}`,
      axiosHeader()
    );
    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Delete Class Error: ", error);
  }
};

export const AddNewCourses = async (data, classId) => {
  try {
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
  } catch (error) {
    console.error("Add New Course Error: ", error);
  }
};

export const FetchCoursesById = async (classId, courseId) => {
  try {
    const response = await axios.get(
      `${BaseURL}/fetchCoursesById/${classId}/${courseId}`,
      axiosHeader()
    );

    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Fetch Courses By Id Error: ", error);
  }
};

export const EditCourseDetails = async (data, classId, courseId) => {
  try {
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
  } catch (error) {
    console.error("Edit Course Details Error: ", error);
  }
};

export const DeleteCourse = async (classId, courseId) => {
  try {
    const response = await axios.get(
      `${BaseURL}/${classId}/deleteCourse/${courseId}`,
      axiosHeader()
    );
    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Delete Course Error: ", error);
  }
};

export const AddNewTask = async (data, classId, courseId) => {
  try {
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
  } catch (error) {
    console.error("Add New Task Error: ", error);
  }
};

export const FetchTaskById = async (classId, courseId, taskId) => {
  try {
    const response = await axios.get(
      `${BaseURL}/fetchTasksById/${classId}/${courseId}/${taskId}`,
      axiosHeader()
    );
    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Fetch Task By Id Error: ", error);
  }
};

export const EditTaskDetails = async (data, classId, courseId, taskId) => {
  try {
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
  } catch (error) {
    console.error("Edit Task Details Error: ", error);
  }
};

export const DeleteTask = async (classId, courseId, taskId) => {
  try {
    const response = await axios.get(
      `${BaseURL}/${classId}/${courseId}/deleteTask/${taskId}`,
      axiosHeader()
    );

    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Delete Task Error: ", error);
  }
};

export const TaskCompletion = async (classId, courseId, taskId) => {
  try {
    const response = await axios.get(
      `${BaseURL}/taskCompletionByUser/${classId}/${courseId}/${taskId}`,
      axiosHeader()
    );
    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Task Completion Error: ", error);
  }
};

export const AddNewAdmin = async (classId, data) => {
  try {
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
  } catch (error) {
    console.error("Add New Admin Error: ", error);
  }
};

export const UnenrollAsAdmin = async (classId) => {
  try {
    const response = await axios.get(
      `${BaseURL}/unEnrollAsAdmin/${classId}`,
      axiosHeader()
    );

    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Unenroll As Admin Error: ", error);
  }
};

export const RemoveParticipant = async (classId, body) => {
  try {
    const response = await axios.post(
      `${BaseURL}/removeParticipant/${classId}`,
      { email: body },
      axiosHeader()
    );
    if (response.data.status === "success") {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Remove Participant Error: ", error);
  }
};
