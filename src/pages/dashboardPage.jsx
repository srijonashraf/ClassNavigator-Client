import React, { useEffect, useState } from 'react';
import Classes from '../components/classes/classes';
import { FetchAllTogether, ProfileDetails } from '../apirequest/apiRequest';
import AppNavbar from '../components/shared/AppNavbar';
import Courses from './../components/courses/courses';


const DashboardPage = () => {
    const [classesData, setClassesData] = useState([]);
    const [change, setChange] = useState(0);
    const [profileDetailsValue, setProfileDetailsValue] = useState({});
    const [adminAccessClasses, setAdminAccessClasses] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FetchAllTogether();

                if (response) {
                    setClassesData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [change]);


    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const response = await ProfileDetails();
                if (response) {
                    setProfileDetailsValue(response);
                    // console.log(response);
                    setAdminAccessClasses(response.adminAccessClasses);
                }
            } catch (error) {
                console.error("Error fetching profile details:", error);
            }
        };

        fetchProfileDetails();
    }, [change]);


    return (
        <div >
            <AppNavbar />
            <div className="container mt-3">
                <Classes useEffectTrigger={() => setChange(new Date().getTime())} classes={classesData} adminAccessClasses={adminAccessClasses} />
            </div>
        </div>
    );
};

export default DashboardPage;
