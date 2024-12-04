import React from 'react';
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-5xl font-bold mb-4 text-red-500">
                4<span className="text-gray-500">0</span>3
            </div>
            <p className="text-2xl mb-8 text-gray-700">Forbidden</p>
            <p className="text-xl mb-8 text-gray-600">
                You don't have permission to access this page.
            </p>
            <Link
                to="/"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default ForbiddenPage;
