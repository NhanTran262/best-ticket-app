import {useSelector} from "react-redux";
import EditOrganizerProfile from "./edit/EditOrganizerProfile.jsx";
import RegisterOrganizerProfile from "./add/RegisterOrganizerProfile.jsx";
import {selectUserLogin} from "../../features/user/AuthSlice.js";

export default function OrganizerProfile() {
    const user = useSelector(selectUserLogin);
    return (
        <>
            {
                user?.organizer ? (
                    <EditOrganizerProfile organizer={user?.organizer}/>
                ) : (
                    <RegisterOrganizerProfile/>
                )
            }
        </>
    );
}