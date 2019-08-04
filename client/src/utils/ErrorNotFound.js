import React from 'react';

const Error = () => {
    return (
        <div className="row justify-content-center mt-3">
            <div className="rounded text-center text-warning bg-dark p-2 mt-3">
                <h2 className="font-weight-bold">Ooops! That page can’t be found.</h2>
                <p className="font-italic">It looks like nothing was found at this location. Try to use one of the links above.</p>
            </div>
        </div>
    );
}

export default Error;