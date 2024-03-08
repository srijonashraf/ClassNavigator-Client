import React, { useEffect } from "react";
import CreateRoutine from "./../components/routine/createRoutine";
import ProfileStore from "../stores/ProfileStore";
import ContentStore from "../stores/ContentStore";
import ViewRoutine from "./../components/routine/viewRoutine";
import AppNavbar from "../components/shared/AppNavbar";
import { useParams } from "react-router-dom";
const RoutinePage = () => {
  const { AdminAccessClasses } = ProfileStore();
  const { FetchRoutineByClassIdRequest } = ContentStore();

  const { classId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await FetchRoutineByClassIdRequest(classId);
    };
    fetchData();
  }, [classId]);

  return (
    <div>
      <AppNavbar />
      <div className="container mt-3">
        <CreateRoutine />
        <ViewRoutine />
      </div>
    </div>
  );
};

export default RoutinePage;
