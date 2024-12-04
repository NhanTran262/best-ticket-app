import {CiSearch} from 'react-icons/ci';
import {useState} from "react";
import {Link} from "react-router-dom";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = () => {
    };
    console.log(searchTerm)
    return (
        <div className="max-w-md mx-auto py-4 mt-2">
            <div className="relative text-gray-600">
                <input
                    type="search"
                    name="search"
                    placeholder="Bạn cần tìm gì ?"
                    className="border-green-600 border-[1px] h-11 px-5 w-[380px] pr-10 rounded-lg text-sm focus:outline-none flex"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to={`/search?q=${searchTerm}`} className="absolute right-0 top-0 mt-3 mr-4">
                    <CiSearch className="text-gray-600 h-5 w-5"/>
                </Link>
            </div>
        </div>
    );
};

export default SearchBar;
