import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface SearchSalasProps {
  onSearch: (term: string) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchSalas: React.FC<SearchSalasProps> = ({ onSearch, searchTerm, setSearchTerm }) => {
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Box>
      <TextField
        label="Buscar Sala"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default SearchSalas;
