import React from 'react';
import { Toaster } from 'react-hot-toast';
import { errorToast, successToast } from '../../helper/ToasterHelper';

const ToastMessage = ({ type, message }) => {

    if (type === "error") {
        errorToast(message);
    } else if (type === "success") {
        successToast(message);
    }

    return (
        <div>
            <Toaster position="bottom-center" />
        </div>
    );
};

export default ToastMessage;