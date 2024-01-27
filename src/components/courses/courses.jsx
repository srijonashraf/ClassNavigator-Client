import React, { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from "react-icons/md";
import FaButton from './../buttons/fab';
import { MdLibraryAdd } from "react-icons/md";
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import { EnrollClass, UnEnrollClass, DeleteClass } from '../../apirequest/apiRequest';
import { MdDeleteOutline } from "react-icons/md";
import LoadingBarComponent from './../loading/loadingBar';
import { ImExit } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import ContentStore from '../../stores/ContentStore.js';
import ProfileStore from '../../stores/ProfileStore.js';
import AddNewCourses from './addNewCourses';
import { Link, useParams } from 'react-router-dom';

const Courses = ({ CourseAPIRefresh }) => {

    const [classes, setClasses] = useState([]);
    const [courses, setCourses] = useState(0);
    const [adminClasses, setAdminClasses] = useState([]);
    const [showAddNewCourse, setShowAddNewCourse] = useState(false);
    const [progress, setProgress] = useState(0);
    const [change, setChange] = useState(0);

    const { FetchAllTogether, FetchAllCoursesByClassRequest, FetchAllCoursesByClass } = ContentStore();
    const { AdminAccessClasses } = ProfileStore();

    const { classId } = useParams();

    useEffect(() => {
        (async () => {
            await FetchAllCoursesByClassRequest(classId);
        })()
    }, [classId]);


    useEffect(() => {
        setClasses(FetchAllTogether);
        setAdminClasses(AdminAccessClasses);
        setCourses(FetchAllCoursesByClass || []);
    }, [FetchAllTogether, FetchAllCoursesByClass, AdminAccessClasses]);


    const adminAccess = (classId) => {
        if (adminClasses && adminClasses.includes(classId)) {
            return true;
        }
        return false;
    }

    const handleShowAddNewCourse = () => {
        setShowAddNewCourse(!showAddNewCourse);
    }


    return (
        <div className="row">
            <div className=''>
                <LoadingBarComponent progress={progress} />
                {adminAccess(classId) ?
                    <button className='btn btn-dark rounded-1' onClick={handleShowAddNewCourse}> Add New Course</button>
                    : <></>
                }
                <div className={`mb-4 ${showAddNewCourse ? 'animated fadeInRight' : 'animated fadeOut'}`}>
                    {showAddNewCourse && <AddNewCourses setProgress={setProgress} CourseAPIRefresh={CourseAPIRefresh} />}
                </div>
            </div>

            {courses && courses.map((course, index) => (
                <div key={course._id} className="col-md-6 mb-4">
                    <div className="card shadow-sm border border-light-subtle">
                        <div className="card-body">
                            <Link><h5 className="card-title cursorPointer">{course.courseName}</h5></Link>
                            <h6 className="card-subtitle mb-2 text-muted">Course Code: {course.courseCode}</h6>
                            <p>Faculty: {course.facultyName}</p>
                            <p>Faculty Initial: {course.facultyInitial}</p>
                            <p>Class ID: {course.classId}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>


    );
};

export default Courses;