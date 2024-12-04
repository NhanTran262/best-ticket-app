import PropTypes from "prop-types";
import {ErrorMessage} from "formik";
import {FormFeedback, FormGroup, Label} from "reactstrap";

InputRegister.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
};
InputRegister.defaultProps = {
    type: "text",
    label: "",
    placeholder: "",


};
export default function InputRegister(props) {
    const {
        field, form,
        type,
        label,
        placeholder,
    } = props;
    const {name} = field;
    const {errors, touched} = form;
    const showError = errors[name] && touched[name];
    return (
        <FormGroup>
            <FormGroup className="flex items-center justify-between">
                <Label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900
                                       hover:text-gray-500 cursor-pointer
                                       dark:text-white">
                    {label}
                    {showError &&
                        <span className="m-2 text-red-500 text-1xl">*</span>}
                </Label>
            </FormGroup>
            <FormGroup className="mt-2">
                <input
                    id={name}
                    {...field}

                    type={type}
                    placeholder={placeholder}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                                 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                                 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                                 dark:bg-gray-400 dark:text-black"/>
            </FormGroup>
            <ErrorMessage name={name}
                          component={FormFeedback}
                          className="text-sm font-serif text-red-500"/>
        </FormGroup>
    )
}