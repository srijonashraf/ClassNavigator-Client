import React from 'react';
import ContentStore from '../../stores/ContentStore';

const ListOfAdmin = ({ AdminApiRefresh }) => {
    const { FetchAdminList } = ContentStore();

    // console.log('listOfAdmin.jsx', FetchAdminList)

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th className='text-center' colSpan={3}>Admin List</th>
                    </tr>
                    <tr className='text-center'>
                        <th >UserId</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {FetchAdminList?.map((admin, userId) => (
                        <tr className='text-center' key={userId}>
                            <td>{admin.userId}</td>
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOfAdmin;