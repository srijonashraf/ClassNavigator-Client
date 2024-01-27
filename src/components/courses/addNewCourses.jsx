import React, { useState } from 'react';
import { successToast, errorToast } from '../../helper/ToasterHelper';
import { AddNewCourses as AddNewCoursesApi } from '../../apirequest/apiRequest';
import { useParams } from 'react-router-dom';

const AddNewCourses = ({ setProgress, CourseAPIRefresh }) => {
    const [courseData, setCourseData] = useState({
        courseName: '',
        courseCode: '',
        facultyName: '',
        facultyInitial: '',
    });

    const { classId } = useParams();

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setProgress(50);
        try {
            if (courseData.courseName.length === 0 || courseData.courseCode.length === 0 || courseData.facultyName.length === 0 || courseData.facultyInitial.length === 0) {
                errorToast("Please enter all the fields");
                setProgress(0);
            } else {
                const response = await AddNewCoursesApi(courseData, classId);

                if (response) {
                    CourseAPIRefresh();
                    successToast("Class Added Successfully")
                } else {
                    errorToast("Class Already Exists")
                }
            }
        }
        catch (err) {
            errorToast("Error Adding Class")

        }
        finally {

            setCourseData({
                courseName: '',
                courseCode: '',
                facultyName: '',
                facultyInitial: '',
            });

            setProgress(100);
        }
    };

    const handleChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className='mt-3'>
            <div className="row">
                <div className="col">
                    <form onSubmit={handleFormSubmission}>
                        <div className="mb-3">
                            <label htmlFor="courseName" className="form-label fw-bold">Course Name</label>
                            <input
                                type="text"
                                className="form-control rounded-1 focus-none"
                                id="courseName"
                                name="courseName"
                                placeholder="Course Name (eg. Operating System)"
                                value={courseData.courseName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="courseCode" className="form-label fw-bold">Course Code</label>
                            <input
                                type="text"
                                className="form-control rounded-1 focus-none"
                                id="courseCode"
                                name="courseCode"
                                placeholder="Course Code (eg. CSE422)"
                                value={courseData.courseCode}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="facultyName" className="form-label fw-bold">Faculty Name</label>
                            <input
                                type="text"
                                className="form-control rounded-1 focus-none"
                                id="facultyName"
                                name="facultyName"
                                placeholder="Faculty Name (eg. Mahimul Islam Nadim)"
                                value={courseData.facultyName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="facultyInitial" className="form-label fw-bold">Faculty Initial</label>
                            <input
                                type="text"
                                className="form-control rounded-1 focus-none"
                                id="facultyInitial"
                                name="facultyInitial"
                                placeholder="Faculty Initial (eg. MIN)"
                                value={courseData.facultyInitial}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark rounded-1">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewCourses;