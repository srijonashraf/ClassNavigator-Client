import React, { useEffect, useState } from "react";
import CreateRoutine from "./../components/routine/createRoutine";
import ProfileStore from "../stores/ProfileStore";
import ContentStore from "../stores/ContentStore";
import ViewRoutine from "./../components/routine/viewRoutine";
import AppNavbar from "../components/shared/AppNavbar";
import { useParams } from "react-router-dom";
const RoutinePage = () => {
  const [showCreateRoutine, setShowCreateRoutine] = useState(false);
  const [viewRoutineValue, setViewRoutineValue] = useState(true);
  const [buttonName, setButtonName] = useState("Update Routine");
  const { AdminAccessClasses } = ProfileStore();
  const { FetchRoutineByClassIdRequest, FetchClassByIdRequest } =
    ContentStore();

  const { classId } = useParams();

  const hanleButtonAction = () => {
    setShowCreateRoutine(!showCreateRoutine);
    setViewRoutineValue(!viewRoutineValue);
    setButtonName(
      buttonName === "Update Routine" ? "View Routine" : "Update Routine"
    );
  };

  const adminAccess = (classId) =>
    AdminAccessClasses && AdminAccessClasses.includes(classId);

  useEffect(() => {
    const fetchData = async () => {
      await FetchRoutineByClassIdRequest(classId);
      await FetchClassByIdRequest(classId);
    };
    fetchData();
  }, [classId]);

  return (
    <div>
      <AppNavbar />
      <div className="container mt-3">
        {adminAccess(classId) ? (
          <button
            onClick={hanleButtonAction}
            className="btn btn-dark rounded-1 float-end mb-2"
          >
            {buttonName}
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="container mt-3">
        {viewRoutineValue ? (
          <ViewRoutine
            showCreateRoutine={showCreateRoutine}
            setShowCreateRoutine={setShowCreateRoutine}
          />
        ) : (
          <></>
        )}
        {showCreateRoutine && adminAccess(classId) ? <CreateRoutine /> : <></>}
      </div>
    </div>
  );
};

export default RoutinePage;
