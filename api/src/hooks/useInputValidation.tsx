import { useState } from "react";

interface ValidationError {
  [key: string]: string;
}

const useInputValidation = (initialValues: any, validate: (values: any) => ValidationError) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ValidationError>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name!]: value
    });
  };

  const handleSubmit = (callback: () => void) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      callback();
    }
  };

  return {
    values,
    setValues,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useInputValidation;
