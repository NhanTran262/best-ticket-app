import {FastField, Form, Formik} from "formik";
import AuthHeader from "../header/AuthHeader.jsx";
import {FormGroup} from "reactstrap";
import InputRegister from "../../ultility/customField/InputRegister.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {unlockUser} from "../../features/user/UserSlice.js";
import {toast} from "react-toastify";
import {selectEmails} from "../../features/user/ExistsSlice.js";
import {toastOptions} from "../../ultility/toastOptions.js";

export default function UnLockUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emails = useSelector(selectEmails);
    const initialValues = {
        email: "",
        validationCode: "",
    }
    const validationUnlockSchema = Yup.object().shape({
        email: Yup.string()
            .test("not exists ", "Email not exists", value => {
                return emails.includes(value)
            })
            .email("Invalid email.Please add @.")
            .required("This field is required."),
        validationCode: Yup.string().required("This field is required."),
    })

    const handleSubmit = (values) => {
        dispatch(unlockUser(values));
        toast.success("🦄 Mở khóa tài khoản thành công.", toastOptions)
        navigate("/login")
    }
    return (
        <Formik initialValues={initialValues}
                validationSchema={validationUnlockSchema}
                onSubmit={handleSubmit}>
            {formikProps => {
                const {values, errors, touched} = formikProps
                return (
                    <FormGroup className="flex bg-white rounded-lg  items-center  flex-1 flex-col justify-center lg:px-8
                             dark:bg-black dark:text-white">
                        <AuthHeader name={"Unlock Account"}/>
                        <FormGroup className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                            <Form className="space-y-6"
                                  method="POST"
                                  onSubmit={formikProps.handleSubmit}>
                                <FormGroup>
                                    <FastField
                                        type="email"
                                        name="email"
                                        component={InputRegister}
                                        label="Email đăng ký tài khoản"
                                        onChange={formikProps.handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        name="otp"
                                        component={InputRegister}
                                        label="Mã xác thực"
                                        onChange={formikProps.handleChange}/>
                                </FormGroup>
                                <FormGroup className="flex justify-center gap-3">
                                    <FormGroup className="w-full ">
                                        <FormGroup className="w-full">
                                            <button type="submit"
                                                    className="w-full btn btn-outline btn-primary dark:btn-info">
                                                Hoàn thành
                                            </button>
                                        </FormGroup>
                                        <FormGroup className="w-full">
                                            <button type="button" onClick={() => {
                                                navigate("/code-unlock")
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