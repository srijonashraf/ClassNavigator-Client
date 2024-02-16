import React from 'react';
import Landing from '../components/landing/landing';
import { Toaster } from 'react-hot-toast';

const LandingPage = () => {
    return (
        <div className="container">
            <Toaster position="bottom-center" />
            <Landing />
        </div>
    );
};

export default LandingPage;