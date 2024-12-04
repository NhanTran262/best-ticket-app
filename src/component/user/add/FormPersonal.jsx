import {FastField, Form, Formik} from "formik";
import InputProfile from "../../../ultility/customField/InputProfile.jsx";
import {FormGroup} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {
    registerOrganizerProfile,
    setRegisterOrganizerError,
    setRegisterOrganizerSuccess
} from "../../../features/user/OrganizerSlice.js";
import {toast} from "react-toastify";
import {Button} from "@material-tailwind/react";
import {
    selectPersonEmails,
    selectPersonIdCards,
    selectPersonPhoneNumbers,
    selectPersonTaxCodes
} from "../../../features/user/ExistsSlice.js";
import {useEffect} from "react";
import {toastOptions} from "../../../ultility/toastOptions.js";
import {reLoginWithToken} from "../../../features/user/AuthSlice.js";

export default function FormPersonal({phoneRegex, success, error}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const personPhones = useSelector(selectPersonPhoneNumbers);
    const personEmails = useSelector(selectPersonEmails);
    const personIdCards = useSelector(selectPersonIdCards);
    const personTaxCodes = useSelector(selectPersonTaxCodes);
    const initialValues = {
        name: null,
        email: null,
        phoneNumber: null,
        idCard: null,
        taxCode: null,
        dateRangeTaxCode: null,
        issuedByTaxCode: null,
    }

    const validationPersonalSchema = Yup.object().shape({
        name: Yup.string().required("This field is required."),
        email: Yup.string()
            .test("unique", "Email already exists.", value => {
                return !personEmails.includes(value)
            })
            .email("Invalid email! Please add @.")
            .required("This field is required."),

        phoneNumber: Yup.string()
            .test("unique", "Phone number already exists.", value => {
                return !personPhones.includes(value);
            })
            .matches(phoneRegex, "Invalid phone number! Start from 0 and has 10 numbers.")
            .required("This field is required."),

        idCard: Yup.string()
            .test("unique", "Id card already exists.", value => {
                return !personIdCards.includes(value);
            })
            .required("This field is required."),
        taxCode: Yup.string()
            .test("unique", "Tax code already exists.", value => {
                return !personTaxCodes.includes(value);
            })
            .required("This field is required."),
        dateRangeTaxCode: Yup.date().required("This field is required."),
        issuedByTaxCode: Yup.string().required("This field is required."),
    })

    useEffect(() => {
        if (success) {
            dispatch(reLoginWithToken());
            dispatch(setRegisterOrganizerSuccess());
            toast.success("🦄 Đăng ký thông tin thành công!", toastOptions);
            navigate("/my-event/legal/createdEvent");
        }
    }, [success]);
    useEffect(() => {
        if (error) {
            dispatch(setRegisterOrganizerError());
            toast.error("🦄 Đăng ký thông tin thất bại!", toastOptions)
        }
    }, [error]);
    const handleSubmit = (values) => {
        dispatch(registerOrganizerProfile(values));
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationPersonalSchema}
            onSubmit={handleSubmit}>
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
                                        name="name"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Họ và tên"
                                        placeholder="Vui lòng nhập họ và tên"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        name="taxCode"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Mã số thuế cá nhân"
                                        placeholder="Vui lòng nhập mã số thuế cá nhân"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        name="idCard"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="CMNN/CCCD/Hộ chiếu"
                                        placeholder="Vui lòng nhập CMNN/CCCD/Hộ chiếu"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        type="date"
                                        name="dateRangeTaxCode"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Ngày cấp"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        name="issuedByTaxCode"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Nơi cấp"
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
                                        name="phoneNumber"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Số điện thoại"
                                        placeholder="Vui lòng nhập số điện thoại"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        type="email"
                                        name="email"
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