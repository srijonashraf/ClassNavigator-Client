import React, { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from "react-icons/md";
import FaButton from './../buttons/fab';
import { MdLibraryAdd } from "react-icons/md";
import AddNewClass from './addNewClass';
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import { EnrollClass, UnEnrollClass, DeleteClass } from '../../apirequest/apiRequest';
import { MdDeleteOutline } from "react-icons/md";
import { MdEditCalendar } from "react-icons/md";
import LoadingBarComponent from './../loading/loadingBar';


const Classes = ({ useEffectTrigger, classes, adminAccessClasses }) => {
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [showAddNewClass, setShowAddNewClass] = useState(false);
    const [classEnrollmentSearchValue, setClassEnrollmentSearchValue] = useState('');
    const [adminClasses, setAdminClasses] = useState(false);
    const [progress, setProgress] = useState(0);

    // console.log(`Replying from Classes component ${adminAccessClasses}`);
    // console.log(`Replying from Classes component ${adminAccessClasses[0]}`);
    // console.log(typeof adminAccessClasses);
    // console.log(classes.map((classId) => classId.classId));

    //!When adding new class, also add the admin checking useEffect should get triggered and its functionality should be added. Now it is not working.

    useEffect(() => {
        const admin = async () => {
            const adminAccessValues = Object.values(adminAccessClasses);

            const classIds = classes.map((classItem) => classItem.classId); //This classIds are props from parent component

            const matchedClassIds = classIds.filter((classId) =>
                adminAccessValues.includes(classId)
            );

            setAdminClasses(matchedClassIds); // Will set an array of matched class IDs
            return matchedClassIds; // Return the array of matched class IDs
        };

        admin();
    }, [classes, adminAccessClasses]);


    const adminAccess = (classId) => {
        if (adminClasses.includes(classId)) {
            return true;
        }
        return false;
    }


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
        setProgress(50);
        try {
            const response = await EnrollClass(classId);
            // setProgress(50);
            if (response) {
                useEffectTrigger();
                successToast('Class Enrolled');
            } else {
                errorToast('Wrong Class Id');
                setProgress(0);
            }
        } catch (err) {
            errorToast('Error Enrolling Class');
        }
        setProgress(100);
    }

    const handleDeleteClass = async (classId) => {
        setProgress(50);
        try {
            const response = await DeleteClass(classId);
            if (response) {
                useEffectTrigger();
                successToast('Class Deleted');
            } else {
                errorToast('Wrong Class Id');
            }
        } catch (err) {
            errorToast('Error Deleting Class');
        }
        setProgress(100);
    }

    const handleUnEnrollClass = async (classId) => {
        setProgress(50);
        try {
            const response = await UnEnrollClass(classId);
            if (response) {
                useEffectTrigger();
                successToast('Class UnEnrolled');
            } else {
                errorToast('Wrong Class Id');
            }
        } catch (err) {
            errorToast('Error UnEnrolling Class');
        }
        setProgress(100);
    }

    return (

        <div className="row">
            <div className='d-flex flex-row align-items-center gap-3'>
                <LoadingBarComponent progress={progress} />
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
                    <div onClick={handleShowAddNewClass}>
                        <FaButton element={<MdLibraryAdd />} color={'dark'} />
                    </div>
                </div>
            </div>

            <div className={`mb-4 ${showAddNewClass ? 'animated fadeInRight' : 'animated fadeOut'}`}>
                {showAddNewClass && <AddNewClass setProgress={setProgress} useEffectTrigger={useEffectTrigger} />}
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
                            {adminAccess(classItem.classId) ?
                                <p className='card-subtitle badge bg-success  mb-2'>Admin</p> : <></>}
                            <h5 className="card-title">{classItem.className}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Section: {classItem.section}</h6>

                            <p className="badge bg-danger card-footer  cursorPointer"
                                onClick={() => handleUnEnrollClass(classItem.classId)}>Unenroll</p>
                            <div className="d-flex align-items-center gap-2">
                                {adminAccess(classItem.classId) ?
                                    <MdDeleteOutline onClick={() => handleDeleteClass(classItem.classId)}
                                        className='fs-4 text-danger cursorPointer' /> : <></>}
                                {/* <MdDeleteOutline onClick={() => handleDeleteClass(classItem.classId)} className='fs-4 text-danger cursorPointer' /> */}
                                {adminAccess(classItem.classId) ?
                                    <div><MdEditCalendar className='fs-5 text-primary cursorPointer' /></div> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default Classes;
