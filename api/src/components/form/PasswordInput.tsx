import React, { useState } from 'react';
import { TextField, Tooltip, IconButton } from '@mui/material';
import { z } from 'zod';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Definindo o schema de validação com Zod
const passwordSchema = z.string().min(6, { message: 'A senha deve conter pelo menos 6 caracteres.' });

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidChange: (isValid: boolean) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, onValidChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  const validatePassword = (password: string) => {
    try {
      passwordSchema.parse(password);
      setError(null);
      setIsValid(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        setIsValid(false);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
    if (value && value.length > 0) {
      validatePassword(value); // Validar a senha
    } else {
      setError(null);
      setIsValid(false); 
    }
  };

  // Chamar onValidChange quando isValid mudar
  React.useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  return (
    <Tooltip title={error || ''} open={!!error} placement="top" arrow>
      <TextField
        label="Senha"
        value={value}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="password"
        error={!!error}
        InputProps={{
          endAdornment: (
            <>
              {isValid && <CheckCircleIcon color="success" />}
              {error && <ErrorIcon color="error" />}
            </>
          ),
        }}
        helperText={error}
      />
    </Tooltip>
  );
};

export default PasswordInput;
