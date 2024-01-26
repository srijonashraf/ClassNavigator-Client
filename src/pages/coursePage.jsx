import React from 'react';
import Courses from './../components/courses/courses';
import AppNavbar from './../components/shared/AppNavbar';


const CoursePage = () => {
    return (
        <div>
            <AppNavbar />
            <Courses />
        </div>
    );
};

export default CoursePage;