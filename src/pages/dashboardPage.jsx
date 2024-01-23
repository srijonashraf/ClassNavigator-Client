import React, { useEffect, useState } from 'react';
import Classes from '../components/classes/classes';
import { FetchAllTogether } from '../apirequest/apiRequest';
import AppNavbar from '../components/shared/AppNavbar';
import ProfileStore from "../stores/ProfileStore";
import useAuthAdmin from '../components/auth/useAuthAdmin';


const DashboardPage = () => {
    const [classesData, setClassesData] = useState([]);
    const [change, setChange] = useState(0);
    const { ProfileDetailsRequest } = ProfileStore((state) => ({
        ProfileDetailsRequest: state.ProfileDetailsRequest
    }));


    useEffect(() => {
        (async () => {
            const response = await FetchAllTogether();
            if (response) {
                setClassesData(response.data.data);
            }
            await ProfileDetailsRequest();
            const { ProfileDetails } = ProfileStore.getState();

            if (ProfileDetails) {
                useAuthAdmin(ProfileDetails);
            } else {
                console.error("ProfileDetails is undefined");
            };

        })()
    }, [change]);

    console.log(useAuthAdmin);
    return (
        <div >
            <AppNavbar />
            <div className="container mt-3">
                <Classes useEffectTrigger={() => setChange(new Date().getTime())} classes={classesData} />
            </div>
        </div>
    );
};

export default DashboardPage;
