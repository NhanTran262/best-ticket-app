import {useSelector} from "react-redux";
import {useState} from "react";
import UserFooter from "../../footer/UserFooter.jsx";
import FormEditCompany from "./FormEditCompany.jsx";
import FormEditPersonal from "./FormEditPersonal.jsx";
import {FormGroup, Label} from "reactstrap";
import {selectEditOrganizerError, selectEditOrganizerSuccess} from "../../../features/user/OrganizerSlice.js";

function EditOrganizerProfile({organizer}) {
    const [selected, setSelected] = useState("0");
    const success = useSelector(selectEditOrganizerSuccess);
    const error = useSelector(selectEditOrganizerError);
    const phoneRegex = /^0\d{9}$/;

    const handleSelectChange = (e) => {
        setSelected(e.target.value);
    }

    return (
        <FormGroup className="max-h-screen overflow-y-auto">
            <FormGroup className="max-h-full p-5">
                <h2 className="font-serif text-3xl p-5">
                    Đơn đăng ký ban tổ chức
                </h2>
                <FormGroup className="mt-2">
                    <FormGroup className="border border-solid shadow-lg rounded-md py-5 px-5 bg-white ">
                        <FormGroup className="sm:flex sm:items-center sm:gap-4 sm:justify-center">
                            <Label htmlFor="organizerTypeName"
                                   className="block text-1xl font-serif leading-6 text-gray-900 m-2">
                                Loại hình kinh doanh</Label>
                            <p className="text-red-900 text-2xl">*</p>
                            <select
                                id="organizerTypeName"
                                name="organizerTypeName"
                                autoComplete="organizerTypeName"
                                value={selected}
                                onChange={handleSelectChange}
                                className=" mt-1 block w-72 rounded-md border-0 py-2 pl-3 text-gray-900
                                shadow-md ring-1 ring-inset ring-gray-300 focus:ring-0 font-serif
                                focus:ring-inset focus:ring-indigo-600
                                sm:text-1xl sm:leading-6">
                                <option className="font-serif" value="0">Doanh nghiệp/Nhà tổ chức</option>
                                <option className="font-serif" value="1">Cá nhân</option>
                            </select>
                        </FormGroup>
                    </FormGroup>
                </FormGroup>
                {selected === "0" && <FormEditCompany
                    organizer={organizer}
                    phoneRegex={phoneRegex}
                    success={success}
                    error={error}
                />}
                {selected === "1" && <FormEditPersonal
                    organizer={organizer}
                    phoneRegex={phoneRegex}
                    success={success}
                    error={error}
                />}
            </FormGroup>
            <FormGroup><UserFooter/></FormGroup>
        </FormGroup>
    );
}

export default EditOrganizerProfile;