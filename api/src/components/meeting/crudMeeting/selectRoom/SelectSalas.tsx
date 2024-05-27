import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SalaPresencial } from '../../../../types/roomPresencialTypes';

interface SelectSalasProps {
  salasPresenciais: SalaPresencial[];
  selectedSala: number | null;
  setSelectedSala: (id: number | null) => void;
}

const SelectSalas: React.FC<SelectSalasProps> = ({ salasPresenciais, selectedSala, setSelectedSala }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedSala(event.target.value as number);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="sala-select-label">Selecionar Sala</InputLabel>
      <Select
        labelId="sala-select-label"
        id="sala-select"
        value={selectedSala || ''}
        onChange={handleChange}
        label="Selecionar Sala"
      >
        {salasPresenciais.map((sala) => (
          <MenuItem key={sala.id_sala_presencial} value={sala.id_sala_presencial}>
            {sala.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectSalas;
