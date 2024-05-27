import React from 'react';
import { FormControl, TextField, Box } from '@mui/material';

interface FilterVagasProps {
  minVagas: number | null;
  maxVagas: number | null;
  setMinVagas: (minVagas: number | null) => void;
  setMaxVagas: (maxVagas: number | null) => void;
}

const FilterVagas: React.FC<FilterVagasProps> = ({ minVagas, maxVagas, setMinVagas, setMaxVagas }) => {
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? null : Number(event.target.value);
    setMinVagas(value);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? null : Number(event.target.value);
    setMaxVagas(value);
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <FormControl fullWidth sx={{ mr: 1 }}>
        <TextField
          label="Mínimo"
          type="number"
          value={minVagas !== null ? minVagas : ''}
          onChange={handleMinChange}
          InputProps={{ inputProps: { min: 0 } }}
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth sx={{ ml: 1 }}>
        <TextField
          label="Máximo"
          type="number"
          value={maxVagas !== null ? maxVagas : ''}
          onChange={handleMaxChange}
          InputProps={{ inputProps: { min: 0 } }}
          variant="outlined"
        />
      </FormControl>
    </Box>
  );
};

export default FilterVagas;
