import React from 'react';

const Error = () => {
    return (
        <div className="row justify-content-center">
            <div className="rounded text-center text-warning bg-dark p-2 mt-3">
                <h2 className="font-weight-bold">Ooops! Something went wrong!</h2>
                <p className="font-italic">Please try again later</p>
            </div>
        </div>
    );
}

export default Error;