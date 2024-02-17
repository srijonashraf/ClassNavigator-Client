import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LoadingBarComponent from './../loading/loadingBar';
import AddNewCourses from './addNewCourses';
import { DeleteCourse } from '../../Api/apiRequest';
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import ContentStore from '../../stores/ContentStore.js';
import ProfileStore from '../../stores/ProfileStore.js';
import Avatar from 'react-avatar';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

const Courses = ({ CourseAPIRefresh }) => {
    const [courses, setCourses] = useState(null);
    const [showAddNewCourse, setShowAddNewCourse] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { FetchAllCoursesByClass, FetchAllCoursesByClassRequest } = ContentStore();
    const { AdminAccessClasses } = ProfileStore();
    const { classId } = useParams();

    const navigate = useNavigate();

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
        setCourses(FetchAllCoursesByClass || null);
    }, [FetchAllCoursesByClass, AdminAccessClasses, CourseAPIRefresh]);

    const adminAccess = (classId) => AdminAccessClasses && AdminAccessClasses.includes(classId);

    const items = [
        {
            key: '1',
            label: 'Edit',
            icon: <EditOutlined />,
        },
        {
            key: '2',
            label: 'Delete',
            icon: <DeleteOutlined />,
        },
    ];

    const handleShowAddNewCourse = () => {
        setShowAddNewCourse(!showAddNewCourse);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        } finally {
            setProgress(100);
        }
    };

    const handleMenuSelection = (selectedOption, classId, courseId) => {
        switch (selectedOption) {
            case '1':
                handleShowAddNewCourse();
                navigate(`/courses/${classId}/edit/${courseId}`)
                break;
            case '2':
                handleDeleteCourse(classId, courseId);
                break;
            default:
                break;
        }
    };

    const renderCourseCards = () => {
        return (
            courses && courses.sort((a, b) => a.courseCode.localeCompare(b.courseCode)).map((course, index) => (
                <div key={course._id} className="col-md-6 mb-4">
                    <div className="card shadow-sm border border-light-subtle">
                        <div className="card-body">
                            <Link to={`/tasks/${classId}/${course._id}`} className='nav-link'>
                                {adminAccess(course.classId) && (
                                    <Dropdown
                                        className='float-end mb-3 fs-5'
                                        menu={{
                                            items,
                                            selectable: false,
                                            onClick: (info) => {
                                                handleMenuSelection(info.key, course.classId, course._id);
                                            },
                                        }}
                                    >
                                        <MoreOutlined className='cursorPointer' />
                                    </Dropdown>
                                )}


                                <Avatar name={course.courseName} className='bg-secondary w-100 rounded-top-2 card-img-top' />
                                <p className="card-title cursorPointer fw-bold fs-5 mt-3 title-color">{course.courseName}</p>
                                <p className="card-subtitle mb-2 text-muted small">Course Code: {course.courseCode}</p>
                                <p className='md-text fw-bold'>Faculty: {course.facultyName} ({course.facultyInitial})</p>
                            </Link>
                        </div>
                    </div>
                </div>
            ))
        );
    };

    return (
        <div className="row">
            <Breadcrumb>
                <Breadcrumb.Item onClick={() => navigate('/dashboard')} >Home</Breadcrumb.Item>
                <Breadcrumb.Item active>
                    Courses
                </Breadcrumb.Item>
            </Breadcrumb>
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
