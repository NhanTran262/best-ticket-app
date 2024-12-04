import {useNavigate} from "react-router-dom";
import AuthHeader from "../header/AuthHeader.jsx";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {selectCustomerPhoneNumbers, selectEmails, selectUsernames} from "../../features/user/ExistsSlice.js";
import {FastField, Form, Formik} from "formik";
import InputRegister from "../../ultility/customField/InputRegister.jsx";
import {FormGroup} from "reactstrap";
import * as Yup from "yup";
import {useEffect} from "react";
import {toastOptions} from "../../ultility/toastOptions.js";
import {
    registerUser,
    selectRegisterError,
    selectRegisterSuccess,
    setRegisterError,
    setRegisterSuccess
} from "../../features/user/AuthSlice.js";


function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usernames = useSelector(selectUsernames);
    const emails = useSelector(selectEmails);
    const phoneNumbers = useSelector(selectCustomerPhoneNumbers);
    const success = useSelector(selectRegisterSuccess);
    const error = useSelector(selectRegisterError);
    const regexPassword = /^(?=.*[A-Za-z])[A-Za-z\d]{6,}$/;
    const regexPhoneNumber = /^0\d{9}$/;

    const initialValues = {
        username: "",
        email: "",
        phoneNumber: null,
        password: "",
        confirmPassword: "",
    }
    const handleSubmit = (values) => {
        dispatch(registerUser(values));
    }


    const validationRegisterSchema = Yup.object().shape({
        username: Yup.string()
            .test("unique", "Username already exists.", value => {
                return !usernames.includes(value)
            })
            .required("This field is required."),
        email: Yup.string()
            .test("unique", "Email already exists.", value => {
                return !emails.includes(value)
            })
            .email("Invalid email! Please add @.")
            .required("This field is required."),
        phoneNumber: Yup.string()
            .test("unique", "Phone number already exists.", value => {
                if (value === null) {
                    return true;
                }
                return !phoneNumbers.includes(value)
            })
            .matches(regexPhoneNumber, "Invalid phone number! Start from 0 and has 10 numbers.")
            .nullable(),
        password: Yup.string()
            .matches(regexPassword, "6-character password consisting of letters and numbers")
            .required("This field is required."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Password not match.")
            .matches(regexPassword, "6-character password consisting of letters and numbers")
            .required("This field is required."),
    })

    useEffect(() => {
        if (success) {
            dispatch(setRegisterSuccess());
            toast.success("🦄 Đăng ký thành công", toastOptions);
            navigate("/login");
        }
    }, [success]);
    useEffect(() => {
        if (error) {
            dispatch(setRegisterError());
            toast.error("🦄 Đăng ký thất bại!", toastOptions);
        }
    }, [error]);
    console.log(success)
    console.log(error)
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationRegisterSchema}
            onSubmit={handleSubmit}>
            {formikProps => {
                const {values, errors, touched} = formikProps;
                return (
                    <FormGroup className="flex bg-white rounded-lg items-center  flex-1 flex-col justify-center lg:px-8
                                        dark:bg-black dark:text-white">
                        <AuthHeader name={"Registration"}/>
                        <FormGroup className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                            <Form className="space-y-6" method="POST" onSubmit={formikProps.handleSubmit}>
                                <FormGroup>
                                    <FastField
                                        name="username"
                                        component={InputRegister}
                                        label="Username"
                                        onChange={formikProps.handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        type="email"
                                        name="email"
                                        component={InputRegister}
                                        label="Email"
                                        onChange={formikProps.handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        name="phoneNumber"
                                        component={InputRegister}
                                        label="Phone number"
                                        onChange={formikProps.handleChange}/>
                                </FormGroup>

                                <FormGroup>
                                    <FastField
                                        type="password"
                                        name="password"
                                        component={InputRegister}
                                        label="Password"
                                        onChange={formikProps.handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        type="password"
                                        name="confirmPassword"
                                        component={InputRegister}
                                        label="Confirm password"
                                        onChange={formikProps.handleChange}/>
                                </FormGroup>
                                <FormGroup className="flex justify-center gap-3">
                                    <FormGroup className="w-full ">
                                        <FormGroup className="w-full">
                                            <button type="submit"
                                                    className="w-full btn btn-outline btn-primary dark:btn-info"
                                            >Register
                                            </button>
                                        </FormGroup>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup className="w-full flex justify-between text-sm">
                                    <FormGroup className="flex">
                            <span className="mx-2 font-bold">
                                Have account ?
                            </span>
                                        <span className="cursor-pointer hover:text-gray-500 font-bold text-blue-500"
                                              onClick={() => navigate("/login")}>Login</span>
                                    </FormGroup>
                                </FormGroup>
                            </Form>
                        </FormGroup>
                    </FormGroup>
                );
            }}
        </Formik>
    );
}

export default Register;
