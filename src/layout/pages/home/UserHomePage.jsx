import Content from "../../../component/content/Content.jsx";
import SideBar from "../../../component/sidebar/UserSideBar.jsx";

const UserHomePage = () => {

    return (
        <>
            <div className="h-full max-h-full overflow-y-auto">
                <SideBar/>
            </div>
            <div className="relative md:flex h-screen overflow-hidden w-full">
                <div className="flex-wrap overflow-y-auto w-full h-screen overflow-hidden">
                    <Content/>
                </div>
            </div>
        </>

    )
}
export default UserHomePage;
