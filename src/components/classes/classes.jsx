import React, { useEffect, useState } from 'react';
import { MdOutlineContentCopy, MdLibraryAdd } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import AddNewClass from './addNewClass';
import LoadingBarComponent from './../loading/loadingBar';
import ContentStore from '../../stores/ContentStore.js';
import ProfileStore from '../../stores/ProfileStore.js';
import { EnrollClass, UnEnrollClass, DeleteClass } from '../../apirequest/apiRequest.js';
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import FaButton from './../buttons/fab';
import Avatar from 'react-avatar';
import DropDownMenu from './../shared/DropdownMenu';

const Classes = ({ DashboardAPIRefresh }) => {
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [showAddNewClass, setShowAddNewClass] = useState(false);
    const [classEnrollmentSearchValue, setClassEnrollmentSearchValue] = useState('');
    const [progress, setProgress] = useState(0);
    const [classes, setClasses] = useState([]);

    const { FetchAllTogether } = ContentStore();
    const { AdminAccessClasses } = ProfileStore();

    const navigate = useNavigate();

    useEffect(() => {
        setClasses(FetchAllTogether);
    }, [FetchAllTogether]);

    const adminAccess = (classId) => AdminAccessClasses && AdminAccessClasses.includes(classId);

    const handleShowAddNewClass = () => {
        setShowAddNewClass(!showAddNewClass);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleCopyClick = async (classId, index) => {
        try {
            await navigator.clipboard.writeText(classId);
            setCopiedIndex(index);
            setTimeout(() => {
                setCopiedIndex(null);
            }, 1000);
        } catch (err) {
            console.error('Unable to copy to clipboard', err);
        }
    };

    const handleClassAction = async (classId, actionFunc, successMessage, errorMessage) => {
        setProgress(50);
        try {
            const response = await actionFunc(classId);
            if (response) {
                DashboardAPIRefresh();
                successToast(successMessage);
            } else {
                errorToast('Wrong Class Id');
            }
        } catch (err) {
            errorToast(errorMessage);
        }
        setProgress(100);
    };



    const handleMenuSelection = (selectedOption, classId) => {
        switch (selectedOption) {
            case 'Delete':
                handleClassAction(classId, DeleteClass, 'Class Deleted', 'Error Deleting Class');
                break;
            case 'Edit':
                handleShowAddNewClass();
                navigate(`/classes/edit/${classId}`)
                break;
            case 'Unenroll':
                handleClassAction(classId, UnEnrollClass, 'Class Unenrolled', 'Error Unenrolling Class')
            default:
                break;
        }
    };



    return (
        <div className="row">
            <div className='d-flex flex-row align-items-center gap-3'>
                <LoadingBarComponent progress={progress} />
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Class Id"
                        value={classEnrollmentSearchValue}
                        onChange={(e) => setClassEnrollmentSearchValue(e.target.value)}
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                    />
                    <button
                        onClick={() => handleClassAction(classEnrollmentSearchValue, EnrollClass, 'Class Enrolled', 'Error Enrolling Class')}
                        className="btn btn-outline-dark"
                        type="submit"
                    >
                        Enroll
                    </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className='my-3'>
                    <div onClick={handleShowAddNewClass}>
                        <FaButton element={<MdLibraryAdd />} color={'dark'} />
                    </div>
                </div>
            </div>

            <div className={`mb-4 ${showAddNewClass ? 'animated fadeInRight' : 'animated fadeOut'}`}>
                {showAddNewClass && <AddNewClass setProgress={setProgress} DashboardAPIRefresh={DashboardAPIRefresh} showAddNewClassTrigger={handleShowAddNewClass} />}
            </div>

            {classes && classes.sort((a, b) => a.classId.localeCompare(b.classId)).map((classItem, index) => (
                <div key={classItem.classId} className="col-md-6 mb-4">
                    <div className="card shadow-sm border border-light-subtle">
                        <div className="card-body">
                            <div className='mb-3 float-end'>
                                <DropDownMenu
                                    menuItems={adminAccess(classItem.classId) ? ['Delete', 'Edit', 'Unenroll'] : ['Unenroll']}
                                    onSelect={(selectedOption) => {
                                        handleMenuSelection(selectedOption, classItem.classId);
                                    }}
                                />
                            </div>
                            <Link className='nav-link' to={`/courses/${classItem.classId}`}>
                                <Avatar name={classItem.className} className='bg-primary w-100 rounded-top-2' />
                            </Link>
                            <div className="top-section mt-3 d-flex flex-row-reverse align-items-center justify-content-between">
                                <p className="card-text d-flex align-items-center gap-2 cursorPointer bg-primary bg-gradient text-light rounded-1 p-2" onClick={(e) => handleCopyClick(classItem.classId, index)}>
                                    <MdOutlineContentCopy />
                                    {classItem.classId}
                                    {copiedIndex === index && <span className='float-end badge' style={{ fontSize: '12px' }}>Copied!</span>}
                                </p>
                                {adminAccess(classItem.classId) && <p className='card-subtitle badge bg-success'>Owner</p>}
                            </div>
                            <Link className='nav-link' to={`/courses/${classItem.classId}`}>
                                <p className="card-title cursorPointer fw-bold fs-5 title-color">{classItem.className}</p>
                            </Link>
                            <p className="card-subtitle mb-2 text-muted small">Section: {classItem.section}</p>
                        </div>
                    </div>
                </div>
            ))}
            {classes && classes.length === 0 && <p className='text-center'>No classes found</p>}
        </div>
    );
};

export default Classes;
