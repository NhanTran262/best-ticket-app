import {FaRegSave} from "react-icons/fa";
import {IoMdArrowRoundForward} from "react-icons/io";
import React from "react";

const CreateEventStep3 = () => {
    return (
        <div className="w-[75vw] overflow-y-auto ">
            <div className="w-[80%] flex items-center justify-center p-5 mx-auto gap-5 ">
                <div
                    className="cursor-pointer gap-2 flex-1 bg-green-600 flex items-center justify-center p-2 text-2xl text-white rounded-lg"
                >
                    <FaRegSave size={30}/>
                    <p>Lưu lại</p>
                </div>
                <div
                    className="cursor-pointer gap-2 flex-1 bg-green-600 flex items-center justify-center p-2 text-2xl text-white rounded-lg"
                    onClick={() => navigate('/event/create/step3')}>
                    <IoMdArrowRoundForward size={30}/>
                    <p>Hoàn tất</p>
                </div>
            </div>
        </div>
    )
}
export default CreateEventStep3
