import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi"
import { Link, useParams } from 'react-router-dom';
import LoadingBarComponent from './../loading/loadingBar';
import { DeleteTask } from '../../apirequest/apiRequest';
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import ContentStore from '../../stores/ContentStore.js';
import ProfileStore from '../../stores/ProfileStore.js';
import Avatar from 'react-avatar';
import AddNewTasks from './addNewTasks';
const Tasks = ({ TaskApiRefresh }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [showAddNewTask, setShowAddNewTask] = useState(false);
    const [progress, setProgress] = useState(0);
    const { FetchAllTasksByCourseRequest, FetchAllTasksByCourse } = ContentStore();
    const { AdminAccessClasses } = ProfileStore();
    const { classId } = useParams();
    const { courseId } = useParams();

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
    }, [classId, FetchAllTasksByCourseRequest]);

    useEffect(() => {
        setTasks(FetchAllTasksByCourse || null);
    }, [FetchAllTasksByCourse, AdminAccessClasses, TaskApiRefresh]);

    const adminAccess = (classId) => AdminAccessClasses && AdminAccessClasses.includes(classId);

    const handleShowAddNewTask = () => setShowAddNewTask(!showAddNewTask);

    const handleDeleteTask = async (classId, courseId, taskId) => {
        setProgress(50);
        try {
            const response = await DeleteTask(classId, courseId, taskId);
            if (response) {
                TaskApiRefresh();
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


    const renderCourseCards = () => {
        return (
            tasks && tasks.sort((a, b) => a._id.localeCompare(b._id)).map((task, index) => (
                <div key={task._id} className="col-md-6 mb-4">
                    <div className="card shadow-sm border border-light-subtle">
                        <div className="card-body">
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='fw-bold fs-5'>Remaining: {task.time}</p>
                                {task.status === 'pending' ? <p className='btn btn-danger badge'>{task.status}</p>
                                    : <p className='btn btn-success fs-6 rounded-1 badge float-end'>{task.status}</p>}
                            </div>

                            <Avatar name={task.taskTitle} className='bg-danger card-img-top w-100 rounded-top-2 mb-3' />
                            <div className='mb-2'>
                                <button className='btn btn-primary btn-sm rounded-1 float-end'>{task.type}</button>
                                <button className='btn btn-secondary btn-sm rounded-1'>Group: {task.group}</button>
                            </div>
                            <p className="card-title fw-bold fs-5">{task.taskTitle}</p>
                            <p className="card-subtitle mb-2 text-muted small">Description: {task.taskDescription}</p>
                            <div className='d-flex align-items-center justify-content-between'>
                            <p className='md-text fw-bold'>Deadline: {task.date} at {task.time}</p>
                            <p className='btn btn-info badge rounded-1'>• {task.mode}</p>

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
                            <footer className='sm-text float-end mt-3 text-muted'>Edited: {new Date(task.updatedAt).toLocaleString()}</footer>
                        </div>
                    </div>
                </div>
            ))
        );
    };

    return (
        <div className="row">
            <div className=''>
                <LoadingBarComponent progress={progress} />
                {adminAccess(classId) &&
                    <button className='btn btn-dark rounded-1' onClick={handleShowAddNewTask}> Add New Tasks</button>
                }
                <div className={`mb-4 ${showAddNewTask ? 'animated fadeInRight' : 'animated fadeOut'}`}>
                    {showAddNewTask && <AddNewTasks ShowAddNewTaskTrigger={handleShowAddNewTask} setProgress={setProgress} TaskApiRefresh={TaskApiRefresh} />}
                </div>
            </div>
            {isLoading ? <p className='text-center'>Loading...</p> : (tasks && tasks.length === 0) ?
                <p className='text-center'>No Course Found!</p> : renderCourseCards()}
        </div>
    );
};

export default Tasks;