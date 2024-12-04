import React from "react";
import {CiLocationOn} from "react-icons/ci";
import {GiDuration} from "react-icons/gi";
import {FaCalendarAlt} from "react-icons/fa";

const Event = ({event}) => {
    return (
        <div>
            <div
                className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-amber-100 cursor-pointer hover:scale-105 hover:bg-amber-50 transition p-3 m-3">
                <div className="relative aspect-w-16 aspect-h-9 w-full  rounded-md overflow-hidden">
                    <img src={event.image} alt="" className="object-cover h-[220px] w-full "/>
                </div>
                <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                    <p className="font-bold truncate w-full">
                        {event.name}
                    </p>
                    <p>20/2/2024</p>
                    <div className="flex mt-2 gap-1 items-center border-1 ">
                        <CiLocationOn/>
                        <p className="text-neutral-400 text-sm  w-full">
                            {event.address}
                        </p>
                    </div>
                    <div className="flex mt-2 gap-1 items-center">
                        <GiDuration/>
                        <p className="text-neutral-400 text-sm w-full">
                            {event.duration}
                        </p>
                        < FaCalendarAlt/>
                        <p>
                            20/2/2024
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Event
