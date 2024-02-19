import React, { useEffect, useState } from 'react';
import AppNavbar from './../components/shared/AppNavbar';
import ProfileStore from '../stores/ProfileStore';
import ContentStore from '../stores/ContentStore';
import Courses from './../components/courses/courses';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
    const [change, setChange] = useState(0);
    const { ProfileDetailsRequest } = ProfileStore();
    const { FetchAllCoursesByClassRequest,FetchEnrolledStudentListRequest } = ContentStore();
    
    const {classId} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await ProfileDetailsRequest();
                await FetchAllCoursesByClassRequest(classId);
                await FetchEnrolledStudentListRequest(classId);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [change]);


    return (
        <div>
            <AppNavbar />
            <div className="container mt-3">
                <Courses CourseAPIRefresh={() => setChange(new Date().getTime())} />
            </div>
        </div>
    );
};

export default CoursePage;