import {FastField, Form, Formik} from "formik";
import AuthHeader from "../header/AuthHeader.jsx";
import {FormGroup} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import InputRegister from "../../ultility/customField/InputRegister.jsx";
import {sendMailCode} from "../../features/user/UserSlice.js";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {selectEmails} from "../../features/user/ExistsSlice.js";
import {toastOptions} from "../../ultility/toastOptions.js";

export default function SendCodeValidationForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emails = useSelector(selectEmails);
    const initialValues = {
        email: "",
    }
    const validationSendOtpSchema = Yup.object().shape({
        email: Yup.string()
            .test("not exists ", "Email not exists", value => {
                return emails.includes(value)
            })
            .email("Invalid email! Please add @.")
            .required("This field is required.")
    })

    const handleSubmit = (values) => {
        dispatch(sendMailCode(values))
        toast.success("🦄 Vui lòng kiểm tra mail để nhận mã otp", toastOptions);
        navigate("/forgot-password")
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSendOtpSchema}
            onSubmit={handleSubmit}>
            {formikProps => {
                const {values, errors, touched} = formikProps
                return (
                    <FormGroup className="flex bg-white rounded-lg  items-center  flex-1 flex-col justify-center lg:px-8
                             dark:bg-black dark:text-white">
                        <AuthHeader name={"OTP"}/>
                        <FormGroup className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                            <Form className="space-y-6"
                                  method="POST"
                                  onSubmit={formikProps.handleSubmit}>
                                <FormGroup>
                                    <FastField
                                        type="email"
                                        name="email"
                                        component={InputRegister}
                                        label="Email nhận mã xác thực"
                                        onChange={formikProps.handleChange}/>
                                </FormGroup>
                                <FormGroup className="flex justify-center gap-3">
                                    <FormGroup className="w-full ">
                                        <FormGroup className="w-full">
                                            <button type="submit"
                                                    className="w-full btn btn-outline btn-primary dark:btn-info">
                                                Gửi
                                            </button>
                                        </FormGroup>
                                        <FormGroup className="w-full">
                                            <button type="button" onClick={() => {
                                                navigate("/login")
                                            }}
                                                    className="w-full btn btn-outline btn-primary dark:btn-info">
                                                Quay lại
                                            </button>
                                        </FormGroup>
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