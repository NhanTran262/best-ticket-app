import {FastField, Form, Formik} from "formik";
import InputProfile from "../../../ultility/customField/InputProfile.jsx";
import {FormGroup} from "reactstrap";
import {Button} from "@material-tailwind/react";
import * as Yup from "yup";
import {
    registerOrganizerProfile,
    setRegisterOrganizerError,
    setRegisterOrganizerSuccess
} from "../../../features/user/OrganizerSlice.js";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    selectCompanyBusinessCodes,
    selectCompanyEmails,
    selectCompanyNames,
    selectCompanyPhones
} from "../../../features/user/ExistsSlice.js";
import {useEffect} from "react";
import {toastOptions} from "../../../ultility/toastOptions.js";
import {reLoginWithToken} from "../../../features/user/AuthSlice.js";


export default function FormCompany({phoneRegex,success, error}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const companyNames = useSelector(selectCompanyNames);
    const companyEmails = useSelector(selectCompanyEmails);
    const companyPhones = useSelector(selectCompanyPhones);
    const businessCodes = useSelector(selectCompanyBusinessCodes);

    const initialValues = {
        businessCode: null,
        companyName: null,
        companyEmail: null,
        companyPhone: null,
        dateRange: null,
        issuedBy: null,
    }
    const validationCompanySchema = Yup.object().shape({
        companyEmail: Yup.string()
            .test("unique", "Email already exists.", value => {
                return !companyEmails.includes(value);
            })
            .email("Invalid email! Please add @.")
            .required("This field is required."),
        companyName: Yup.string()
            .test("unique", "Company name already exists.", value => {
                return !companyNames.includes(value);
            })
            .required("This field is required."),
        companyPhone: Yup.string()
            .test("unique", "Company phone number already exists.", value => {
                return !companyPhones.includes(value);
            })
            .matches(phoneRegex, "Invalid phone number! Start from 0 and has 10 numbers.")
            .required("This field is required."),
        businessCode: Yup.string()
            .test("unique", "Business code already exists.", value => {
                return !businessCodes.includes(value);
            })
            .required("This field is required."),
        dateRange: Yup.date().required("This field is required."),
        issuedBy: Yup.string().required("This field is required."),
    })
    const handleSubmit = (values) => {
        dispatch(registerOrganizerProfile(values));
    }

    useEffect(() => {
        if (success) {
            dispatch(reLoginWithToken());
            dispatch(setRegisterOrganizerSuccess());
            toast.success("🦄 Đăng ký thông tin thành công!", toastOptions)
            navigate("/my-event/legal/createdEvent")
        }
    }, [success]);
    useEffect(() => {
        if (error) {
            dispatch(setRegisterOrganizerError());
            toast.error("🦄 Đăng ký thông tin thất bại!", toastOptions)
        }
    }, [error]);
    return (
        <Formik validationSchema={validationCompanySchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
        >
            {formikProps => {
                const {values, errors, touched} = formikProps;
                return (
                    <Form method="POST"
                          onSubmit={formikProps.handleSubmit}>
                        <h4 className="font-serif text-2xl p-5">Thông tin cơ bản</h4>
                        <FormGroup className="border border-solid shadow-2xl rounded-md py-5 px-5 bg-white">
                            <FormGroup className="grid grid-cols-2 gap-4">
                                <FormGroup>
                                    <FastField
                                        type="text"
                                        name="companyName"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Tên doanh nghiệp"
                                        placeholder="Vui lòng nhập tên doanh ngiệp"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        name="businessCode"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Mã số đăng ký kinh doanh"
                                        placeholder="Vui lòng nhập mã số đăng ký kinh doanh"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        type="date"
                                        name="dateRange"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Ngày cấp"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        name="issuedBy"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Nơi Cấp"
                                        placeholder="Vui lòng nhập nơi cấp"
                                    />
                                </FormGroup>
                            </FormGroup>
                        </FormGroup>
                        <h4 className="font-serif text-2xl p-5">Thông tin liên hệ</h4>
                        <FormGroup className="border border-solid shadow-2xl rounded-md py-5 px-5 bg-white">
                            <FormGroup className="grid grid-cols-2 gap-4">
                                <FormGroup>
                                    <FastField
                                        type="tel"
                                        name="companyPhone"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Số điện thoại"
                                        placeholder="Vui lòng nhập số điện thoại"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        type="email"
                                        name="companyEmail"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Email"
                                        placeholder="bestticket@example.com"
                                    />
                                </FormGroup>
                            </FormGroup>
                        </FormGroup>
                        <Button type="submit"
                                className=" mt-4 block w-60 rounded-full  shadow-sm text-center text-white text-1xl
                                    px-3 py-2 bg-[#10b981] border-0 hover:bg-gray-600 focus-visible:outline
                                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Lưu thông tin
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
}
