import { useState } from "react";
import regexVal from "./RegexVal.js";

const Formly_Js = (initialValues, validationSchema, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const fieldSchema = validationSchema[name];
    if (fieldSchema) {
      const { validators, required, requiredMessage } = fieldSchema;
      let errorMessage = null;
      validators.forEach(({ validator, message }) => {
        if (!validator.test(value)) {
          errorMessage = message;
        }
      });
      if (required && !value.trim()) {
        errorMessage = requiredMessage || "Please enter a value";
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    Object.keys(validationSchema).forEach((name) => {
      const fieldSchema = validationSchema[name];
      const { validators } = fieldSchema;
      const fieldError = validators.find(
        ({ validator }) => !validator.test(values[name])
      );
      if (fieldError) {
        formErrors[name] = fieldError.message;
      }
    });
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default Formly_Js;
export { regexVal };
