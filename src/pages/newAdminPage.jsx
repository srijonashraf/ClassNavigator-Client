import React, { useEffect, useState } from 'react';
import SelectComponent from '../components/newAdmin/selectComponent';
import AppNavbar from './../components/shared/AppNavbar';
import { useParams } from 'react-router-dom';
import ContentStore from '../stores/ContentStore';
import LoadingBarComponent from '../components/loading/loadingBar';
import ListOfAdmin from '../components/newAdmin/listOfAdmin';

const NewAdminPage = () => {
    const classId = useParams().classId;
    const [progress, setProgress] = useState(0);
    const [change, setChange] = useState(0);

    const { FetchEnrolledStudentListRequest, FetchAdminListRequest } = ContentStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                FetchEnrolledStudentListRequest(classId);
                FetchAdminListRequest(classId);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [classId, change]);
    return (
        <div>
            <LoadingBarComponent progress={progress} />
            <AppNavbar />
            <div className="container mt-3">
                <SelectComponent AdminApiRefresh={() => setChange(new Date().getTime())} />
                <ListOfAdmin AdminApiRefresh={() => setChange(new Date().getTime())} />
            </div>

        </div>
    );
};

export default NewAdminPage;