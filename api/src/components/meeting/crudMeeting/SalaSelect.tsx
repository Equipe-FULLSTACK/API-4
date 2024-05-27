import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography, Box, Tooltip, Button, createTheme, ThemeProvider, SelectChangeEvent } from '@mui/material';
import { Meeting } from '../../../types/MeetingTypes';
import { SalaPresencial } from '../../../types/roomPresencialTypes';
import ScheduleIcon from '@mui/icons-material/Schedule'; // Ícone para sala disponível
import ErrorIcon from '@mui/icons-material/Error'; // Ícone para sala indisponível
import SearchIcon from '@mui/icons-material/Search'; // Ícone para pesquisa

interface SalaSelectProps {
  salasPresenciais: SalaPresencial[];
  reunioes: Meeting[];
  onChange: (selectedSala: number) => void;
}

const SalaSelect: React.FC<SalaSelectProps> = ({ salasPresenciais, reunioes, onCheckAvailability, onChange }) => {
  const [selectedSala, setSelectedSala] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [filteredSalas, setFilteredSalas] = useState<SalaPresencial[]>(salasPresenciais);

  useEffect(() => {
    if (dataInicio && dataFim) {
      // Filtra as salas disponíveis com base nas datas selecionadas
      const filtered = salasPresenciais.filter((sala) =>
        isSalaDisponivel(sala.id_sala_presencial, dataInicio, dataFim)
      );
      setFilteredSalas(filtered);
    }
  }, [dataInicio, dataFim, salasPresenciais]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === 'dataInicio') {
      setDataInicio(new Date(value));
    } else if (name === 'dataFim') {
      setDataFim(new Date(value));
    }
  };

  const handleSearch = () => {
    // Implemente a lógica de pesquisa aqui
    console.log('Pesquisar:', searchTerm);
  };

  const handleAvailabilityCheck = () => {
    if (dataInicio && dataFim) {
      onCheckAvailability(dataInicio, dataFim);
    }
  };

  const handleChageSelected = (event: SelectChangeEvent<number>) => {
    const selectedId = event.target.value as number;
    setSelectedSala(selectedId);
    onChange(selectedId);
  };

  const isSalaDisponivel = (salaId: number, dataInicio: Date, dataFim: Date): boolean => {
    // Verifica se há conflito entre as datas de reuniões agendadas e a data de início/fim fornecida
    const conflito = reunioes.some((reuniao) => {
      return (
        (dataInicio >= reuniao.data_inicio && dataInicio < reuniao.data_final) || // Verifica conflito com a data de início
        (dataFim > reuniao.data_inicio && dataFim <= reuniao.data_final) || // Verifica conflito com a data de término
        (dataInicio <= reuniao.data_inicio && dataFim >= reuniao.data_final) // Verifica conflito com o período completo
      );
    });

    return !conflito; // A sala estará disponível se não houver conflito
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="sala-select-label">Selecionar Sala</InputLabel>
        <Select
          labelId="sala-select-label"
          id="sala-select"
          value={selectedSala || ''}
          onChange={handleChageSelected}
          label="Selecionar Sala"
        >
          {filteredSalas.map((sala) => (
            <MenuItem key={sala.id_sala_presencial} value={sala.id_sala_presencial}>
              <Tooltip title={isSalaDisponivel(sala.id_sala_presencial, dataInicio!, dataFim!) ? 'Sala Disponível' : 'Sala Indisponível'} placement="top">
                <span>
                  {sala.nome}
                  {!isSalaDisponivel(sala.id_sala_presencial, dataInicio!, dataFim!) && (
                    <Box component="span" marginLeft={1}>
                      <ErrorIcon color="error" fontSize="small" /> {/* Ícone de sala indisponível */}
                    </Box>
                  )}
                </span>
              </Tooltip>
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Buscar Sala"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <Tooltip title="Pesquisar Sala" placement="top">
                <Button variant="text" onClick={handleSearch}>
                  <SearchIcon />
                </Button>
              </Tooltip>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={handleAvailabilityCheck}>
          Verificar Disponibilidade
        </Button>
        <TextField
          id="dataInicio"
          name="dataInicio"
          label="Data de Início"
          type="datetime-local"
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          id="dataFim"
          name="dataFim"
          label="Data de Fim"
          type="datetime-local"
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        {selectedSala && (
          <Typography variant="body2" color="textSecondary">
            {`Sala selecionada: ${selectedSala}`}
          </Typography>
        )}
      </FormControl>
    </ThemeProvider>
  );
};

export default SalaSelect;
