import React, { useState } from 'react';
import { AddNewClass as AddNewClassApi } from '../../apirequest/apiRequest';
import { errorToast, successToast } from '../../helper/ToasterHelper';
const AddNewClass = ({ DashboardAPIRefresh, setProgress }) => {
    const [classData, setClassData] = useState({
        className: '',
        section: '',
    });


    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setProgress(50);
        try {
            if (classData.className.length === 0 || classData.section.length === 0) {
                errorToast("Please enter all the fields");
            } else {
                const response = await AddNewClassApi(classData);

                if (response) {
                    DashboardAPIRefresh();
                    successToast("Class Added Successfully")
                } else {
                    errorToast("Class Already Exists")
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
                                placeholder="Enter Class Name (eg. 56_F Spring'24)"
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
                                placeholder="Enter Section (eg. 56_F)"
                                value={classData.section}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark rounded-1">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewClass;
