import React from 'react';
import LoadingBar from 'react-top-loading-bar';

const LoadingBarComponent = ({ progress }) => {
    return (
        <LoadingBar style={{ height: '4px' }} color="#BFD8AF" progress={progress} onLoaderFinished={() => progress = 0} />
    );
};

export default LoadingBarComponent;
