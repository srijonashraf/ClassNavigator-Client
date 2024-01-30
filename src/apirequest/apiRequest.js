import axios from "axios";
import { setToken, getToken } from "../helper/sessionHelper.js";
let BaseURL = "";

if (process.env.NODE_ENV === "production") {
  BaseURL = "https://classnavigator-srijonashraf.vercel.app/api/v1";
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
    // console.log(response.data.data);
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

export const FetchClassesById = async (classId) => {
  const response = await axios.get(`${BaseURL}/fetchClassesById/${classId}`, {
    headers: { token: getToken() },
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
      headers: { token: getToken() },
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
};

export const FetchCoursesById = async (classId, courseId) => {
  const response = await axios.get(
    `${BaseURL}/fetchCoursesById/${classId}/${courseId}`,
    {
      headers: { token: getToken() },
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
      headers: { token: getToken() },
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
      headers: { token: getToken() },
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
      headers: { token: getToken() },
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
      headers: { token: getToken() },
    }
  );
  if (response.data.status === "success") {

    return response;
  } else {
    return false;
  }
}

export const EditTaskDetails = async (data, classId, courseId, taskId) => {
  const response = await axios.post(
    `${BaseURL}/${classId}/${courseId}/editTaskDetails/${taskId}`,
    data,
    {
      headers: { token: getToken() },
    }
  );
  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
}

export const DeleteTask = async (classId, courseId, taskId) => {
  const response = await axios.get(
    `${BaseURL}/${classId}/${courseId}/deleteTask/${taskId}`,
    {
      headers: { token: getToken() },
    }
  );

  if (response.data.status === "success") {
    return response;
  } else {
    return false;
  }
};
