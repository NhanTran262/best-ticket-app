import React from 'react';
import iconHome from '../../assets/icon/iconHome.png';
import iconLiveMusic from '../../assets/icon/iconLiveMusic.png';
import iconCulture from '../../assets/icon/iconCulture.png';
import iconNightLife from '../../assets/icon/iconNightLife.png';
import iconCommunity from '../../assets/icon/iconCommunity.png';
import iconCourse from '../../assets/icon/iconCourse.png';
import iconAttractions from '../../assets/icon/iconAttractions.png';
import iconSport from '../../assets/icon/iconSport.png';
import iconEventHCM from '../../assets/icon/iconHCM.png';
import iconEventHN from '../../assets/icon/iconHN.png';
import {FaBuildingColumns, FaQuestion} from "react-icons/fa6";
import {FiUsers} from "react-icons/fi";
import {BsExclamationOctagon} from "react-icons/bs";
import {FaRegBuilding} from "react-icons/fa";
import {PiShieldStarDuotone} from "react-icons/pi";
import {IoShieldCheckmarkOutline} from "react-icons/io5";
import {LuPackageSearch} from "react-icons/lu";
import {LiaShippingFastSolid} from "react-icons/lia";
import {RiContactsBookLine} from "react-icons/ri";
import {TbBooks} from "react-icons/tb";
import {MdOutlinePayment} from "react-icons/md";

const UserSideBar = () => {
    const pathname = window.location.pathname;
    const icons = [
        {icon: iconHome, label: 'Home'},
        {icon: iconLiveMusic, label: 'Live Music'},
        {icon: iconCulture, label: 'Theater - Art Culture '},
        {icon: iconNightLife, label: 'Nightlife'},
        {icon: iconCommunity, label: 'Community'},
        {icon: iconCourse, label: 'Course'},
        {icon: iconAttractions, label: 'Attractions'},
        {icon: iconSport, label: 'Sport'},
        {icon: iconEventHCM, label: 'Event at Ho Chi Minh City'},
        {icon: iconEventHN, label: 'Event at Ha Noi'},

    ];
    const iconsFooter = [
        {icon: <BsExclamationOctagon/>, label: 'About us'},
        {icon: <FiUsers/>, label: 'For Organizer'},
        {icon: <FaQuestion/>, label: 'FAQ'},
        {icon: <FaRegBuilding/>, label: 'Operational regulations'},
        {icon: <PiShieldStarDuotone/>, label: 'Information privacy policy'},
        {icon: <FaBuildingColumns/>, label: 'Dispute settlement policy'},
        {icon: <IoShieldCheckmarkOutline/>, label: 'Payment privacy policy'},
        {icon: <LuPackageSearch/>, label: 'Return and Inspection policy'},
        {icon: <LiaShippingFastSolid/>, label: 'Shipping and Delivery conditions'},
        {icon: <RiContactsBookLine/>, label: 'Customer Terms of Use'},
        {icon: <TbBooks/>, label: 'Organize Terms of Use'},
        {icon: <MdOutlinePayment/>, label: 'Payment Methods'},

    ];

    return (

        <div className="w-[400px] flex-col p-1 md:flex overflow-hidden max-h-full h-full">
            <ul className="ml-2 flex-col gap-1 text-sm w-full max-h-full h-full overflow-y-auto">
                {icons.map(({icon, label}, index) => (
                    <li key={index} className="p-2 flex gap-2 items-center cursor-pointer
                    transition-transform transform-gpu
                     hover:bg-white
                    dark:hover:bg-gray-800
                    ">
                        <img src={icon} alt={`Icon ${index}`} className="h-6 w-6  "/>
                        <span>{label}</span>
                    </li>
                ))}
                <div>
                    <hr className="m-3 border-black dark:border-white"/>
                </div>
                {iconsFooter.map(({icon, label}, index) => (
                    <li key={index} className="p-2 flex gap-2 items-center cursor-pointer
                    transition-transform transform-gpu w-full h-fit
                    hover:bg-white
                    dark:hover:bg-gray-800
                    ">
                        {icon}
                        <span>{label}</span>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default UserSideBar;
