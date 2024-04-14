import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { Print } from '@mui/icons-material';

const PrintButton: React.FC = () => {
  // Função para lidar com a impressão da tela
  const handlePrint = () => {
    window.print(); // Chama a função nativa para imprimir a tela
  };

  return (
    // Envolva o botão com um Tooltip
    <Tooltip title="Imprimir" placement="bottom">
      <Button
        variant="contained"
        color="primary"
        startIcon={<Print />}
        onClick={handlePrint}
      >
        Imprimir
      </Button>
    </Tooltip>
  );
};

export default PrintButton;
