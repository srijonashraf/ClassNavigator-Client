import React from 'react';
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import { Toaster } from "react-hot-toast";
import RegistrationPage from './pages/registrationPage';
import DashboardPage from './pages/dashboardPage';


const App = () => {
    return (
        <Fragment>
            <Toaster position="bottom-center" />
            <Router>
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route exact path="/user/login" element={<LoginPage />} />
                    <Route exact path="/admin/login" element={<LoginPage />} />
                    <Route exact path="/register" element={<RegistrationPage />} />
                    <Route exact path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </Router>
        </Fragment>
    );
};

export default App;