import React, { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import AddNewClass from "./addNewClass";
import LoadingBarComponent from "./../loading/loadingBar";
import ContentStore from "../../stores/ContentStore.js";
import ProfileStore from "../../stores/ProfileStore.js";
import {
  EnrollClass,
  UnEnrollClass,
  DeleteClass,
  UnenrollAsAdmin,
} from "../../api/apiRequest.js";
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import Avatar from "react-avatar";
import {
  CloseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserDeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";

const Classes = ({ DashboardAPIRefresh }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showAddNewClass, setShowAddNewClass] = useState(false);
  const [classEnrollmentSearchValue, setClassEnrollmentSearchValue] =
    useState("");
  const [progress, setProgress] = useState(0);
  const [classes, setClasses] = useState([]);

  const { FetchAllTogether } = ContentStore();
  const { AdminAccessClasses } = ProfileStore();

  const navigate = useNavigate();

  useEffect(() => {
    setClasses(FetchAllTogether);
  }, [FetchAllTogether]);

  const adminAccess = (classId) =>
    AdminAccessClasses && AdminAccessClasses.includes(classId);

  const handleShowAddNewClass = () => {
    setShowAddNewClass(!showAddNewClass);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyClick = async (classId, index) => {
    try {
      await navigator.clipboard.writeText(classId);
      successToast('Class Id Copied!')
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
  };

  const handleClassAction = async (
    classId,
    actionFunc,
    successMessage,
    errorMessage
  ) => {
    setProgress(50);
    try {
      const response = await actionFunc(classId);
      if (response) {
        DashboardAPIRefresh();
        setClassEnrollmentSearchValue("");
        successToast(successMessage);
      } else {
        errorToast("Wrong Class Id");
      }
    } catch (err) {
      errorToast(errorMessage);
    }
    setProgress(100);
  };

  const handleMenuSelection = (selectedOption, classId) => {
    switch (selectedOption) {
      case "1":
        handleShowAddNewClass();
        navigate(`/classes/edit/${classId}`);
        break;
      case "2":
        handleClassAction(
          classId,
          DeleteClass,
          "Class Deleted",
          "Error Deleting Class"
        );
        break;
      case "3":
        handleClassAction(
          classId,
          UnEnrollClass,
          "Class Unenrolled",
          "Error Unenrolling Class"
        );
        break;
      case "4":
        navigate(`/classes/newAdmin/${classId}`);
        break;
      case "5":
        handleClassAction(
          classId,
          UnenrollAsAdmin,
          "Unenrolled as Admin",
          "Error Unenrolling as Admin"
        );
        break;
      default:
        break;
    }
  };

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
    {
      key: "3",
      label: "Unenroll",
      icon: <CloseCircleOutlined />,
    },
    {
      key: "4",
      label: "New Admin",
      icon: <UserAddOutlined />,
    },
    {
      key: "5",
      label: "Unenroll As Admin",
      icon: <UserDeleteOutlined />,
    },
  ];

  return (
    <div className="row">
      <div className="d-flex flex-row align-items-center gap-3 mb-3">
        <LoadingBarComponent progress={progress} />
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Class Id"
            value={classEnrollmentSearchValue}
            onChange={(e) => setClassEnrollmentSearchValue(e.target.value)}
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <button
            onClick={() =>
              handleClassAction(
                classEnrollmentSearchValue,
                EnrollClass,
                "Class Enrolled",
                "Error Enrolling Class"
              )
            }
            className="btn btn-outline-dark"
            type="submit"
          >
            Enroll
          </button>
        </div>

        <button
          className="btn btn-dark rounded-1"
          onClick={handleShowAddNewClass}
        >
          Create
        </button>
      </div>

      <div className={`mb-4`}>
        {showAddNewClass && (
          <AddNewClass
            setProgress={setProgress}
            DashboardAPIRefresh={DashboardAPIRefresh}
            showAddNewClassTrigger={handleShowAddNewClass}
          />
        )}
      </div>

      {classes &&
        classes
          .sort((a, b) => a.classId.localeCompare(b.classId))
          .map((classItem, index) => (
            <div key={classItem.classId} className="col-md-6 mb-4">
              <div className="card shadow-sm border border-light-subtle">
                <div className="card-body">
                  <div className="top-section">
                    {adminAccess(classItem.classId) ? (
                      <p className="card-subtitle badge bg-success">Owner</p>
                    ) : null}
                    <Dropdown
                      className="float-end mb-3 fs-5"
                      menu={{
                        items: adminAccess(classItem.classId)
                          ? items
                          : items.slice(2, 3),
                        selectable: false,
                        onClick: (info) => {
                          handleMenuSelection(info.key, classItem.classId);
                        },
                      }}
                    >
                      <MoreOutlined className="cursorPointer" />
                    </Dropdown>
                  </div>

                  <Avatar
                    name={classItem.className}
                    onClick={() => navigate(`/courses/${classItem.classId}`)}
                    className="bg-primary w-100 rounded-top-2 cursorPointer"
                  />

                  <div className="class-info-section my-3">
                    <p
                      className="d-flex align-items-center gap-2 cursorPointer bg-primary bg-gradient text-light rounded-1 p-1 float-end"
                      onClick={(e) => handleCopyClick(classItem.classId, index)}
                    >
                      <MdOutlineContentCopy />
                      {classItem.classId}
                    </p>
                    <p className="card-title cursorPointer fw-bold fs-6 title-color">
                      <Link
                        className="nav-link"
                        to={`/courses/${classItem.classId}`}
                      >
                        {classItem.className}
                      </Link>
                    </p>
                    <p className="card-subtitle text-muted small">
                      Section: {classItem.section}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      {classes && classes.length === 0 && (
        <p className="text-center">No classes found</p>
      )}
    </div>
  );
};

export default Classes;
