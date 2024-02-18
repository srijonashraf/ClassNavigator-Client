import React, { useEffect, useState } from 'react';
import { successToast, errorToast } from '../../helper/ToasterHelper';
import { AddNewTask as AddNewTaskApi, FetchTaskById, EditTaskDetails } from '../../Api/apiRequest';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuillToolbar from '../../utility/reactQuillModules.js';

const AddNewTasks = ({ setProgress, TaskApiRefresh, ShowAddNewTaskTrigger }) => {
    const [taskData, setTaskData] = useState({
        type: '',
        taskTitle: '',
        taskDescription: '',
        group: '',
        date: '',
        time: '',
        mode: '',
        status: '',
    });

    const navigate = useNavigate();
    const { classId, courseId, taskId } = useParams();

    useEffect(() => {
        (async () => {
            if (classId && courseId && taskId) {
                ShowAddNewTaskTrigger
                await fillFrom(classId, courseId, taskId);
            }
        })();
    }, [classId, courseId, taskId]);

    const fillFrom = async (classId, courseId, taskId) => {
        const res = await FetchTaskById(classId, courseId, taskId);
        setTaskData({
            type: res.data.data.type,
            taskTitle: res.data.data.taskTitle,
            taskDescription: res.data.data.taskDescription,
            group: res.data.data.group,
            date: res.data.data.date,
            time: res.data.data.time,
            mode: res.data.data.mode,
            status: res.data.data.status,
        });
    };

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setProgress(50);
        try {
            if (taskData.taskTitle.length === 0 || taskData.taskDescription.length === 0 || taskData.mode === '' || taskData.group === '' || taskData.date === '' || taskData.time === '') {
                errorToast("Please enter all the fields");
                setProgress(0);
            }

            else {
                let response;
                if (classId && courseId && taskId) {
                    response = await EditTaskDetails(taskData, classId, courseId, taskId);
                } else {
                    response = await AddNewTaskApi(taskData, classId, courseId);
                }

                if (response) {
                    setTaskData({
                        type: '',
                        taskTitle: '',
                        taskDescription: '',
                        group: '',
                        date: '',
                        time: '',
                        mode: '',
                        status: '',
                    });
                    ShowAddNewTaskTrigger();
                    TaskApiRefresh();
                    successToast(classId && courseId && taskId ? "Task Updated Successfully" : "Task Added Successfully");
                    navigate(`/tasks/${classId}/${courseId}`);
                } else {
                    errorToast(classId && courseId && taskId ? "Failed to Update Task" : "Task Already Exists");
                }
            }
        } catch (err) {
            errorToast("Error Adding/Updating Task");
        } finally {
            setProgress(100);
        }
    };

    const handleChange = (e) => {
        setTaskData({
            ...taskData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className='mt-3'>
            <div className="row">
                <div className="col">
                    <form onSubmit={handleFormSubmission}>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label fw-bold">Type</label>
                            <input
                                type="text"
                                className="form-control rounded-1 focus-none"
                                id="type"
                                name="type"
                                placeholder="Task Type"
                                value={taskData.type}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="taskTitle" className="form-label fw-bold">Title</label>
                            <input
                                type="text"
                                className="form-control rounded-1 focus-none"
                                id="taskTitle"
                                name="taskTitle"
                                placeholder="Task Title"
                                value={taskData.taskTitle}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="taskDescription" className="form-label fw-bold">Description</label>
                            <ReactQuill
                                theme="snow"
                                id="taskDescription"
                                name="taskDescription"
                                placeholder="Task Description"
                                value={taskData.taskDescription}
                                modules={{
                                    toolbar: QuillToolbar,
                                }}
                                onChange={(value) => setTaskData((prevFields) => ({
                                    ...prevFields,
                                    taskDescription: value,
                                }))}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="group" className="form-label fw-bold">Group</label>
                            <input
                                className="form-control rounded-1 focus-none"
                                id="group"
                                name="group"
                                placeholder="Task Description"
                                value={taskData.group}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="date" className="form-label fw-bold">Date</label>
                            <input
                                type='date'
                                className="form-control rounded-1 focus-none"
                                id="date"
                                name="date"
                                value={taskData.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="time" className="form-label fw-bold">Time</label>
                            <input
                                type='time'
                                className="form-control rounded-1 focus-none"
                                id="time"
                                name="time"
                                value={taskData.time}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mode" className="form-label fw-bold">Mode</label>
                            <select
                                className="form-select rounded-1 focus-none"
                                id="mode"
                                name="mode"
                                value={taskData.mode}
                                onChange={handleChange}
                                defaultValue="Online"
                            >
                                 {taskData.mode.length === 0 && <option value="" disabled hidden>Select Mode</option>}
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>
                        </div>


                        <button type="submit" className="btn btn-dark rounded-1">Submit</button>
                        <Link to={`/tasks/${classId}/${courseId}`}>
                            <button
                                type="button"
                                onClick={() => {
                                    ShowAddNewTaskTrigger();
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

export default AddNewTasks;
