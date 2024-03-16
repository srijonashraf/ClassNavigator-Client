import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingBarComponent from "./../loading/loadingBar";
import {
  DeleteTask,
  FetchCoursesById,
  TaskCompletion,
} from "../../api/apiRequest.js";
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import ContentStore from "../../stores/ContentStore.js";
import ProfileStore from "../../stores/ProfileStore.js";
import Avatar from "react-avatar";
import AddNewTasks from "./addNewTasks";
import { LuCalendarCheck } from "react-icons/lu";
import { IoTimeSharp } from "react-icons/io5";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import MoonLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

const Tasks = ({ TaskPageApiRefresh }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [showAddNewTask, setShowAddNewTask] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [change, setChange] = useState("");
  const [taskLoadingSpinner, setTaskLoadingSpinner] = useState(null);

  const {
    FetchAllTasksByCourseRequest,
    FetchAllTasksByCourse,
    FetchCompletedTaskByCourseRequest,
    FetchUnCompletedTaskByCourseRequest,
  } = ContentStore();
  const { AdminAccessClasses, completedTasks, ProfileDetailsRequest } =
    ProfileStore();
  const { classId } = useParams();
  const { courseId } = useParams();

  const taskIdFromURL = useLocation().search.split("=")[1];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchCoursesById(classId, courseId);
        setCourseData(res.data.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchData();
  }, [classId, courseId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await FetchAllTasksByCourseRequest(classId, courseId);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
        errorToast("Error fetching data");
      }
    };

    fetchData();
  }, [classId, FetchAllTasksByCourseRequest, change]);

  useEffect(() => {
    setTasks(FetchAllTasksByCourse || null);
  }, [FetchAllTasksByCourse, AdminAccessClasses, change]);

  useEffect(() => {
    const handleScroll = () => {
      if (taskIdFromURL) {
        const target = document.getElementById(taskIdFromURL);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });

          // Set a timeout to add the blink class after 500 milliseconds
          setTimeout(() => {
            target.classList.add("blink_me");

            // Set a timeout to remove the blink class after 1.5 seconds (adjust as needed)
            setTimeout(() => {
              target.classList.remove("blink_me");
            }, 1500); // 1500 milliseconds = 1.5 seconds
          }, 500); // 500 milliseconds = 0.5 seconds
        }
      }
    };

    handleScroll();
  });

  const items = [
    {
      key: "1",
      label: "Edit",
      icon: <EditOutlined />,
    },
    {
      key: "2",
      label: "Delete",
      icon: <DeleteOutlined />,
    },
  ];

  const adminAccess = (classId) =>
    AdminAccessClasses && AdminAccessClasses.includes(classId);
  const completed = (TaskId) =>
    completedTasks && completedTasks.includes(TaskId);

  const handleTaskCompletion = async (classId, courseId, taskId) => {
    setTaskLoadingSpinner(taskId);
    const response = await TaskCompletion(classId, courseId, taskId);
    if (response) {
      await ProfileDetailsRequest();
    }
    setTaskLoadingSpinner(null);
  };

  const handleFilterTaskByCompletion = async (value) => {
    if (value === "all") {
      await FetchAllTasksByCourseRequest(classId, courseId);
    } else if (value === "done") {
      await FetchCompletedTaskByCourseRequest(classId, courseId);
    } else if (value === "undone") {
      await FetchUnCompletedTaskByCourseRequest(classId, courseId);
    }
  };

  const handleShowAddNewTask = () => {
    setShowAddNewTask(!showAddNewTask);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleDeleteTask = async (classId, courseId, taskId) => {
    setProgress(50);
    try {
      const response = await DeleteTask(classId, courseId, taskId);
      if (response) {
        TaskPageApiRefresh();
        setChange(new Date().getTime());
        successToast("Task Deleted");
      } else {
        errorToast("Failed to Task Course");
      }
    } catch (err) {
      errorToast("Error Deleting Task");
    } finally {
      setProgress(100);
    }
  };

  const handleMenuSelection = (selectedOption, classId, courseId, taskId) => {
    switch (selectedOption) {
      case "1":
        handleShowAddNewTask();
        navigate(`/tasks/${classId}/${courseId}/edit/${taskId}`);
        break;
      case "2":
        handleDeleteTask(classId, courseId, taskId);
        break;
      default:
        break;
    }
  };

  function formatDate(date) {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "2-digit",
    };
    return date.toLocaleDateString("en-GB", options);
  }

  function formatTime(timeString) {
    const date = new Date(`2000-01-01T${timeString}`);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  }

  const renderCountdown = (task) => {
    const currentTime = new Date();
    const taskTime = new Date(task.date + " " + task.time);
    const remainingTime = Math.max(
      0,
      (taskTime.getTime() - currentTime.getTime()) / 1000
    );
    const days = Math.floor(remainingTime / (3600 * 24));
    const hours = Math.floor((remainingTime % (3600 * 24)) / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);

    return (
      <div>
        {remainingTime > 0 ? (
          <div className="d-flex justify-content-between">
            <div>
              <span className="fw-bold">Time Left: </span>
              {days > 0 && <span className="fw-bold">{days}d </span>}
              <span
                className={`fw-bold ${
                  days > 0 || hours > 1 ? "text-dark" : "text-danger"
                }`}
              >
                {hours}h {minutes}m
              </span>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const renderCourseCards = () => {
    return (
      tasks &&
      tasks
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((task, index) => (
          // Todo Sort Pending wise
          <div key={task._id} className="col-md-6 mb-4">
            <div className="card shadow-sm border border-light-subtle">
              <div
                id={task._id}
                className={`card-body ${
                  new Date(task.date + " " + task.time) < new Date()
                    ? "bg-expired"
                    : ""
                }`}
              >
                {adminAccess(task.classId) && (
                  <Dropdown
                    className="float-end mb-3 fs-5"
                    menu={{
                      items,
                      selectable: false,
                      onClick: (info) => {
                        handleMenuSelection(
                          info.key,
                          task.classId,
                          task.courseId,
                          task._id
                        );
                      },
                    }}
                  >
                    <MoreOutlined className="cursorPointer" />
                  </Dropdown>
                )}
                {/* When task is marked as Done countdown will not show */}
                {!completedTasks.includes(task._id) ? (
                  renderCountdown(task)
                ) : (
                  <></>
                )}

                <div className="d-flex justify-content-between align-items-baseline my-3">
                  <button
                    onClick={() =>
                      handleTaskCompletion(
                        task.classId,
                        task.courseId,
                        task._id
                      )
                    }
                    className="btn btn-outline-secondary btn-sm rounded-1 d-flex gap-2"
                  >
                    <MoonLoader
                      color={"#adadad"}
                      loading={task?._id === taskLoadingSpinner ? true : false}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    {completed(task._id) ? "Done" : "Mark as Done"}
                  </button>

                  {/* When task is marked as Done task status will not show */}
                  {!completedTasks.includes(task._id) ? (
                    <p className="btn btn-danger badge">{task?.status}</p>
                  ) : (
                    <></>
                  )}
                </div>
                <Avatar
                  name={task.type}
                  className="bg-warning card-img-top w-100 rounded-top-2 mb-3"
                />
                <div className="mb-2">
                  <button className="btn btn-primary btn-sm rounded-1 float-end">
                    {task.type}
                  </button>
                  <button className="btn btn-secondary btn-sm rounded-1">
                    Group: {task.group}
                  </button>
                </div>
                <p className="card-title fw-bold fs-5 title-color">
                  {task.taskTitle}
                </p>
                <div className="card-subtitle mb-2 text-muted small">
                  <span>
                    <u>Description:</u>
                  </span>
                  <div>
                    {showFullDescription ? (
                      <>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: task.taskDescription,
                          }}
                        ></div>
                        <span
                          onClick={toggleDescription}
                          className="text-secondary cursorPointer"
                        >
                          See Less
                        </span>
                      </>
                    ) : (
                      <div className="d-flex gap-1">
                        <div
                          className="m-less"
                          dangerouslySetInnerHTML={{
                            __html: task.taskDescription.substring(0, 100),
                          }}
                        ></div>
                        {task.taskDescription.length > 100 && (
                          <span
                            onClick={toggleDescription}
                            className="text-primary cursorPointer"
                          >
                            See More...
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <p
                  className={`btn badge rounded-1 float-end ${
                    task.mode === "Online" ? "btn-info" : "btn-secondary"
                  }`}
                >
                  • {task.mode}
                </p>
                <div className="d-flex flex-row gap-2">
                  <p className="fw-bold d-flex align-items-center gap-1">
                    <LuCalendarCheck className="text-primary fs-5" />{" "}
                    {formatDate(new Date(task.date))}
                  </p>
                  <p className="fw-bold d-flex align-items-center gap-1">
                    <IoTimeSharp className="text-primary fs-5" />{" "}
                    {formatTime(task.time)}
                  </p>
                </div>
                <footer className="sm-text float-end mt-3 text-muted">
                  Updated:{" "}
                  {task.editedAt
                    ? new Date(task.editedAt).toLocaleString("en-AU")
                    : "N/A"}
                </footer>
              </div>
            </div>
          </div>
        ))
    );
  };

  return (
    <div className="row">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/dashboard")}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate(`/courses/${classId}`)}>
          Courses
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{courseData?.courseName}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="">
        <LoadingBarComponent progress={progress} />
        {adminAccess(classId) && (
          <button
            className="btn btn-dark rounded-1"
            onClick={handleShowAddNewTask}
          >
            {" "}
            Add New Tasks
          </button>
        )}

        {/* <h4 className='text-center my-2'>{courseData?.courseName}</h4> */}

        <select
          name="taskStatus"
          onChange={(e) => handleFilterTaskByCompletion(e.target.value)}
          className="form-select mb-2 form-select-sm w-25 me-2 float-end"
          defaultValue="all"
        >
          <option value="done">Complete</option>
          <option value="undone">In Complete</option>
          <option value="all">All</option>
        </select>

        <div className={`mb-4`}>
          {showAddNewTask && (
            <AddNewTasks
              ShowAddNewTaskTrigger={handleShowAddNewTask}
              setProgress={setProgress}
              TaskApiRefresh={() => setChange(new Date().getTime())}
            />
          )}
        </div>
      </div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : tasks && tasks.length === 0 ? (
        <p className="text-center">No Tasks Found!</p>
      ) : (
        renderCourseCards()
      )}
    </div>
  );
};

export default Tasks;
