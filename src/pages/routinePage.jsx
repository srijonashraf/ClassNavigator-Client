import React from "react";
import CreateRoutine from "./../components/routine/createRoutine";
import ProfileStore from "../stores/ProfileStore";
import ViewRoutine from "./../components/routine/viewRoutine";
import AppNavbar from "../components/shared/AppNavbar";
const RoutinePage = () => {
  const { AdminAccessClasses } = ProfileStore();
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
