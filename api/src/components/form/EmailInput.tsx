import React, { useState } from 'react';
import { TextField, Tooltip } from '@mui/material';
import { z } from 'zod';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Definindo o schema de validação com Zod
const emailSchema = z.string().email({ message: 'Insira um e-mail válido.' });

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidChange: (isValid: boolean) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, onValidChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    try {
      emailSchema.parse(email);
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
      validateEmail(value); // Validar o e-mail
    } else {
      setError(null); // Limpar erros se o campo estiver vazio
      setIsValid(false); // Definir como inválido se o campo estiver vazio
    }
  };

  // Chamar onValidChange quando isValid mudar
  React.useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  return (
    <Tooltip title={error || ''} open={!!error} placement="top" arrow>
      <TextField
        label="Email"
        value={value}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="email"
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

export default EmailInput;
