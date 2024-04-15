import React, { useState } from 'react';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { CalendarToday, DateRange, Event, FilterList } from '@mui/icons-material';

type Periodo = 'Dia' | 'Semana' | 'Mes' | 'Todos'; // Defina um tipo de união para o período

interface SelecionarPeriodoProps {
  onPeriodoChange: (periodo: Periodo) => void;
}

const SelecionarPeriodo: React.FC<SelecionarPeriodoProps> = ({ onPeriodoChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Periodo>('Todos');

  const handleButtonClick = (period: Periodo) => {
    setSelectedPeriod(period);
    onPeriodoChange(period);
  };

  const getButtonStyles = (period: Periodo) => ({
    backgroundColor: selectedPeriod === period ? 'primary.main' : 'inherit',
  });

  return (
    
    <ButtonGroup variant="contained" color="primary" aria-label="Selecione o período">
       {/* Botão para o período "Dia" */}
       <Tooltip title="Todos" placement="bottom">
        <Button
          onClick={() => handleButtonClick('Todos')}
          sx={getButtonStyles('Todos')}
          startIcon={<FilterList />}
        >
          Todos
        </Button>
      </Tooltip>

      {/* Botão para o período "Dia" */}
      <Tooltip title="Dia" placement="bottom">
        <Button
          onClick={() => handleButtonClick('Dia')}
          sx={getButtonStyles('Dia')}
          startIcon={<CalendarToday />}
        >
          Dia
        </Button>
      </Tooltip>

      {/* Botão para o período "Semana" */}
      <Tooltip title="Semana" placement="bottom">
        <Button
          onClick={() => handleButtonClick('Semana')}
          sx={getButtonStyles('Semana')}
          startIcon={<DateRange />}
        >
          Semana
        </Button>
      </Tooltip>

      {/* Botão para o período "Mês" */}
      <Tooltip title="Mês" placement="bottom">
        <Button
          onClick={() => handleButtonClick('Mes')}
          sx={getButtonStyles('Mes')}
          startIcon={<Event />}
        >
          Mês
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
};

export default SelecionarPeriodo;
