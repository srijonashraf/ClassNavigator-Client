import React, { useEffect } from 'react';
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import { Toaster } from "react-hot-toast";
import RegistrationPage from './pages/registrationPage';
import DashboardPage from './pages/dashboardPage';
import PrivateRoute from './components/shared/PrivateRoute.jsx';


const App = () => {

    return (
        <Fragment>
            <Toaster position="bottom-center" />
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                </Routes>
            </Router>
        </Fragment>
    );
};

export default App;