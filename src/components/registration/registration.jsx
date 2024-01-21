import React from 'react';
import { RegisterByAdmin, RegisterByUser } from '../../apirequest/apiRequest';
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import { UserIdValidation } from '../../helper/FormHelper.js';
const Registration = () => {

    const [formValue, setFormValue] = React.useState({
        userId: "",
        name: "",
        role: "",  // Updated: Added role field
        email: "",
        password: "",
        section: "",
    });

    const registrationRequest = async (e) => {
        e.preventDefault();
        if (formValue.email.length === 0 || formValue.password.length === 0 || formValue.userId.length === 0 || formValue.name.length === 0 || formValue.role.length === 0 || formValue.section.length === 0) {
            errorToast("Please enter all the fields");
        }
        else if (UserIdValidation(formValue.userId) === false) {
            errorToast("Invalid Student Id");
        }
        else {
            let response;
            try {

                if (formValue.role === "admin") {

                    response = await RegisterByAdmin(formValue);
                    if (response) {
                        successToast('Registration Successful');
                    } else {
                        errorToast('User Already Exists');
                    }
                } else {
                    response = await RegisterByUser(formValue);
                    if (response) {
                        successToast('Registration Successful');
                    } else {
                        errorToast('User Already Exists');
                    }
                }

            } catch (error) {
                console.error(error);
                errorToast('Internal Server Error');
            }
            finally {
                setFormValue({
                    userId: "",
                    name: "",
                    role: "",
                    email: "",
                    password: "",
                    section: "",
                });
            }
        }
    }

    return (
        <div className='row justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
            <div className="col-lg-6 col-md-8 col-sm-10">
                <div className="card border-primary shadow-lg rounded-1 p-4">
                    <div className="card-body">
                        <form onSubmit={registrationRequest} className="form d-flex flex-column gap-3">
                            <input type="text" placeholder="Student ID, eg. 201-15-12345, 23245795221479" value={formValue.userId}
                                onChange={(e) => setFormValue({ ...formValue, userId: e.target.value })}
                                className="form-control" />
                            <input type="text" placeholder="Name" value={formValue.name}
                                onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
                                className="form-control" />
                            <select
                                value={formValue.role}
                                onChange={(e) => setFormValue({ ...formValue, role: e.target.value })}
                                className="form-control"
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <input type="email" placeholder="Email" value={formValue.email}
                                onChange={(e) => setFormValue({ ...formValue, email: e.target.value })}
                                className="form-control" />
                            <input type="password" placeholder="Password" value={formValue.password}
                                onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
                                className="form-control" />
                            <input type="text" placeholder="Section" value={formValue.section}
                                onChange={(e) => setFormValue({ ...formValue, section: e.target.value })}
                                className="form-control" />
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
