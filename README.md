# Formify-js

Formify-js is a comprehensive form validation library for React applications. It provides a Form Validation hook that simplifies form validation by handling form state, error messages, and validation rules. The package also includes a set of pre-defined regex patterns for common validation scenarios.

## Installation

You can install the `formify-js` package using npm or yarn:

```
npm install formify-js
```

or

```
yarn add formify-js
```


## Pre-defined Regex Patterns

The `formify-js` package includes the following pre-defined regex patterns in the `regexVal` object:

| Function           | Description                                          | Example Usage                                   |
| ------------------ | ---------------------------------------------------- | ----------------------------------------------- |
| `min(val)`         | Matches strings with a minimum length of `val`        | `regexVal.min(6)`                               |
| `max(val)`         | Matches strings with a maximum length of `val`        | `regexVal.max(10)`                              |
| `email()`          | Matches a valid email address                         | `regexVal.email()`                              |
| `specialCharacters` | Matches strings containing at least one special character | `regexVal.specialCharacters()`                 |

You can use these functions in the `validators` array of the validation schema to define custom validation rules for your form fields.


## Usage

Here's an example of how to use `formify-js` in your React application:

#### App.js

```
import React from "react";
import useFormValidator, { regexVal } from "formify-js";

const App = () => {
  // Define validation schema
  const validationSchema = {
    // Define validation rules for each field
    email: {
      required: true,
      requiredMessage: "Please enter Email",
      validators: [
        {
          validator: regexVal.email(),
          message: "Please enter a valid email",
        },
      ],
    },
    password: {
      required: true,
      validators: [
        {
          validator: regexVal.min(6),
          message: "Password must be at least 6 characters long",
        },
      ],
    },
  };

  // Define form submit handler
  const handleFormSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };

  // Initialize the form validator hook
  const formValidator = useFormValidator(
    {
      email: "",
      password: "",
    },
    validationSchema,
    handleFormSubmit
  );

  // Destructure the form state values and methods
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formValidator;

  return (
    <div>
      <h1>Form Validation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
```

Make sure to replace the validation rules and form submit logic with your own requirements.
"# formify-js" 
