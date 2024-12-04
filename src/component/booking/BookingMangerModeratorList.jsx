import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEventById, selectEventById} from '../../features/EventSlice.js';
import UserFooter from "../footer/UserFooter.jsx";

export function BookingManagerModeratorList() {
    const dispatch = useDispatch();
    const event = useSelector(selectEventById);
    const eventId = useParams().eventId;

    useEffect(() => {
        dispatch(getEventById(eventId));
    }, [dispatch, eventId]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (<>
        <div className="w-[80%] mx-[10%] my-[5%] text-black">
            <div className="w-[80%] text-2xl">{event.name}</div>
            <div className="w-[80%]">{event.duration}</div>
            <hr className="my-5 border-0.5px border-black"/>
        </div>
        <div>
            <div
                className="w-[80%] mx-[10%] my-[5%] border bg-[#F6F6F6] p-3 text-left text-[#81C5AC] text-xl">NGƯỜI
                QUẢN LÝ
            </div>
            <table className="w-[80%] mx-[10%] my-[5%] text-black">
                <thead className="border-0">
                <tr>
                    <td>TÊN</td>
                    <td>VỊ TRÍ</td>
                    <td>THAO TÁC</td>
                </tr>
                </thead>
                <tbody>
                {event.organizer === null ? (<tr className="bg-[#F6F6F6]">
                    <td>
                        <div>Organizer information is not available</div>
                    </td>
                    <td>N/A</td>
                    <td>N/A</td>
                </tr>) : (<tr className="bg-[#F6F6F6]">
                    <td className="flex">
                        <div>
                            {event.organizer.name}
                            <br/>
                            {event.organizer.email}
                        </div>
                    </td>
                    <td>Event Creator</td>
                    <td></td>
                </tr>)}
                </tbody>
            </table>
        </div>
        <div className=""><UserFooter/></div>
    </>);
}
