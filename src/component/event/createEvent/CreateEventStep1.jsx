import React, {useEffect, useState} from "react";
import banner from "../../../assets/img/cover-event.jpg";
import {Input, Option, Select} from "@material-tailwind/react";
import SelectEvent from "../partials/SelectEvent.jsx";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {findAllEventType} from "../../../api/EventTypeApi.js";
import {getDistrict, getProvince} from "../../../api/ProvincesApi.js";
import {CalculateDuration} from "../../../ultility/customHook/calculateDuration.js";
import {addEvent} from "../../../features/EventSlice.js";
import {toast} from "react-toastify";
import {FaRegSave} from "react-icons/fa";
import {IoMdArrowRoundForward} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {selectOrganizer} from "../../../features/user/OrganizerSlice.js";

const CreateEventStep1 = () => {
    const navigate = useNavigate();
    const [eventTypes, setEventTypes] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [district, setDistrict] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [address, setAddress] = useState("");
    const [selectedEventTypes, setSelectedEventTypes] = useState([]) //string
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("")
    const dispatch = useDispatch();
    const organizer = useSelector(selectOrganizer)

    const fetchApiEventTypes = async () => {
        try {
            const result = await findAllEventType();
            setEventTypes(result.data.eventTypeList);
        } catch (error) {
            console.error('Error EventTypeAPI', error);
        }
    };
    useEffect(() => {
        fetchApiEventTypes();
    }, []);

    useEffect(() => {
        const fetchProvince = async () => {
            const ProvincesData = await getProvince();
            setProvinces(ProvincesData.results);
        }
        fetchProvince();
    }, []);
    const selectedData = (data) => {
        setSelectedEventTypes(data);
    }
    const handleDistrict = async (selectedProvince) => {
        try {
            const provinceId = provinces.find(province => province.province_name === selectedProvince)?.province_id;

            if (provinceId) {
                const DistrictData = await getDistrict(provinceId);
                setDistrict(DistrictData.results);
                console.log(DistrictData);
            }
        } catch {
            console.error("loi api");
        }
    };
    const handleCreateEvent = () => {
        if (!eventName || !address || !selectedProvince || !selectedDistrict || !selectedEventTypes) {
            return (
                alert("Vui liền điền đầy đủ các trường")
            );
        }
        const dateTimeFormat = "YYYY-MM-DDTHH:mm:ss";
        const startDateTime = dayjs(startDate, {dateFormat: dateTimeFormat});
        const endDateTime = dayjs(endDate, {dateFormat: dateTimeFormat});
        const duration = CalculateDuration(startDateTime, endDateTime)
        const eventRequest = {
            name: eventName,
            description: eventDescription,
            status: 'PENDING_APPROVAL',
            duration: duration,
            image: "https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/168134/Originals/cach-tao-dang-chup-anh-tet%20(1).jpg",
            province: selectedProvince,
            district: selectedDistrict,
            address: address,
            startDateTime: startDateTime.format(dateTimeFormat),
            eventTypeNames: selectedEventTypes,
            organizerId: organizer.id
        };
        dispatch(addEvent(eventRequest))
            .then((response) => {
                console.log(response)
                toast.success('Event created successfully', {
                    position: toast.POSITION.TOP_CENTER,
                });
            })
            .catch((error) => {
                console.error('Error creating event:', error);
                toast.error('Error creating event', {
                    position: toast.POSITION.TOP_CENTER,
                });
            });
    }
    console.log(selectedProvince)
    console.log(district)
    return (
        <div className="w-[75vw] overflow-y-auto ">
            <div className=" mx-auto">
                <div className="relative overflow-hidden">
                    <img src={banner} className="w-full  object-cover" alt=""/>
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500 opacity-50"></div>
                    <div className="absolute inset-0 p-5 flex flex-col items-center justify-center text-white">
                        <h1 className="text-4xl font-bold mb-4">Tải ảnh bìa lên</h1>
                        <p className="text-lg">giới hạn kích thước là 1MB</p>
                    </div>
                </div>
                <h1 className="text-center mt-5 text-2xl font-bold">Thông tin sự kiện</h1>
                <div className="w-[80%] p-5 mx-auto">
                    <Input
                        label="Event Name"
                        required
                        value={eventName}
                        onChange={(e) => {
                            setEventName(e.target.value)
                        }}/>
                </div>
                <div className="w-[80%] flex flex-col md:flex-row gap-5 p-5 mx-auto">
                    <Select
                        label="Tỉnh thành"
                        onChange={(value) => {
                            setSelectedProvince(value);
                            handleDistrict(value);
                            console.log(value);
                        }}
                    >
                        {provinces.map((province) => (
                            <Option key={province.province_id} value={province.province_name}>
                                {province.province_name}
                            </Option>
                        ))}
                    </Select>
                    <Select
                        label="Quận huyện"
                        onChange={(value) => {
                            setSelectedDistrict(value);
                        }}
                    >
                        {district.map((districtItem) => (
                            <Option key={districtItem.district_id} value={districtItem.district_name}>
                                {districtItem.district_name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="w-[80%] p-5 mx-auto">
                    <Input
                        label="Địa chỉ chi tiết"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                    />
                </div>
                <SelectEvent eventTypes={eventTypes} callback={selectedData}/>
                <div className="w-[80%] flex gap-5 mx-auto">
                    <div className="p-4 w-full">
                        <label htmlFor="EventDetail" className="block text-sm font-medium text-gray-700">
                            Thông tin sự kiện
                        </label>
                        <textarea
                            id="EventDetail"
                            name="EventDetail"
                            rows="5"
                            className="mt-1 p-2 border rounded-md w-full border-gray-400"
                            placeholder="Chi tiết về sự kiện..."
                            value={eventDescription}
                            onChange={(e) => {
                                setEventDescription(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="w-[80%] flex  p-5 mx-auto gap-5">
                    <div className="flex-1">
                        <DateTimePicker
                            className="w-full"
                            label="Ngày và giờ bắt đầu sự kiện"
                            disablePast
                            value={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                            }}
                        />
                    </div>
                    <div className="flex-1">
                        <DateTimePicker
                            className="w-full"
                            label="Ngày và giờ kết thúc sự kiện"
                            minDate={startDate}
                            value={endDate}
                            onChange={(date) => {
                                setEndDate(date);
                            }}
                        />
                    </div>
                </div>
                <div className="w-[80%] flex items-center justify-center p-5 mx-auto gap-5 ">
                    <div
                        className="cursor-pointer gap-2 flex-1 bg-green-600 flex items-center justify-center p-2 text-2xl text-white rounded-lg"
                        onClick={handleCreateEvent}>
                        <FaRegSave size={30}/>
                        <p>Lưu lại</p>
                    </div>
                    <div
                        className="cursor-pointer gap-2 flex-1 bg-green-600 flex items-center justify-center p-2 text-2xl text-white rounded-lg"
                        onClick={() => navigate('step2')}>
                        <IoMdArrowRoundForward size={30}/>
                        <p>Tiếp tục</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default CreateEventStep1
