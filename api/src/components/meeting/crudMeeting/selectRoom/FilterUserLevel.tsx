import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface FilterUserLevelProps {
  userLevelFilter: string;
  setUserLevelFilter: (level: string) => void;
}

const FilterUserLevel: React.FC<FilterUserLevelProps> = ({ userLevelFilter, setUserLevelFilter }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserLevelFilter(event.target.value as string);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="user-level-select-label">Nível de Usuário</InputLabel>
      <Select
        labelId="user-level-select-label"
        id="user-level-select"
        value={userLevelFilter}
        onChange={handleChange}
        label="Nível de Usuário"
      >
        <MenuItem value={'0'}>Qualquer</MenuItem>
        <MenuItem value={'1'}>Nível 1</MenuItem>
        <MenuItem value={'2'}>Nível 2</MenuItem>
        <MenuItem value={'3'}>Nível 3</MenuItem>
        <MenuItem value={'4'}>Nível 4</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterUserLevel;
