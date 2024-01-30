import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ task }) => {
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(task.time));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(calculateRemainingTime(task.time));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [task.time]);

    console.log(task.time);
    

    function calculateRemainingTime(taskTime) {
        const taskTimestamp = new Date(taskTime).getTime();
        const currentTimestamp = new Date().getTime();
        const remainingSeconds = Math.max(0, (taskTimestamp - currentTimestamp) / 1000);
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = Math.floor(remainingSeconds % 60);
        return { hours, minutes, seconds };
    }

    return (
        <p className='fw-bold fs-5'>
            Remaining: {remainingTime.hours}h {remainingTime.minutes}m {remainingTime.seconds}s
        </p>
    );
};

export default CountdownTimer;
