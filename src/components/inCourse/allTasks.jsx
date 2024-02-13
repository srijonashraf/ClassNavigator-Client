import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContentStore from '../../stores/ContentStore.js';
import Avatar from 'react-avatar';
import { LuCalendarCheck } from "react-icons/lu";
import { IoTimeSharp } from "react-icons/io5";

const AllTasks = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const { FetchAllTaskCommonStore, FetchAllTasksByCourseRequest, FetchAllCourses, FetchAllTasksRequest } = ContentStore();


    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };


    const handleTaskFilterByCourseOption = async (classId, courseId) => {
        const response = await FetchAllTasksByCourseRequest(classId, courseId);

    }

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

                    <div>
                        <span className='fw-bold'>Time Left: </span>
                        {days > 0 && <span className='fw-bold'>{days}d </span>}
                        <span className={`fw-bold ${days > 0 || hours > 1 ? 'text-dark' : 'text-danger'}`}>
                            {hours}h {minutes}m
                        </span>
                    </div>

                ) : null}
            </div>


        );
    };

    useEffect(() => {
        if (!FetchAllTaskCommonStore) {
            setIsLoading(true);
        }
        else {
            setIsLoading(false);
        }
    }, [FetchAllTaskCommonStore])


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="form-group">
                    <label htmlFor="courseSelect" className='fw-bold'>Select Course:</label>
                    <select onChange={(e) => {
                        const selectedValue = e.target.value;
                        if (!selectedValue) {
                            FetchAllTasksRequest();
                        } else {
                            handleTaskFilterByCourseOption(e.target.options[e.target.selectedIndex].getAttribute('data-class-id'), selectedValue);
                        }
                    }} className="form-control rounded-1" id="courseSelect">
                        <option value="">Select a course</option>
                        {FetchAllCourses && FetchAllCourses.map((task) => (
                            <option key={task._id} value={task._id} data-class-id={task.classId}>{task.courseName}</option>
                        ))}
                    </select>
                </div>


                {isLoading ? (
                    <p className='text-center mt-3'>Loading...</p>
                ) : FetchAllTaskCommonStore && FetchAllTaskCommonStore.length > 0 ? (
                    FetchAllTaskCommonStore
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((task) => (
                            <div key={task._id} className="col-md-6 mb-4 mt-5">
                                <div className="card shadow-sm border border-light-subtle">
                                    <div className={`card-body ${new Date(task.date + ' ' + task.time) < new Date() ? 'bg-expired' : ''}`}>

                                        <div className='d-flex justify-content-between mb-2'>
                                            {renderCountdown(task)}
                                            <p className='btn btn-danger badge float-end'>{task?.status}</p>
                                        </div>
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
                                            <Link to={`/tasks/${task?.classId}/${task?.courseId}?taskId=${task?._id}`}>
                                                <div><button className='btn btn-dark rounded-1 cursorPointer my-2'>Go to Task</button></div>
                                            </Link>
                                        </div>
                                        <footer className='sm-text float-end mt-3 text-muted'>Edited: {new Date(task.updatedAt).toLocaleString("en-AU")}</footer>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <p className='text-center mt-3'>No Tasks Found!</p>
                )}
            </div>
        </div>
    );
};

export default AllTasks;
