import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    registerCustomerProfile,
    selectCustomer,
    selectRegisterCustomerError,
    selectRegisterCustomerSuccess,
    setRegisterProfileSuccess
} from "../../../features/user/CustomerSlice.js";
import AvatarUser from "../AvatarUser.jsx";
import {FastField, Form, Formik} from "formik";
import {Button, input} from "@material-tailwind/react";
import InputProfile from "../../../ultility/customField/InputProfile.jsx";
import * as Yup from "yup";
import {useEffect} from "react";
import {FormGroup, Label} from "reactstrap";
import LockModal from "../../auth/LockModal.jsx";
import RemoveModal from "../../auth/RemoveModal.jsx";
import {lockUser, removeUser} from "../../../features/user/UserSlice.js";
import {selectUrlAvatar, setUrlAvatar} from "../../../features/FileSlice.js";
import {toastOptions} from "../../../ultility/toastOptions.js";
import {logoutUser, reLoginWithToken} from "../../../features/user/AuthSlice.js";


function RegisterCustomerProfile({
                                     user,
                                     phoneNumbers,
                                     idCards,
                                     receiptEmails,
                                     showLock, setShowLock,
                                     showRemove, setShowRemove,
                                     userLogout,
                                     userLock,
                                     userRemove,
                                     phoneRegex,
                                 }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const success = useSelector(selectRegisterCustomerSuccess);
    const error = useSelector(selectRegisterCustomerError);
    const urlAvatar = useSelector(selectUrlAvatar);

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required("This field is required."),

        phoneNumber: Yup.string()
            .test("unique", "Phone number already exists.", value => {
                return !phoneNumbers.includes(value);
            })
            .matches(phoneRegex, "Invalid phone number! Start from 0 and has 10 numbers.")
            .required("This field is required."),

        idCard: Yup.string()
            .test("unique", "Id card already exists.", value => {
                return !idCards.includes(value);
            })
            .required("This field is required."),

        receiptEmail: Yup.string()
            .test("unique", "Email already exists.", value => {
                return !receiptEmails.includes(value);
            })
            .email("Invalid email! Please add @.")
            .required("This field is required."),

        dateOfBirth: Yup.date().required("This field is required."),

        gender: Yup.string().required("This field is required."),

    })
    const initialValues = {
        fullName: "",
        phoneNumber: "",
        idCard: "",
        receiptEmail: "",
        dateOfBirth: "",
        gender: "",
        avatar: urlAvatar,

    }
    const handleSubmit = (values) => {
        dispatch(registerCustomerProfile(values));
    }
    const handleLock = () => {
        dispatch(lockUser(userLock));
        navigate("/");
        dispatch(logoutUser(userLogout))
    }
    const handleRemove = () => {
        dispatch(removeUser(userRemove));
        navigate("/")
        dispatch(logoutUser(userLogout));
    }
    useEffect(() => {
        if (success) {
            dispatch(reLoginWithToken());
            dispatch(setRegisterProfileSuccess())
            dispatch(setUrlAvatar());
            toast.success("🦄 Đăng ký thông tin thành công!", toastOptions);
        }
    }, [success]);
    useEffect(() => {
        if (error) {
            dispatch(setRegisterProfileSuccess())
            toast.error("🦄 Đăng ký thông tin thất bại!", toastOptions);
        }
    }, [error]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {formikProps => {
                const {values, errors, touched} = formikProps;
                return (
                    <FormGroup className="flex overflow-hidden">
                        <Form className="w-screen overflow-y-auto" method="POST"
                              onSubmit={formikProps.handleSubmit}>
                            <FormGroup className="flex">
                                <AvatarUser onChange={formikProps.handleChange}/>
                                <FormGroup className="w-3/4 p-10">
                                    <FormGroup className="border border-solid shadow-2xl rounded-md py-5 px-5 bg-white">
                                        <h2 className=" flex justify-center text-2xl font-serif leading-7 text-gray-900">
                                            Thông tin tài khoản</h2>
                                        <FormGroup className="grid grid-cols-2 gap-4 mt-4">
                                            <FormGroup>
                                                <FastField
                                                    name="username"
                                                    component={InputProfile}
                                                    placeholder={user.username}
                                                    label="Username"
                                                    disabled
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FastField
                                                    name="email"
                                                    component={InputProfile}
                                                    placeholder={user.email}
                                                    label="Email"
                                                    disabled
                                                />
                                            </FormGroup>
                                        </FormGroup>
                                    </FormGroup>
                                    <FormGroup
                                        className="border border-solid shadow-2xl rounded-md py-5 px-5 bg-white mt-5">
                                        <h2 className=" flex justify-center text-3xl font-serif leading-7 text-gray-900">
                                            Thông tin cá nhân</h2>
                                        <FormGroup className="grid grid-cols-2 gap-4 mt-4">
                                            <FormGroup>
                                                <FastField
                                                    name="fullName"
                                                    component={InputProfile}
                                                    onChange={formikProps.handleChange}
                                                    label="Họ và tên"
                                                    placeholder="Vui lòng nhập họ và tên"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FastField
                                                    type="tel"
                                                    name="phoneNumber"
                                                    component={InputProfile}
                                                    onChange={formikProps.handleChange}
                                                    label="Số điện thoại"
                                                    placeholder="Vui lòng nhập số điện thoại"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FastField
                                                    name="idCard"
                                                    component={InputProfile}
                                                    onChange={formikProps.handleChange}
                                                    label="CMND/CCCD/Hộ chiếu"
                                                    placeholder="Vui lòng nhập CMND/CCCD/Hộ chiếu"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FastField
                                                    type="email"
                                                    name="receiptEmail"
                                                    component={InputProfile}
                                                    onChange={formikProps.handleChange}
                                                    label="Email nhận vé"
                                                    placeholder="bestticket@gmail.com"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FastField
                                                    type="date"
                                                    name="dateOfBirth"
                                                    component={InputProfile}
                                                    onChange={formikProps.handleChange}
                                                    label="Ngày sinh"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="gender"
                                                       className="block text-1xl font-serif text-gray-700">
                                                    Giới tính</Label>
                                                <FormGroup className="mt-2">
                                                    <FormGroup className="flex items-center gap-x-3">
                                                        <input name="gender" type="radio"
                                                               value="Male" onChange={formikProps.handleChange}
                                                               className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                        <Label htmlFor="gender"
                                                               className="block text-sm font-medium leading-6 text-gray-900">Nam</Label>
                                                        <input name="gender" type="radio"
                                                               value="Female" onChange={formikProps.handleChange}
                                                               className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                        <Label htmlFor="gender"
                                                               className="block text-sm font-medium leading-6 text-gray-900">Nữ</Label>
                                                        <input name="gender" type="radio"
                                                               value="Other" onChange={formikProps.handleChange}
                                                               className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                        <Label htmlFor="gender"
                                                               className="block text-sm font-medium leading-6 text-gray-900">Khác</Label>
                                                    </FormGroup>
                                                </FormGroup>
                                            </FormGroup>
                                        </FormGroup>
                                    </FormGroup>

                                    <FormGroup className="mt-6 flex items-center justify-center gap-x-6 mx-auto">
                                        <Button type="button"
                                                onClick={() => navigate("/")}
                                                className="text-1xl px-3 py-2 text-white
                                                hover:bg-gray-600 focus-visible:outline
                                                focus-visible:outline-2 focus-visible:outline-offset-2
                                                focus-visible:outline-indigo-600">
                                            Thoát
                                        </Button>
                                        <Button type="submit" className="rounded-md bg-[#10b981] px-3 py-2 text-1xl
                                         text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2
                                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            Lưu thông tin
                                        </Button>
                                        <Button type="button"
                                                onClick={() => setShowLock(true)}
                                                className="rounded-md bg-[#10b981] px-3 py-2 text-1xl
                                         text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2
                                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            Khóa tài khoản
                                        </Button>
                                        {showLock && (
                                            <LockModal
                                                visible={showLock}
                                                onOk={handleLock}
                                                onCancel={() => setShowLock(false)}/>
                                        )}
                                        <Button type="button"
                                                onClick={() => setShowRemove(true)}
                                                className="rounded-md bg-[#10b981] px-3 py-2 text-1xl
                                         text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2
                                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            Xóa tài khoản
                                        </Button>
                                        {showRemove && (
                                            <RemoveModal
                                                visible={showRemove}
                                                onOk={handleRemove}
                                                onCancel={() => setShowRemove(false)}
                                            />
                                        )}
                                    </FormGroup>
                                </FormGroup>
                            </FormGroup>
                        </Form>
                    </FormGroup>
                );
            }}
        </Formik>
    );
}

export default RegisterCustomerProfile;