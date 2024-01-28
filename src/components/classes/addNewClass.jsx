import React, { useEffect, useState } from 'react';
import { AddNewClass as AddNewClassApi, EditClassDetails, FetchClassesById } from '../../apirequest/apiRequest';
import { errorToast, successToast } from '../../helper/ToasterHelper';
import { useParams } from 'react-router-dom';
const AddNewClass = ({ DashboardAPIRefresh, setProgress }) => {
    const [classData, setClassData] = useState({
        className: '',
        section: '',
    });

    const [classId, setClassId] = useState(null);

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


    const handleNewFormSubmission = async (e) => {
        e.preventDefault();
        setProgress(50);
        try {
            if (classData.className.length === 0 || classData.section.length === 0) {
                errorToast("Please enter all the fields");
                setProgress(0);
            } else {


                const response = await EditClassDetails(classData, classId);
                if (response) {
                    DashboardAPIRefresh();;
                    successToast("Class Edited Successfully")
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
                    <form onSubmit={handleNewFormSubmission}>
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewClass;
