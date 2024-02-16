import React from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {

    return (
        <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-lg-4 col-md-6 col-sm-8 text-center">
                <Link to="/login" className="text-decoration-none">
                    <button type="button" className="btn btn-primary rounded-1 btn-lg w-100 mb-3">
                        Sign In
                    </button>
                </Link>
                <Link to="/register" className="text-decoration-none">
                    <button type="button" className="btn btn-dark rounded-1 btn-lg w-100">
                        Sign Up
                    </button>
                </Link>
                <div className="float-end d-flex gap-2 mt-2 fw-bold">

                    <span>
                        <Link className='nav-link' to="/forgotPass">
                            <u>Forgot Password</u>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Landing;
