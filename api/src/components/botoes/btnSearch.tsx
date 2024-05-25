import React, { useState, useEffect } from 'react';
import { Button, Input, Stack, Tooltip, styled } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchButtonProps {
  onSearch: (text: string) => void; // Função de retorno de chamada que recebe o texto digitado
}

const CenteredButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: "10px"
});

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
  // Estados locais
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Manipulador de clique do botão
  const handleButtonClick = () => {
    // Alterna a visibilidade do input
    setIsInputVisible((prevState) => {
      // Se o input está ficando invisível, resete o texto de pesquisa
      if (prevState) {
        setSearchText('');
        onSearch('');
      }
      return !prevState;
    });
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
        <CenteredButton
          variant="contained"
          color="primary"
          startIcon={<Search />}
          onClick={handleButtonClick}
        >
          {/* Botão com ícone de pesquisa */}
        </CenteredButton>
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
