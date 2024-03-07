import React, { useState } from "react";
import { Select, Space } from "antd";
import { useParams } from "react-router-dom"; // Import useParams
import ContentStore from "../../stores/ContentStore";
import ProfileStore from './../../stores/ProfileStore';
import { AddNewAdmin } from '../../api/apiRequest';
import { successToast, errorToast } from "../../helper/ToasterHelper"; // Import errorToast if not imported

const SelectComponent = ({ AdminApiRefresh }) => {
    const { classId } = useParams(); // Use useParams hook
    const options = [];
    const { FetchEnrolledStudentList } = ContentStore();
    const { ProfileDetails } = ProfileStore();
    const [selectedUser, setSelectedUser] = useState(null); // State to hold selected user

    if (Array.isArray(FetchEnrolledStudentList)) {
        FetchEnrolledStudentList.forEach((student) => {
            options.push({
                value: student.email,
            });

        });
    }

    const handleChange = (value) => {
        console.log(`Selected: ${value}`);
        setSelectedUser(value); // Set the selected user
    };

    // console.log(ProfileDetails?.email);

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        try {
            if (!selectedUser) {
                return; // Prevent form submission if no user is selected
            }

            const response = await AddNewAdmin(classId, selectedUser);
            if (response) {
                successToast('Admin Added');
                AdminApiRefresh();
            }

            else {
                errorToast('Failed or already added');
            }

        } catch (error) {
            console.error("Error adding admin:", error);
            errorToast('Failed to Add Admin');
        }
    }

    return (
        <>
            <form className="" style={{ width: "100%" }} onSubmit={handleFormSubmission}>
                <Select
                    mode="multiple"
                    size="middle"
                    placeholder="Select User"
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    options={options}
                />
                <button type="submit" className="btn btn-dark btn-sm my-2">Add Admin</button>
            </form>
        </>
    );
};

export default SelectComponent;
