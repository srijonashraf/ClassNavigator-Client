import React from 'react';

const FaButton = ({ element, color }) => {
    return (
        <div>
            <button className={`btn btn-${color} rounded-1 fs-3`}>{element}</button>
        </div>
    );
};

export default FaButton;