import React, { useState } from "react";
import { Select, Space } from "antd";
import { useParams } from "react-router-dom"; // Import useParams
import ContentStore from "../../stores/ContentStore";
import { AddNewAdmin } from './../../Api/apiRequest';
import { successToast, errorToast } from "../../helper/ToasterHelper"; // Import errorToast if not imported

const SelectComponent = () => {
    const { classId } = useParams(); // Use useParams hook
    const options = [];
    const { FetchEnrolledStudentList } = ContentStore();
    const [selectedUser, setSelectedUser] = useState(null); // State to hold selected user

    if (Array.isArray(FetchEnrolledStudentList)) {
        FetchEnrolledStudentList.forEach((student) => {
            const [email, userId] = student.split(', ');
            options.push({
                value: userId.trim(),
                label: email.trim()
            });
        });
    }

    const handleChange = (value, option) => {
        // console.log(`Selected: ${option.label}, ${value}`);
        setSelectedUser(option.label); // Set the selected user
    };

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        try {
            if (!selectedUser) {
                return; // Prevent form submission if no user is selected
            }

            const response = await AddNewAdmin(classId, selectedUser);
            if (response) {
                successToast('Admin Added');
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
                    mode="single"
                    size="middle"
                    placeholder="Select User"
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    options={options}
                />
                <button className="btn btn-dark btn-sm my-2">Add Admin</button>
            </form>
        </>
    );
};

export default SelectComponent;
