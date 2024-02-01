import React, { useEffect, useState } from 'react';
import AppNavbar from './../components/shared/AppNavbar';
import ProfileStore from '../stores/ProfileStore';
import ContentStore from '../stores/ContentStore';
import { useParams } from 'react-router-dom';
import Tasks from '../components/tasks/tasks';

const TaskPage = () => {
    const [change, setChange] = useState(0);
    const { ProfileDetailsRequest } = ProfileStore();
    const { FetchAllTasksByCourseRequest } = ContentStore();

    const { classId } = useParams();
    const { courseId } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                await ProfileDetailsRequest();
                await FetchAllTasksByCourseRequest(classId, courseId);
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
                <Tasks TaskPageApiRefresh={() => setChange(new Date().getTime())} />
            </div>
        </div>
    );
};

export default TaskPage;