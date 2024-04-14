import React, { useState } from 'react';
import { TextField } from '@mui/material';

interface InputProps {
  label: string;
  value: string | number;
  onChange: (newValue: string | number) => void;
}

const DynamicInput: React.FC<InputProps> = ({ label, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <TextField
      id="input"
      label={label}
      value={inputValue}
      onChange={handleChange}
      fullWidth
    />
  );
};

export default DynamicInput;