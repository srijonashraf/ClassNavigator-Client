import React, { useRef, useState } from 'react';
import ContentStore from '../../stores/ContentStore';
import { ExclamationCircleOutlined, FlagOutlined } from '@ant-design/icons';
import PopConfirm from './../shared/PopConfirm';
import { AddNewAdmin, RemoveParticipant } from '../../api/apiRequest';
import { useParams } from 'react-router-dom';
import { errorToast, successToast } from '../../helper/ToasterHelper';

const ListOfParticipant = () => {

    const { FetchEnrolledStudentList, FetchEnrolledStudentListRequest } = ContentStore();
    const { classId } = useParams();

    const refreshStudentList = async () => {
        await FetchEnrolledStudentListRequest(classId);
    }


    const handleCancel = () => {
        // console.log('cancelled');
    };

    return (
        <div>
            <table className='table overflow-x-scroll'>
                <thead>
                    <tr>
                        <th className='text-center' colSpan={4}>Member List</th>
                    </tr>
                    <tr className='text-center'>
                        <th>UserId</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {FetchEnrolledStudentList?.map((student, index) => (
                        <tr className='text-center' key={index}>
                            <td>{student.userId}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <div className='d-flex justify-content-evenly'>
                                    <PopConfirm
                                        id={'add-admin'}
                                        icon={<FlagOutlined />}
                                        title={"Are you sure you want to add this participant as admin?"}
                                        description={"You cannot undo this action"}
                                        okText={"Yes"}
                                        cancelText={"No"}
                                        onConfirm={() => AddNewAdmin(classId, student.email) ? successToast('Admin Added') : errorToast('Failed to Add Admin')}
                                        onCancel={handleCancel} />


                                    <PopConfirm
                                        id={'remove-participant'}
                                        icon={<ExclamationCircleOutlined />}
                                        title={"Are you sure you want to remove this participant?"}
                                        description={"You cannot undo this action"}
                                        okText={"Remove"}
                                        cancelText={"Cancel"}
                                        onConfirm={() => RemoveParticipant(classId, student.email) ? (successToast('Participant Removed'), refreshStudentList()) : errorToast('Failed to Remove Participant')}
                                        onCancel={handleCancel} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOfParticipant;
