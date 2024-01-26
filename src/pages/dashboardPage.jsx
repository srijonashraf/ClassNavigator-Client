import React, { useEffect, useState } from 'react';
import Classes from '../components/classes/classes';
import AppNavbar from '../components/shared/AppNavbar';
import ProfileStore from '../stores/ProfileStore';
import ContentStore from '../stores/ContentStore';

const DashboardPage = () => {
    const [change, setChange] = useState(0);
    const { ProfileDetailsRequest } = ProfileStore();
    const { FetchAllTogetherRequest } = ContentStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await ProfileDetailsRequest();
                await FetchAllTogetherRequest();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [change]);



    return (
        <div >
            <AppNavbar />
            <div className="container mt-3">
                <Classes DashboardAPIRefresh={() => setChange(new Date().getTime())} />
            </div>
        </div>
    );
};

export default DashboardPage;
