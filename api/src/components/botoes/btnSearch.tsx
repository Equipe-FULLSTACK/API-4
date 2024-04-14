import React, { useState } from 'react';
import { Button, Input, Stack, Tooltip } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchButtonProps {
  onSearch: (text: string) => void; // Função de retorno de chamada que recebe o texto digitado
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
  // Estados locais
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Manipulador de clique do botão
  const handleButtonClick = () => {
    setIsInputVisible((prevState) => !prevState); // Alterna a visibilidade do input
  };

  // Manipulador de mudança de texto do input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);
    // Chama a função de retorno de chamada com o texto digitado
    onSearch(text);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {/* Envolva o botão com um Tooltip */}
      <Tooltip title="Pesquisar" placement="bottom">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Search />}
          onClick={handleButtonClick}
        >
          {/* Botão com ícone de pesquisa */}
        </Button>
      </Tooltip>
      
      {/* Exibe o input de texto apenas se isInputVisible for verdadeiro */}
      {isInputVisible && (
        <Input
          value={searchText}
          onChange={handleInputChange}
          placeholder="Pesquisar"
        />
      )}
    </Stack>
  );
};

export default SearchButton;
