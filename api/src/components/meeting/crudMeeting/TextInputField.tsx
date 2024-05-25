import React from 'react';
import { TextField } from '@mui/material';

interface TextInputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ label, name, value, onChange }) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    fullWidth
    margin="normal"
  />
);

export default TextInputField;
