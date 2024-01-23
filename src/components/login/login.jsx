import React from 'react';
import { Login as LoginApi } from "../../apirequest/apiRequest.js";
import { errorToast, successToast } from "../../helper/ToasterHelper.js";


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

            const response = await LoginApi(formValue);

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
