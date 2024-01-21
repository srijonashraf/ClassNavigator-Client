import React, { useState } from 'react';
import { MdOutlineContentCopy } from "react-icons/md";
import FaButton from './../buttons/fab';
import { MdLibraryAdd } from "react-icons/md";
import AddNewClass from './addNewClass';
import useAuthAdmin from './../auth/useAuthAdmin';
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import { EnrollClass, UnEnrollClass } from '../../apirequest/apiRequest';
import { MdDeleteOutline } from "react-icons/md";
import { MdEditCalendar } from "react-icons/md";


const Classes = ({ useEffectTrigger, classes }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showAddNewClass, setShowAddNewClass] = useState(false);
  const [classEnrollmentSearchValue, setClassEnrollmentSearchValue] = useState('');
  const handleShowAddNewClass = () => {
    setShowAddNewClass(!showAddNewClass);
  }

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

  const handleClassEnrollment = async (classId) => {
    try {
      console.log(classId);
      const response = await EnrollClass(classId);
      if (response) {
        useEffectTrigger();
        successToast('Class Enrolled');
      }
      else {
        errorToast('Wrong Class Id');
      }
    } catch (err) {
      errorToast('Error Enrolling Class');
    }
  }

  const handleDeleteClass = async (classId) => {
    try {

      const response = await UnEnrollClass(classId);

      if (response) {
        useEffectTrigger();
        successToast('Class Deleted');
      }
      else {
        errorToast('Wrong Class Id');
      }
    } catch (err) {
      errorToast('Error Deleting Class');
    }
  }

  return (
    <div className="row">
      <div className='d-flex flex-row align-items-center gap-3'>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Course Id"
            value={classEnrollmentSearchValue}
            onChange={(e) => setClassEnrollmentSearchValue(e.target.value)}
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <button
            onClick={() => handleClassEnrollment(classEnrollmentSearchValue)}
            className="btn btn-outline-dark"
            type="submit"
          >
            Enroll
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className='my-3'>
          {useAuthAdmin() ? <div onClick={handleShowAddNewClass}>
            <FaButton element={<MdLibraryAdd />} color={'dark'} />
          </div> : <></>}
        </div>
      </div>

      <div className={`mb-4 ${showAddNewClass ? 'animated fadeInRight' : 'animated fadeOut'}`}>
        {showAddNewClass && <AddNewClass useEffectTrigger={useEffectTrigger} />}
      </div>
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
              <div className="d-flex align-items-center gap-2">
                <MdDeleteOutline onClick={() => handleDeleteClass(classItem.classId)} className='fs-4 text-danger cursorPointer' />
                {useAuthAdmin() ? <div ><MdEditCalendar className='fs-5 text-primary cursorPointer' /></div> : <></>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;
