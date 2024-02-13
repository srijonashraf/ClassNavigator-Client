import axios from "axios";
import Cookies from "js-cookie";
import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  clearSessions,
} from "../helper/sessionHelper.js";
let BaseURL = "";

if (process.env.NODE_ENV === "production") {
  BaseURL = "https://classnavigator-srijonashraf.vercel.app/api/v1";
} else {
  BaseURL = "http://localhost:4500/api/v1";
}

// Now you can use the BaseURL in your application
// console.log("Base URL:", BaseURL);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      clearSessions();
    }
    return Promise.reject(error);
  }
);

const AutomaticallyRefreshToken = async () => {
  const response = await axios.post(`${BaseURL}/refreshToken`, {
    refreshToken: Cookies.get("refreshToken"),
  });

  if (response.data.status === "success") {
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
  }
}

setInterval(AutomaticallyRefreshToken, 15 * 60 * 1000);

export const Login = async (data) => {
  const response = await axios.post(`${BaseURL}/login`, data);
  if (response.data.status === "success") {
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    Cookies.set("accessToken", response.data.accessToken);
    return response;
  } else {
    return false;
  }
};

export const Register = async (data) => {
  const response = await axios.post(`${BaseURL}/registration`, data);
  if (response.data.status === "success") {
    // console.log(response.data.data);
    return response;
  } else {
    return false;
  }
};

export const ProfileDetails = async () => {
  const response = await axios.get(`${BaseURL}/profileDetails`, {
    headers: { token: getAccessToken() },
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
    headers: { token: getAccessToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const AddNewClass = async (data) => {
  const response = await axios.post(`${BaseURL}/addNewClass`, data, {
    headers: { token: getAccessToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const FetchClassesById = async (classId) => {
  const response = await axios.get(`${BaseURL}/fetchClassesById/${classId}`, {
    headers: { token: getAccessToken() },
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
      headers: { token: getAccessToken() },
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
    headers: { token: getAccessToken() },
  });

  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const UnEnrollClass = async (classId) => {
  const response = await axios.get(`${BaseURL}/unEnrollClass/${classId}`, {
    headers: { token: getAccessToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const DeleteClass = async (classId) => {
  const response = await axios.get(`${BaseURL}/deleteClass/${classId}`, {
    headers: { token: getAccessToken() },
  });
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};

export const AddNewCourses = async (data, classId) => {
  const response = await axios.post(`${BaseURL}/addCourse/${classId}`, data, {
    headers: { token: getAccessToken() },
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
      headers: { token: getAccessToken() },
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
      headers: { token: getAccessToken() },
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
      headers: { token: getAccessToken() },
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
      headers: { token: getAccessToken() },
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
      headers: { token: getAccessToken() },
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
      headers: { token: getAccessToken() },
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
      headers: { token: getAccessToken() },
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
      headers: { token: getAccessToken() },
    }
  );

  // console.log('From ApiRequest:',response);
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};
