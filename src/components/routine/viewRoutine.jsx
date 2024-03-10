import React, { useEffect, useState } from "react";
import ContentStore from "../../stores/ContentStore";
const ViewRoutine = () => {
  const { FetchRoutineByClassId } = ContentStore();
  return (
    <>
      <div>
        <h2>Class Routine</h2>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Day</th>
              <th>Classes</th>
            </tr>
          </thead>
          <tbody>
            {FetchRoutineByClassId?.routine?.map((day) => (
              <tr key={day._id}>
                <td>{day.day}</td>
                <td>
                  <ul>
                    {day.classes.map((classItem) => (
                      <li key={classItem._id}>
                        <strong>{classItem.courseName}</strong> (
                        {classItem.courseCode}) - Teacher: {classItem.teacher} -
                        Room: {classItem.room} - Time: {classItem.time}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewRoutine;
