import PropTypes from "prop-types";
import {ErrorMessage} from "formik";
import {FormFeedback, FormGroup, Label} from "reactstrap";

InputProfile.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
};
InputProfile.defaultProps = {
    type: "text",
    label: "",
    placeholder: "",
    className: "",
    disabled: false,
};
export default function InputProfile(props) {
    const {
        field, form,
        type,
        label,
        placeholder,
        disabled,
        hidden,
    } = props;
    const {name} = field;
    const {errors, touched} = form;
    const showError = errors[name] && touched[name];
    return (
        <FormGroup>
            <Label htmlFor={name} className="block text-1xl font-serif text-gray-700">
                {label}
                {showError &&
                    <span className="m-2 text-red-500 text-1xl">*</span>}
            </Label>
            <FormGroup className="mt-2">
                <input
                    id={name}
                    {...field}

                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    hidden={hidden}
                    className="block w-full rounded-md shadow-md p-2 mt-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset
                    focus:ring-indigo-600 placeholder:font-serif placeholder:text-1xl
                    placeholder:text-gray-500 font-serif sm:text-1xl sm:leading-6"
                />
            </FormGroup>
            <ErrorMessage name={name}
                          component={FormFeedback}
                          className="text-sm font-serif text-red-500"/>
        </FormGroup>
    )
}