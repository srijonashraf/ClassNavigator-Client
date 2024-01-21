import React from 'react';
import { LoginByAdmin, LoginByUser } from "../../apirequest/apiRequest.js";
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import { useParams } from 'react-router-dom';

const Login = () => {

    const [formValue, setFormValue] = React.useState({
        email: "",
        password: ""
    });


    const loginRequest = async (e) => {
        e.preventDefault();
        if (formValue.email.length === 0 || formValue.password.length === 0) {
            errorToast("Please enter all the fields");
        } else {

            let response;
            if (window.location.pathname === '/admin/login') {
                response = await LoginByAdmin(formValue);
            } else if (window.location.pathname === '/user/login') {
                response = await LoginByUser(formValue);
            }
            if (response) {
                successToast('Login Successful');
                window.location.href = '/dashboard';
            } else {
                errorToast('Wrong Credentials Or User Type');
            }
        }
    }

    return (
        <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-lg-6 col-md-8 col-sm-10">
                <div className="card border-primary shadow-lg rounded-1 p-4">
                    <div className="card-body">
                        <form onSubmit={loginRequest} className="form d-flex flex-column gap-3">
                            <input
                                type="email"
                                placeholder="Email"
                                value={formValue.email}
                                onChange={(e) => setFormValue({ ...formValue, email: e.target.value })}
                                className="form-control"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={formValue.password}
                                onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
                                className="form-control"
                            />
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
