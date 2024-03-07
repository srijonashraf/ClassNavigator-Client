import React, { useEffect, useState } from 'react';
import { AddNewClass as AddNewClassApi, EditClassDetails, FetchClassesById } from '../../api/apiRequest';
import { errorToast, successToast } from '../../helper/ToasterHelper';
import { Link, useParams, useNavigate } from 'react-router-dom';
const AddNewClass = ({ DashboardAPIRefresh, setProgress, showAddNewClassTrigger }) => {
    const [classData, setClassData] = useState({
        className: '',
        section: '',
    });

    const [classId, setClassId] = useState(null);
    const navigate = useNavigate();

    const id = useParams().classId;

    useEffect(() => {
        if (id) {
            setClassId(id);
            fillFrom(id);
        }
    }, [id]);


    const fillFrom = async (classId) => {
        const res = await FetchClassesById(classId);
        setClassData({
            className: res.data.data.className,
            section: res.data.data.section,
        });
    };


    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setProgress(50);
        try {
            if (classData.className.length === 0 || classData.section.length === 0) {
                errorToast("Please enter all the fields");
                setProgress(0);
            } else {

                if (classId) {
                    const response = await EditClassDetails(classData, classId);
                    if (response) {
                        DashboardAPIRefresh();
                        showAddNewClassTrigger();
                        successToast("Class Updated Successfully")
                        navigate('/dashboard');
                        
                    } else {
                        errorToast("Failed to Update Class")
                    }
                }

                if (!classId) {
                    const response = await AddNewClassApi(classData);
                    if (response) {
                        DashboardAPIRefresh();
                        showAddNewClassTrigger();
                        successToast("Class Added Successfully")
                    } else {
                        errorToast("Failed to Add Class")
                    }
                }


            }

        }

        catch (err) {
            errorToast("Error Adding Class")
        }
        finally {

            setClassData({
                className: '',
                section: '',
            });

            setProgress(100);
        }
    };

    const handleChange = (e) => {
        setClassData({
            ...classData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className=''>
            <div className="row">
                <div className="col">
                    <form onSubmit={handleFormSubmission}>
                        <div className="mb-3">
                            <label htmlFor="className" className="form-label fw-bold">Class Name</label>
                            <input
                                type="text"
                                className="form-control rounded-1 focus-none"
                                id="className"
                                name="className"
                                placeholder="Class Name (eg. 56_F Spring'24)"
                                value={classData.className}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="section" className="form-label fw-bold">Section</label>
                            <input
                                type="text"
                                className="form-control rounded-1 focus-none"
                                id="section"
                                name="section"
                                placeholder="Section (eg. 56_F)"
                                value={classData.section}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark rounded-1">Submit</button>
                        <Link to="/dashboard">
                            <button
                                type="button"
                                onClick={() => {
                                    showAddNewClassTrigger();
                                }}
                                className="btn btn-danger rounded-1 mx-2"
                            >
                                Cancel
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewClass;
