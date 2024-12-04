import {Avatar} from "@material-tailwind/react";
import {useDispatch, useSelector} from "react-redux";
import {FormGroup, Label} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {selectSuccess, setSuccess, uploadFirebase} from "../../features/FileSlice.js";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {selectUserLogin} from "../../features/user/AuthSlice.js";

export default function AvatarUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUserLogin);
    const success = useSelector(selectSuccess);
    const [image, setImage] = useState(null);
    const handlePreview = (e) => {
        const fileImage = e.target.files[0];
        setImage(URL.createObjectURL(fileImage));
        const formData = new FormData();
        formData.append("file", fileImage)
        dispatch(uploadFirebase(formData));
    }

    useEffect(() => {
        if (success) {
            toast.success("Tải ảnh thành công!");
            dispatch(setSuccess());
            navigate("/profile");
        }
    }, [success]);
    return (
        <FormGroup className="w-1/4">
            <FormGroup className="parent flex justify-center h-screen">
                <FormGroup className="image flex flex-col items-center">
                    <FormGroup className=" my-10 flex gap-x-3">
                        <Label htmlFor="file-upload">
                            <Avatar
                                src={image || user?.avatar}
                                size="sm"
                                className="mx-auto h-60 w-60 border border-solid shadow-xl"
                            />
                            <input
                                onChange={handlePreview}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"/>
                        </Label>
                    </FormGroup>
                </FormGroup>
            </FormGroup>
        </FormGroup>
    );
}