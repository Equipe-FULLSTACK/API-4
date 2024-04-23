import React from 'react';
import { Button, Stack } from '@mui/material';

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean; // Nova propriedade para desabilitar o botão
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled }) => {
  return (
    <Stack padding={0} marginTop={5}>
      <Button type="submit" variant="contained" color="primary" fullWidth size='large' onClick={onClick} disabled={disabled}>
        Entrar
      </Button>
    </Stack>
  );
};

export default SubmitButton;
