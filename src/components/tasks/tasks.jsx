import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi"
import { Link, useParams, useNavigate } from 'react-router-dom';
import LoadingBarComponent from './../loading/loadingBar';
import { DeleteTask, TaskCompletion } from '../../apirequest/apiRequest';
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import ContentStore from '../../stores/ContentStore.js';
import ProfileStore from '../../stores/ProfileStore.js';
import Avatar from 'react-avatar';
import AddNewTasks from './addNewTasks';
import { LuCalendarCheck } from "react-icons/lu";
import { IoTimeSharp } from "react-icons/io5";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import MoonLoader from "react-spinners/ClipLoader";

const Tasks = ({ TaskPageApiRefresh }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [showAddNewTask, setShowAddNewTask] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [change, setChange] = useState('');
    const [taskLoadingSpinner, setTaskLoadingSpinner] = useState(null);

    const { FetchAllTasksByCourseRequest, FetchAllTasksByCourse } = ContentStore();
    const { AdminAccessClasses, completedTasks, ProfileDetailsRequest } = ProfileStore();
    const { classId } = useParams();
    const { courseId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await FetchAllTasksByCourseRequest(classId, courseId);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching data:", error);
                errorToast('Error fetching data');
            }
        };

        fetchData();
    }, [classId, FetchAllTasksByCourseRequest, change]);

    useEffect(() => {
        setTasks(FetchAllTasksByCourse || null);
    }, [FetchAllTasksByCourse, AdminAccessClasses, change]);

    const adminAccess = (classId) => AdminAccessClasses && AdminAccessClasses.includes(classId);
    const completed = (TaskId) => completedTasks && completedTasks.includes(TaskId);

    const handleTaskCompletion = async (classId, courseId, taskId) => {
       setTaskLoadingSpinner(taskId);
        const response = await TaskCompletion(classId, courseId, taskId);
        if (response) {
            await ProfileDetailsRequest();
        }
        setTaskLoadingSpinner(null);
    }
    
    const handleShowAddNewTask = () => {
        setShowAddNewTask(!showAddNewTask)
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    };

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


    const renderCourseCards = () => {
        return (
            tasks &&
            tasks
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((task, index) => (
                    // Todo Sort Pending wise
                    <div key={task._id} className="col-md-6 mb-4">
                        <div className="card shadow-sm border border-light-subtle">

                            <div className={`card-body ${new Date(task.date + ' ' + task.time) < new Date() ? 'bg-expired' : ''}`}>
                                {renderCountdown(task)}

                                <div className='d-flex justify-content-between align-items-baseline my-2'>
                                    <button onClick={() => handleTaskCompletion(task.classId, task.courseId, task._id)} className='btn btn-outline-secondary btn-sm rounded-1 d-flex gap-2'>
                                        <MoonLoader
                                            color={'#adadad'}
                                            loading={task?._id === taskLoadingSpinner ? true : false}
                                            size={20}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                        {completed(task._id) ? (
                                            'Done'
                                        ) : (
                                            'Mark as Done'
                                        )}
                                    </button>


                                    <p className='btn btn-danger badge'>{task?.status}</p>
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
                                    {adminAccess(classId) &&
                                        <MdDeleteOutline onClick={() => handleDeleteTask(classId, courseId, task._id)} className='fs-4 text-danger cursorPointer' />

                                    }
                                    {adminAccess(classId) &&
                                        <Link to={`/tasks/${classId}/${courseId}/edit/${task._id}`}>
                                            <div><FiEdit onClick={handleShowAddNewTask} className='fs-5 text-primary cursorPointer' /></div>
                                        </Link>
                                    }
                                </div>
                                <footer className='sm-text float-end mt-3 text-muted'>Edited: {new Date(task.updatedAt).toLocaleString("en-AU")}</footer>
                            </div>

                        </div>
                    </div>
                ))
        );
    };


    return (
        <div className="row">
            <Breadcrumb>
                <Breadcrumb.Item onClick={() => navigate('/')} >Home</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate(`/courses/${classId}`)}>
                    Courses
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    Tasks
                </Breadcrumb.Item>
            </Breadcrumb>

            <div className=''>
                <LoadingBarComponent progress={progress} />
                {adminAccess(classId) &&
                    <button className='btn btn-dark rounded-1' onClick={handleShowAddNewTask}> Add New Tasks</button>
                }
                <div className={`mb-4 ${showAddNewTask ? 'animated fadeInRight' : 'animated fadeOut'}`}>
                    {showAddNewTask && <AddNewTasks ShowAddNewTaskTrigger={handleShowAddNewTask} setProgress={setProgress} TaskApiRefresh={() => setChange(new Date().getTime())} />}
                </div>
            </div>
            {isLoading ? <p className='text-center'>Loading...</p> : (tasks && tasks.length === 0) ?
                <p className='text-center'>No Tasks Found!</p> : renderCourseCards()}
        </div>
    );
};

export default Tasks;