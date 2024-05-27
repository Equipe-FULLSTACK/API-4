import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FilterTamanhoProps {
  tamanhoFilter: string;
  setTamanhoFilter: (tamanho: string) => void;
}

const FilterTamanho: React.FC<FilterTamanhoProps> = ({ tamanhoFilter, setTamanhoFilter }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setTamanhoFilter(event.target.value);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="tamanho-select-label">Tamanho</InputLabel>
      <Select
        labelId="tamanho-select-label"
        id="tamanho-select"
        value={tamanhoFilter}
        onChange={handleChange}
        label="Tamanho"
      >
        <MenuItem value={'Pequena'}>Pequena</MenuItem>
        <MenuItem value={'Média'}>Média</MenuItem>
        <MenuItem value={'Grande'}>Grande</MenuItem>
        <MenuItem value={'Auditório'}>Auditório</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterTamanho;
