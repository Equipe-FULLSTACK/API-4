import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SelectAvailableProps {
  availableOnly: boolean;
  setAvailableOnly: (value: boolean) => void;
}

const SelectAvailable: React.FC<SelectAvailableProps> = ({ availableOnly, setAvailableOnly }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setAvailableOnly(event.target.value === '1');
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-available-label">Disponibilidade</InputLabel>
      <Select
        labelId="select-available-label"
        value={availableOnly ? '1' : '0'}
        onChange={handleChange}
        label="Disponibilidade"
      >
        <MenuItem value="0">Todos</MenuItem>
        <MenuItem value="1">Disponíveis</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectAvailable;
