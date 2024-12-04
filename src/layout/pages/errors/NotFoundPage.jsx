import {Link} from 'react-router-dom';

const NotFoundPage = () => {
    const goBack = () => {
        history.back();
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-5xl font-bold mb-4 text-red-500">
                4<span className="text-gray-500">0</span>4
            </div>
            <p className="text-2xl mb-8 text-gray-700">Sorry for the inconvenience!</p>
            <p className="text-xl mb-8 text-gray-600">Page is under construction.</p>
            <div>
                <button
                    onClick={goBack}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded m-2"
                >
                    Go to Previous Page
                </button>
                <Link
                    to="/"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
