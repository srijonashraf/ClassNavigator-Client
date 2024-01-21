import React, { useState } from 'react';
import { MdOutlineContentCopy } from "react-icons/md";

const Classes = ({ classes }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyClick = async (classId, index) => {
    try {
      await navigator.clipboard.writeText(classId);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 1000);
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
  };

  return (
    <div className="row">
      {classes.map((classItem, index) => (
        <div key={classItem.classId} className="col-md-6 mb-4">
          <div className="card shadow-sm border border-light-subtle">
            <div className="card-body">
              <p
                className="card-text d-flex align-items-center gap-2 float-end cursorPointer bg-primary bg-gradient text-light rounded-1 p-2"
                onClick={(e) => handleCopyClick(classItem.classId, index)}
              >
                <MdOutlineContentCopy />
                {classItem.classId}
                {copiedIndex === index && (
                  <span className='float-end badge' style={{ fontSize: '12px' }}>Copied!</span>
                )}
              </p>
              <h5 className="card-title">{classItem.className}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Section: {classItem.section}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;
