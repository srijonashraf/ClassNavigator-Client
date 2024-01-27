import React, { useEffect } from 'react';
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import { Toaster } from "react-hot-toast";
import RegistrationPage from './pages/registrationPage';
import DashboardPage from './pages/dashboardPage';
import PrivateRoute from './components/shared/PrivateRoute.jsx';
import CoursePage from './pages/coursePage';
import useAuth from './components/auth/useAuth.js';


const App = () => {
    const isAuthenticated = useAuth();

    return (
        <Fragment>
            <Toaster position="bottom-center" />
            <Router>
                <Routes>
                    {!isAuthenticated && (
                        <>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegistrationPage />} />
                        </>
                    )}

                    <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                    <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                    <Route path="/courses/:classId" element={<PrivateRoute><CoursePage /></PrivateRoute>} />

                    <Route path="/*" element={<Fragment><div className='d-flex flex-column vh-100 align-items-center justify-content-center' ><p className='text-center fs-2'>Page Not Found</p><button className="btn btn-primary" onClick={() => window.location.href = "/dashboard"}>Return to Home</button></div></Fragment>} />
                </Routes>
            </Router>
        </Fragment>
    );
};

export default App;