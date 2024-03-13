import React from "react";
import ContentStore from "../../stores/ContentStore";
import { Table } from "antd";
import { DeleteRoutineByDay } from "../../api/apiRequest";
import { useParams } from "react-router-dom";
import { errorToast, successToast } from "../../helper/ToasterHelper";
import ProfileStore from "../../stores/ProfileStore";

const ViewRoutine = () => {
  const {
    FetchRoutineByClassId,
    FetchRoutineByClassIdRequest,
    FetchClassById,
  } = ContentStore();
  const { AdminAccessClasses } = ProfileStore();

  const { classId } = useParams();

  const adminAccess = (classId) =>
    AdminAccessClasses && AdminAccessClasses.includes(classId);

  const handleDeleteDay = async (day) => {
    try {
      const response = await DeleteRoutineByDay(classId, day);
      if (!response) {
        errorToast("Something went wrong");
      } else {
        await FetchRoutineByClassIdRequest(classId);
        successToast("Day deleted successfully");
      }
    } catch (err) {
      errorToast("Something went wrong");
    }
  };

  const daysOrder = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];

  const columns = [
    { title: "Day", dataIndex: "day", key: "day" },
    {
      title: "Classes",
      dataIndex: "classes",
      key: "classes",
      render: (classes, record) => (
        <ul>
          {classes.map((classItem, index) => (
            <li key={index} className={`class-row-${index}`}>
              <div className="mb-2">
                <p className="fw-bold mb-2 fs-6">
                  {`${new Date(classItem.time[0]).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })} - ${new Date(
                    classItem.time[classItem.time.length - 1]
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}`}
                </p>
                <p className="">{classItem.courseName}</p>
                <p className="fw-bold">
                  {classItem.courseCode} ({FetchRoutineByClassId?.section})
                </p>
                <p className="mb-0">{classItem.teacher}</p>
                <p className="mb-0 fw-bold">{classItem.room}</p>
              </div>
            </li>
          ))}
          {adminAccess(classId) && (
            <button
              className="btn btn-danger rounded-1 btn-sm mt-2"
              onClick={() => handleDeleteDay(record.day)}
            >
              Delete Day
            </button>
          )}
        </ul>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={
          FetchRoutineByClassId?.routine
            ? FetchRoutineByClassId.routine
                .sort((a, b) => {
                  const dayAIndex = daysOrder.indexOf(a.day);
                  const dayBIndex = daysOrder.indexOf(b.day);
                  return dayAIndex - dayBIndex;
                })
                .map((day, index) => ({
                  ...day,
                  key: index,
                }))
            : []
        }
        pagination={false}
      />
    </>
  );
};

export default ViewRoutine;
