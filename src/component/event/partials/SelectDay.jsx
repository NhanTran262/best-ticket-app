import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {FaRegCalendarAlt} from "react-icons/fa";

const EventFilter = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [selectOption, setSelectOption] = useState("Tất cả các ngày");

    const handleChangeStart = (date) => {
        setStartDate(date);
    };

    const handleChangeEnd = (date) => {
        setEndDate(date);
    };

    const handleApplyFilters = () => {
        if (startDate && endDate) {
            const formattedStartDate = startDate.toLocaleDateString('en-GB');
            const formattedEndDate = endDate.toLocaleDateString('en-GB');
            setSelectOption(`${formattedStartDate}-${formattedEndDate}`);
        }
        setShowOptions(false);
    };

    const options = ['Tất cả các ngày', 'Hôm nay', 'Tuần tới', 'Tháng tới'];

    return (
        <div className="relative z-10 w-[250px] ">
            <div className="flex  border-2 border-gray-300 rounded-lg gap-2 cursor-pointer p-2"
                 onClick={() => setShowOptions(!showOptions)}>
                <FaRegCalendarAlt size={23}/>
                <div>
                    {selectOption}
                </div>
            </div>

            {showOptions && (
                <div className="absolute top-12 bg-white w-full rounded-lg">
                    {options.map((option, index) => (
                        <div key={index} onClick={() => setSelectOption(option)}
                             className="cursor-pointer hover:bg-green-200 p-2 rounded-lg ">
                            {option}
                        </div>
                    ))}
                    <div>
                        <div className="flex gap-2 cursor-pointer hover:bg-green-200 p-2 rounded-lg">
                            <p>Từ: </p>
                            <DatePicker
                                selected={startDate}
                                onChange={handleChangeStart}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Chọn ngày"
                            />
                        </div>
                        <div className="flex gap-2 cursor-pointer hover:bg-green-200 p-2 rounded-lg">
                            <p>Tới:</p>
                            <DatePicker
                                selected={endDate}
                                onChange={handleChangeEnd}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Chọn ngày"
                            />
                        </div>
                        <button onClick={handleApplyFilters} className="ml-2">Áp dụng</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventFilter;
