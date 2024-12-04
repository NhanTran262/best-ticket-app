import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {FaRegSave} from "react-icons/fa";
import {IoCheckmarkDoneCircleOutline} from "react-icons/io5";
import {Input} from "@material-tailwind/react";
const CreateEventStep2 = () => {
    const [ticketTypes, setTicketTypes] = useState([]);
    const [ticketTypeName, setTicketTypeName] = useState("");
    const [showTicketDetails, setShowTicketDetails] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="w-[75vw] overflow-y-auto h-screen flex flex-col  items-center">
            <div className="w-[80%] flex items-center justify-center p-5 mx-auto gap-5 ">
                <div className="w-full flex  p-5 mx-auto gap-5">
                    <div className="flex-1">
                        <DateTimePicker
                            className="w-full"
                            label="Ngày và giờ bắt đầu mở bán vé"
                            disablePast
                        />
                    </div>
                    <div className="flex-1">
                        <DateTimePicker
                            className="w-full"
                            label="Ngày và giờ kết thúc bán vé "
                        />
                    </div>
                </div>
            </div>
            <div className="rounded-lg bg-gray-300 w-[80%] p-3 flex-col mb-2 border-gray-600 border-2">
                <h1 className="text-center mb-2 font-semibold">VÉ VÍP</h1>
                <div className="flex gap-3 justify-between">
                    <div className="bg-white flex-grow">
                        <Input
                            label="Giá vé (VND)"
                            type="number"
                            required
                            min="0"
                        />
                    </div>
                    <div className="bg-white flex-grow">
                        <Input
                            label="Số lượng vé"
                            type="number"
                            required
                            min="1"
                        />
                    </div>
                </div>
                <textarea
                    name="Thông tin vé"
                    rows="3"
                    className="mt-1 p-2 border rounded-md w-full border-gray-400"
                    placeholder="Chi tiết về vé"
                />
            </div>
            <div className="rounded-lg bg-gray-300 w-[80%] p-3 flex-col mb-2 border-gray-600 border-2">
                <h1 className="text-center mb-2 font-semibold">VÉ HANG</h1>
                <div className="flex gap-3 justify-between">
                    <div className="bg-white flex-grow">
                        <Input
                            label="Giá vé (VND)"
                            type="number"
                            required
                            min="0"
                        />
                    </div>
                    <div className="bg-white flex-grow">
                        <Input
                            label="Số lượng vé"
                            type="number"
                            required
                            min="1"
                        />
                    </div>
                </div>
                <textarea
                    name="Thông tin vé"
                    rows="3"
                    className="mt-1 p-2 border rounded-md w-full border-gray-400"
                    placeholder="Chi tiết về vé"
                />
            </div>
            <div className="rounded-lg bg-gray-300 w-[80%] p-3 flex-col mb-2 border-gray-600 border-2">
                <h1 className="text-center mb-2 font-semibold">VÉ HẠNG 2</h1>
                <div className="flex gap-3 justify-between">
                    <div className="bg-white flex-grow">
                        <Input
                            label="Giá vé (VND)"
                            type="number"
                            required
                            min="0"
                        />
                    </div>
                    <div className="bg-white flex-grow">
                        <Input
                            label="Số lượng vé"
                            type="number"
                            required
                            min="1"
                        />
                    </div>
                </div>
                <textarea
                    name="Thông tin vé"
                    rows="3"
                    className="mt-1 p-2 border rounded-md w-full border-gray-400"
                    placeholder="Chi tiết về vé"
                />
            </div>
            <div className="w-[80%] flex items-center justify-center p-5 mx-auto gap-5 ">
                <div className="cursor-pointer gap-2 flex-1 bg-green-600 flex items-center justify-center p-2 text-2xl text-white rounded-lg"
                >
                    <FaRegSave size={30} />
                    <p>Lưu lại</p>
                </div>
                <div className="cursor-pointer gap-2 flex-1 bg-green-600 flex items-center justify-center p-2 text-2xl text-white rounded-lg"
                     onClick={() => navigate('/event/create/step3')}>
                    <IoCheckmarkDoneCircleOutline size={30} />
                    <p>Tiếp tục</p>
                </div>
            </div>
        </div>
    );
};

export default CreateEventStep2;
