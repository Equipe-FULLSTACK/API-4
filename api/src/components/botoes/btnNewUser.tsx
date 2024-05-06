import React from 'react';
import { Button, Typography, Tooltip } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

interface NovoUsuarioButtonProps {
  onClick?: () => void;
}

const BtnNewUser: React.FC<NovoUsuarioButtonProps> = ({ onClick }) => {
  return (
    <Tooltip title="Novo Usuário" placement="bottom">
      <Button
        variant="contained"
        color="primary"
        endIcon={<PersonAdd />}
        onClick={onClick}
        sx={{ width: 200, height:'3rem' }}
        size='large'
      >
        <Typography variant="body2" color="initial" paddingRight={2}> Novo usuário </Typography>
      </Button>
    </Tooltip>
  );
};

export default BtnNewUser;
