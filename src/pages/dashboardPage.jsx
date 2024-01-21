import React, { useEffect, useState } from 'react';
import Classes from '../components/classes/classes';
import { FetchClassesById } from '../apirequest/apiRequest';
import AppNavbar from '../components/shared/AppNavbar';
import CustomCard from '../components/classes/test-cards';

const DashboardPage = () => {
    const [classesData, setClassesData] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await FetchClassesById();
            if (response) {
                setClassesData(response.data.data);
            }
        })()
    }, []);
    return (
        <div >
            <AppNavbar />
            <div className="container mt-3">
                <Classes classes={classesData} />
                {/* <CustomCard/> */}
            </div>
        </div>
    );
};

export default DashboardPage;
