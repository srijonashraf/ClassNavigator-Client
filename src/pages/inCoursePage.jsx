import React, { useEffect } from 'react';
import AllTasks from './../components/inCourse/allTasks';
import AppNavbar from './../components/shared/AppNavbar';
import ContentStore from '../stores/ContentStore';

const InCoursePage = () => {
    const { FetchAllTasksRequest } = ContentStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await FetchAllTasksRequest()

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [FetchAllTasksRequest]);

    return (
        <>
            <AppNavbar />
            <div className='container mt-3'>
                <AllTasks />
            </div>
        </>
    );
};

export default InCoursePage;