import React, { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from "react-icons/md";
import FaButton from './../buttons/fab';
import { MdLibraryAdd } from "react-icons/md";
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import { DeleteCourse } from '../../apirequest/apiRequest';
import { MdDeleteOutline } from "react-icons/md";
import LoadingBarComponent from './../loading/loadingBar';
import { FiEdit } from "react-icons/fi";
import ContentStore from '../../stores/ContentStore.js';
import ProfileStore from '../../stores/ProfileStore.js';
import AddNewCourses from './addNewCourses';
import { Link, useParams } from 'react-router-dom';

const Courses = ({ CourseAPIRefresh }) => {

    const [classes, setClasses] = useState([]);
    const [courses, setCourses] = useState(0);
    const [showAddNewCourse, setShowAddNewCourse] = useState(false);
    const [progress, setProgress] = useState(0);

    const { FetchAllTogether, FetchAllCoursesByClass } = ContentStore();
    const { AdminAccessClasses } = ProfileStore();

    const { classId } = useParams();

    useEffect(() => {
        setClasses(FetchAllTogether);
        setCourses(FetchAllCoursesByClass || []);
    }, [FetchAllTogether, FetchAllCoursesByClass, AdminAccessClasses, CourseAPIRefresh]);


    const adminAccess = (classId) => {
        if (AdminAccessClasses && AdminAccessClasses.includes(classId)) {
            return true;
        }
        return false;
    }

    const handleShowAddNewCourse = () => {
        setShowAddNewCourse(!showAddNewCourse);
    }
    const handleDeleteCourse = async (classId, courseId) => {
        setProgress(50);
        try {
            const response = await DeleteCourse(classId, courseId);
            if (response) {
                CourseAPIRefresh();
                successToast('Course Deleted');
            } else {
                errorToast('Failed to Delete Course');
            }
        } catch (err) {
            errorToast('Error Deleting Class');
        }
        setProgress(100);
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
                    {showAddNewCourse && <AddNewCourses ShowAddNewCourseTrigger={handleShowAddNewCourse} setProgress={setProgress} CourseAPIRefresh={CourseAPIRefresh} />}
                </div>
            </div>

            {courses && courses.sort((a, b) => a.courseCode.localeCompare(b.courseCode)).map((course, index) => (
                <div key={course._id} className="col-md-6 mb-4">
                    <div className="card shadow-sm border border-light-subtle">
                        <div className="card-body">
                            <Link><h5 className="card-title cursorPointer">{course.courseName}</h5></Link>
                            <h6 className="card-subtitle mb-2 text-muted">Course Code: {course.courseCode}</h6>
                            <p>Faculty: {course.facultyName}</p>
                            <p>Faculty Initial: {course.facultyInitial}</p>
                            <p>Class ID: {course.classId}</p>
                            <div className="d-flex align-items-center gap-2">
                                {adminAccess(course.classId) ?
                                    <MdDeleteOutline onClick={() => handleDeleteCourse(course.classId, course._id)}
                                        className='fs-4 text-danger cursorPointer' /> : <></>}
                                {adminAccess(course.classId) ?
                                    <Link to={`/courses/${classId}/edit/${course._id}`}>
                                        <div><FiEdit onClick={handleShowAddNewCourse} className='fs-5 text-primary cursorPointer' />
                                        </div>
                                    </Link>
                                    : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>


    );
};

export default Courses;