import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {FastField, Form, Formik} from "formik";
import {FormGroup} from "reactstrap";
import InputProfile from "../../../ultility/customField/InputProfile.jsx";
import {Button} from "@material-tailwind/react";
import {
    editOrganizerProfile,
    setEditOrganizerError,
    setEditOrganizerSuccess
} from "../../../features/user/OrganizerSlice.js";
import {
    selectPersonEmails,
    selectPersonIdCards,
    selectPersonPhoneNumbers,
    selectPersonTaxCodes
} from "../../../features/user/ExistsSlice.js";
import {reLoginWithToken} from "../../../features/user/AuthSlice.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function FormEditPersonal({
                                             organizer,
                                             phoneRegex,
                                             toastOptions,
                                             success,
                                             error,
                                             organizerEdited,
                                         }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false)
    const personPhones = useSelector(selectPersonPhoneNumbers);
    const personEmails = useSelector(selectPersonEmails);
    const personIdCards = useSelector(selectPersonIdCards);
    const personTaxCodes = useSelector(selectPersonTaxCodes);
    const {
        name: currentName,
        email: currentEmail,
        phoneNumber: currentPhoneNumber,
        idCard: currentIdCard,
        taxCode: currentTaxCode,
        dateRangeTaxCode: currentDateRangeTaxCode,
        issuedByTaxCode: currentIssuedByTaxCode,
    } = organizer
    const initialValues = {
        name: currentName || null,
        email: currentEmail || null,
        phoneNumber: currentPhoneNumber || null,
        idCard: currentIdCard || null,
        taxCode: currentTaxCode || null,
        dateRangeTaxCode: currentDateRangeTaxCode || null,
        issuedByTaxCode: currentIssuedByTaxCode || null,
    }

    const validationPersonalSchema = Yup.object().shape({
        name: Yup.string().nullable(),
        email: Yup.string()
            .test("unique", "Email already exists.", value => {
                return !personEmails.includes(value) || value === currentEmail;
            })
            .email("Invalid email! Please add @.")
            .nullable(),

        phoneNumber: Yup.string()
            .test("unique", "Phone number already exists.", value => {
                return !personPhones.includes(value) || value === currentPhoneNumber;
            })
            .matches(phoneRegex, "Invalid phone number! Start from 0 and has 10 numbers.")
            .nullable(),

        idCard: Yup.string()
            .test("unique", "Id card already exists.", value => {
                return !personIdCards.includes(value) || value === currentIdCard;
            })
            .nullable(),
        taxCode: Yup.string()
            .test("unique", "Tax code already exists.", value => {
                return !personTaxCodes.includes(value) || value === currentTaxCode;
            })
            .nullable(),
        dateRangeTaxCode: Yup.date().nullable(),
        issuedByTaxCode: Yup.string().nullable(),
    })
    const handleSubmit = (values) => {
        dispatch(editOrganizerProfile(values));
    }
    const toggleEditMode = () => {
        setIsEditMode(prev => !prev);
    };

    useEffect(() => {
        if (success) {
            dispatch(reLoginWithToken());
            dispatch(setEditOrganizerSuccess());
            setIsEditMode(false);
            toast.success("🦄 Cập nhật thông tin thành công!", toastOptions);
        }
    }, [success]);
    useEffect(() => {
        if (error) {
            dispatch(setEditOrganizerError());
            toast.error("🦄 Cập nhật thông tin thất bại!", toastOptions);
        }
    }, []);
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
                                        type="text"
                                        name="name"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Họ và tên"
                                        placeholder="Vui lòng nhập họ và tên"
                                        disabled={isEditMode}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        type="text"
                                        name="taxCode"
                                        component={InputProfile}
                                        onChange={formikProps.handleChange}
                                        label="Mã số thuế cá nhân"
                                        placeholder="Vui lòng nhập mã số thuế cá nhân"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        type="text"
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
                                        disabled={!isEditMode}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FastField
                                        type="text"
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
                                className={classNames(
                                    isEditMode ? "mt-4 block w-60 rounded-full shadow-sm text-center text-white text-1xl"
                                        + " px-3 py-2 bg-[#10b981] border-0 hover:bg-gray-600 focus-visible:outline"
                                        + "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        : "hidden"
                                )}>
                            {isEditMode ? "Hoàn thành" : "Chỉnh sửa"}
                        </Button>
                        <Button type="button" onClick={toggleEditMode}
                                className={classNames(
                                    isEditMode ? "hidden" : "mt-4 block w-60 rounded-full shadow-sm text-center text-white text-1xl"
                                        + " px-3 py-2 bg-[#10b981] border-0 hover:bg-gray-600 focus-visible:outline"
                                        + "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                )}>
                            {isEditMode ? "Hoàn thành" : "Chỉnh sửa"}
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
}