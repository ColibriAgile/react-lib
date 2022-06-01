import {useCallback, useEffect, useReducer, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import validate from "../Validator";

export const useForm = (initialState = {}) => {
    const [formValues, setFormValues] = useReducer((state, newState) => ({ ...state, ...newState }), initialState);
    const [errors, setErrors] = useState({});
    const fields = useRef({});
    const fieldNames = useRef(new Set());
    const { t } = useTranslation();
    const setFocusOnFirstFieldWithError = useCallback(() => {
        function focus(name) {
            let element = fields.current[name].element;
            if (fields.current[name].element?.className?.includes("MuiSelect")) {
                element = element?.previousSibling;
            }
            if (element) {
                element.focus();
            }
        }

        for (let name of fieldNames.current) {
            if (!errors[name]) {
                continue;
            }

            if (fields.current[name] && fields.current[name].element) {
                focus(name);
                break;
            }
        }
    }, [fields, errors]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setFocusOnFirstFieldWithError();
        }
    }, [errors, setFocusOnFirstFieldWithError]);

    const handleChecked = (event) => {
        const auxValues = {};
        auxValues[event.target.name] = event.target.checked;
        setFormValues(auxValues);
    };

    const handleValue = (name, values) => {
        const auxValues = {};
        auxValues[name] = values;
        setFormValues(auxValues);
    };

    const handleChange = (event) => {
        const auxValues = {};
        auxValues[event.target.name] = event.target.value;
        setFormValues(auxValues);
    };

    const addField = (e, rules = {}) => {
        if (e) {
            const name = e.name;
            if (!fieldNames.current.has(name)) {
                fieldNames.current.add(name);
                fields.current[name] = { rules: rules, element: e };
                if (!formValues[name]) {
                    const aux = {};
                    aux[name] = "";
                    setFormValues(aux);
                }
            }
        }
    };

    const removeField = (name) => {
        fieldNames.current.delete(name);
        delete fields.current[name];
        delete formValues[name];
    };

    const validateFields = () => {
        const errors = {};
        resetErrors();
        fieldNames.current.forEach((name) => {
            const el = fields.current[name].element;
            if (el && !el.disabled) {
                if (name === undefined) {
                    return;
                }
                const [error, params] = validate(formValues, name, fields.current[name]);
                if (error) {
                    errors[name] = t(error, params);
                }
            }
        });
        return errors;
    };

    const hasErro = (field) => {
        return errors && errors[field] && errors[field].length > 0;
    };

    const handleSubmit = (callback) => (event) => {
        event.preventDefault();
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            callback();
        }
    };

    const reset = () => {
        setFormValues(initialState);
        setErrors({});
    };

    const resetErrors = () => {
        setErrors({});
    };

    const removeFields = (fieldNames) => {
        for (const field in formValues) {
            if (fieldNames.includes(field)) {
                removeField(field);
            }
        };
    };

    const removeAllFields = () => {
        for (const field in formValues) {
            removeField(field);
        }
    };

    return {
        addField,
        formValues,
        setFormValues,
        errors,
        hasErro,
        reset,
        on: {
            handleChange,
            handleChecked,
            handleValue,
            handleSubmit,
        },
        removeField,
        removeFields,
        removeAllFields,
        resetErrors,
    };
};
