import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi"
import { Link, useParams, useNavigate } from 'react-router-dom';
import LoadingBarComponent from './../loading/loadingBar';
import { DeleteTask } from '../../apirequest/apiRequest';
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import ContentStore from '../../stores/ContentStore.js';
import ProfileStore from '../../stores/ProfileStore.js';
import Avatar from 'react-avatar';
import { LuCalendarCheck } from "react-icons/lu";
import { IoTimeSharp } from "react-icons/io5";

const AllTasks = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [showAddNewTask, setShowAddNewTask] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [change, setChange] = useState('');

    const { FetchAllTasks } = ContentStore();
    const { AdminAccessClasses } = ProfileStore();
    const { classId } = useParams();
    const { courseId } = useParams();



    const adminAccess = (classId) => AdminAccessClasses && AdminAccessClasses.includes(classId);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleDeleteTask = async (classId, courseId, taskId) => {
        setProgress(50);
        try {
            const response = await DeleteTask(classId, courseId, taskId);
            if (response) {
                TaskPageApiRefresh();
                successToast('Task Deleted');
            } else {
                errorToast('Failed to Task Course');
            }
        } catch (err) {
            errorToast('Error Deleting Task');
        } finally {
            setProgress(100);
        }
    };

    function formatDate(date) {
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: '2-digit' };
        return date.toLocaleDateString('en-GB', options);
    }

    function formatTime(timeString) {
        const date = new Date(`2000-01-01T${timeString}`);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleTimeString('en-US', options);
    }

    const renderCountdown = (task) => {
        const currentTime = new Date();
        const taskTime = new Date(task.date + ' ' + task.time);
        const remainingTime = Math.max(0, (taskTime.getTime() - currentTime.getTime()) / 1000);
        const days = Math.floor(remainingTime / (3600 * 24));
        const hours = Math.floor((remainingTime % (3600 * 24)) / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);


        return (
            <div>
                {remainingTime > 0 ? (
                    <div className='d-flex justify-content-between'>
                        <div>
                            <span className='fw-bold'>Time Left: </span>
                            {days > 0 && <span className='fw-bold'>{days}d </span>}
                            <span className={`fw-bold ${days > 0 || hours > 1 ? 'text-dark' : 'text-danger'}`}>
                                {hours}h {minutes}m
                            </span>
                        </div>

                    </div>
                ) : null}
            </div>


        );
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="form-group">
                    <label htmlFor="courseSelect" className='fw-bold'>Select Course:</label>
                    <select className="form-control rounded-1" id="courseSelect">
                        {/!!* Fetch Course Name here and switch task based on course */}
                        {FetchAllTasks && FetchAllTasks.map((task) => (
                            <option key={task._id} value={task._id}>{task._id}</option>
                        ))}
                    </select>
                </div>

                {FetchAllTasks && FetchAllTasks.map((task) => (
                    <div key={task._id} className="col-md-6 mb-4 mt-5">
                        <div className="card shadow-sm border border-light-subtle">
                            <div className={`card-body ${new Date(task.date + ' ' + task.time) < new Date() ? 'bg-expired' : ''}`}>
                                {renderCountdown(task)}
                                <p className='btn btn-danger badge float-end'>{task?.status}</p>
                                <Avatar name={task.type} className='bg-warning card-img-top w-100 rounded-top-2 mb-3' />
                                <div className='mb-2'>
                                    <button className='btn btn-primary btn-sm rounded-1 float-end'>{task.type}</button>
                                    <button className='btn btn-secondary btn-sm rounded-1'>Group: {task.group}</button>
                                </div>
                                <p className="card-title fw-bold fs-5 title-color">{task.taskTitle}</p>
                                <div className="card-subtitle mb-2 text-muted small">
                                    <span><u>Description:</u></span>
                                    <div>
                                        {showFullDescription ? (
                                            <>
                                                <div dangerouslySetInnerHTML={{ __html: task.taskDescription }}></div>
                                                <span onClick={toggleDescription} className="text-secondary cursorPointer">See Less</span>
                                            </>
                                        ) : (
                                            <div className='d-flex gap-1'>
                                                <div className='m-less' dangerouslySetInnerHTML={{ __html: task.taskDescription.substring(0, 100) }}></div>
                                                {task.taskDescription.length > 100 && (
                                                    <span onClick={toggleDescription} className="text-primary cursorPointer">See More...</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <p className={`btn badge rounded-1 float-end ${task.mode === 'Online' ? 'btn-info' : 'btn-secondary'}`}>• {task.mode}</p>
                                <div className='d-flex flex-row gap-2'>
                                    <p className='fw-bold d-flex align-items-center gap-1'>
                                        <LuCalendarCheck className='text-primary fs-5' /> {formatDate(new Date(task.date))}
                                    </p>
                                    <p className='fw-bold d-flex align-items-center gap-1'>
                                        <IoTimeSharp className='text-primary fs-5' /> {formatTime(task.time)}
                                    </p >
                                </div>


                                <div className="d-flex align-items-center gap-2">
                                   
                                    {adminAccess(task?.classId) &&
                                        <Link to={`/tasks/${task?.classId}/${task?.courseId}`}>
                                            <div><button className='btn btn-dark rounded-1 cursorPointer'>Go to Task</button></div>
                                        </Link>
                                    }
                                </div>
                                <footer className='sm-text float-end mt-3 text-muted'>Edited: {new Date(task.updatedAt).toLocaleString("en-AU")}</footer>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTasks;
