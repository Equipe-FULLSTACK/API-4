import React from 'react';
import { Button, Typography, Tooltip } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

interface NovoEventoButtonProps {
  onClick: () => void;
}

const NovoEventoButton: React.FC<NovoEventoButtonProps> = ({ onClick }) => {
  return (
    <Tooltip title="Novo Evento" placement="bottom">
      <Button
        variant="contained"
        color="primary"
        endIcon={<CalendarToday />}
        onClick={onClick}
        sx={{ width: 200 }}
        size='large'
      >
        <Typography variant="body2" color="initial" paddingRight={2}> Novo evento </Typography>
      </Button>
    </Tooltip>
  );
};

export default NovoEventoButton;
