import axios from "axios";
import Cookies from "js-cookie";
import { setAccessToken, setRefreshToken } from "../helper/sessionHelper";
let BaseURL = "";

if (process.env.NODE_ENV === "production") {
  BaseURL = "https://classnavigator-srijonashraf.vercel.app/api/v1";
} else {
  BaseURL = "http://localhost:4500/api/v1";
}

// Now you can use the BaseURL in your application
// console.log("Base URL:", BaseURL);

// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error.response && error.response.status === 401) {
//       clearSessions();
//     }
//     return Promise.reject(error);
//   }
// );

const AutoRefreshTokens = async () => {
  if (Cookies.get("refreshToken") && Cookies.get("accessToken")) {
    await axios.post(`${BaseURL}/refreshToken`, {
      refreshToken: Cookies.get("refreshToken"),
    });
  }
};

//Token will refresh after every 15 minutes
setInterval(AutoRefreshTokens, 15 * 60 * 1000);

export const Register = async (data) => {
  const response = await axios.post(`${BaseURL}/registration`, data);
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const Login = async (data) => {
  const response = await axios.post(`${BaseURL}/login`, data, {
    withCredentials: true,
  });

  if (response.status === 404) {
    return false;
  }
  if (response.data.status === "success") {
    Cookies.set("refreshToken", response.data.data.refreshToken);
    Cookies.set("accessToken", response.data.data.accessToken);
    setAccessToken(response.data.data.accessToken);
    setRefreshToken(response.data.data.refreshToken);
    return response;
  } else {
    return false;
  }
};

export const Logout = async () => {
  const response = await axios.post(`${BaseURL}/logout`, {
    withCredentials: true,
  });
  console.log(response);
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const ProfileDetails = async () => {
  const response = await axios.get(`${BaseURL}/profileDetails`, {
    withCredentials: true,
  });
  if (response.data.status === "success") {
    return response.data.data;
  } else {
    return false;
  }
};

export const FetchAllTogether = async () => {
  const response = await axios.get(`${BaseURL}/fetchAllTogether`, {
    withCredentials: true,
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const AddNewClass = async (data) => {
  const response = await axios.post(`${BaseURL}/addNewClass`, data, {
    withCredentials: true,
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const FetchClassesById = async (classId) => {
  const response = await axios.get(`${BaseURL}/fetchClassesById/${classId}`, {
    withCredentials: true,
  });
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
    {
      withCredentials: true,
    }
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const EnrollClass = async (classId) => {
  const response = await axios.get(`${BaseURL}/enrollClass/${classId}`, {
    withCredentials: true,
  });

  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const UnEnrollClass = async (classId) => {
  const response = await axios.get(`${BaseURL}/unEnrollClass/${classId}`, {
    withCredentials: true,
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const DeleteClass = async (classId) => {
  const response = await axios.get(`${BaseURL}/deleteClass/${classId}`, {
    withCredentials: true,
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const AddNewCourses = async (data, classId) => {
  const response = await axios.post(`${BaseURL}/addCourse/${classId}`, data, {
    withCredentials: true,
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const FetchCoursesById = async (classId, courseId) => {
  const response = await axios.get(
    `${BaseURL}/fetchCoursesById/${classId}/${courseId}`,
    {
      withCredentials: true,
    }
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
    {
      withCredentials: true,
    }
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
    {
      withCredentials: true,
    }
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
    {
      withCredentials: true,
    }
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
    {
      withCredentials: true,
    }
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
    {
      withCredentials: true,
    }
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
    {
      withCredentials: true,
    }
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
    {
      withCredentials: true,
    }
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};
