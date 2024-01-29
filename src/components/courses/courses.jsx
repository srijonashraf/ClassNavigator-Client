import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi"
import { Link, useParams } from 'react-router-dom';
import LoadingBarComponent from './../loading/loadingBar';
import AddNewCourses from './addNewCourses';
import { DeleteCourse } from '../../apirequest/apiRequest';
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import ContentStore from '../../stores/ContentStore.js';
import ProfileStore from '../../stores/ProfileStore.js';

const Courses = ({ CourseAPIRefresh }) => {
    const [classes, setClasses] = useState(null);
    const [courses, setCourses] = useState(null);
    const [showAddNewCourse, setShowAddNewCourse] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const { FetchAllTogether, FetchAllCoursesByClass, FetchAllCoursesByClassRequest } = ContentStore();
    const { AdminAccessClasses } = ProfileStore();
    const { classId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await FetchAllCoursesByClassRequest(classId);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching data:", error);
                errorToast('Error fetching data');
            }
        };

        fetchData();
    }, [classId, FetchAllCoursesByClassRequest]);

    useEffect(() => {
        setClasses(FetchAllTogether);
        setCourses(FetchAllCoursesByClass || null);
    }, [FetchAllTogether, FetchAllCoursesByClass, AdminAccessClasses, CourseAPIRefresh]);

    const adminAccess = (classId) => AdminAccessClasses && AdminAccessClasses.includes(classId);

    const handleShowAddNewCourse = () => setShowAddNewCourse(!showAddNewCourse);

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
        } finally {
            setProgress(100);
        }
    };

    const renderCourseCards = () => {
        return (
            courses && courses.sort((a, b) => a.courseCode.localeCompare(b.courseCode)).map((course, index) => (
                <div key={course._id} className="col-md-6 mb-4">
                    <div className="card shadow-sm border border-light-subtle">
                        <div className="card-body">
                            <Link><h5 className="card-title cursorPointer">{course.courseName}</h5></Link>
                            <h6 className="card-subtitle mb-2 text-muted">Course Code: {course.courseCode}</h6>
                            <p>Faculty: {course.facultyName}</p>
                            <p>Faculty Initial: {course.facultyInitial}</p>
                            <p>Class ID: {course.classId}</p>
                            <div className="d-flex align-items-center gap-2">
                                {adminAccess(course.classId) &&
                                    <MdDeleteOutline onClick={() => handleDeleteCourse(course.classId, course._id)} className='fs-4 text-danger cursorPointer' />
                                }
                                {adminAccess(course.classId) &&
                                    <Link to={`/courses/${classId}/edit/${course._id}`}>
                                        <div><FiEdit onClick={handleShowAddNewCourse} className='fs-5 text-primary cursorPointer' /></div>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ))
        );
    };

    return (
        <div className="row">
            <div className=''>
                <LoadingBarComponent progress={progress} />
                {adminAccess(classId) &&
                    <button className='btn btn-dark rounded-1' onClick={handleShowAddNewCourse}> Add New Course</button>
                }
                <div className={`mb-4 ${showAddNewCourse ? 'animated fadeInRight' : 'animated fadeOut'}`}>
                    {showAddNewCourse && <AddNewCourses ShowAddNewCourseTrigger={handleShowAddNewCourse} setProgress={setProgress} CourseAPIRefresh={CourseAPIRefresh} />}
                </div>
            </div>
            {isLoading ? <p className='text-center'>Loading...</p> : (courses && courses.length === 0) ?
                <p className='text-center'>No Course Found!</p> : renderCourseCards()}
        </div>
    );
};

export default Courses;
