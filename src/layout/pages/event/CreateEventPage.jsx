import CreateEventSideBar from "../../../component/event/partials/CreateEventSideBar.jsx";
import {Outlet} from "react-router-dom";

const CreateEventPage = () => {
    return (
        <div className="flex h-screen">
            <CreateEventSideBar/>
            <div className="w-[75vw] overflow-y-auto">
                <Outlet/>
            </div>
        </div>
    )
}
export default CreateEventPage;
