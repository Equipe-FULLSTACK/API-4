import React, { useState, useEffect } from 'react';
import { Modal, Button, Box, Typography, Grid, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import RoomIcon from '@mui/icons-material/Room';
import FilterTamanho from './FilterTamanho';
import FilterVagas from './FilterVagas';
import SearchSalas from './SearchSalas';
import SalaCard from './SalaCard';
import { Meeting } from '../../../../types/MeetingTypes';
import { SalaAvailable } from '../../../../types/roomPresencialTypes';

interface ModalPesquisaSalasProps {
  open: boolean;
  onClose: () => void;
  onSalaSelect: (idSala: number) => void;
  salasPresenciais: SalaAvailable[];
  reunioes: Meeting[];
  inicioDate: Date;
  terminoDate: Date;
}

const ModalPesquisaSalas: React.FC<ModalPesquisaSalasProps> = ({
  open,
  onClose,
  onSalaSelect,
  salasPresenciais,
  reunioes,
  inicioDate,
  terminoDate,
}) => {
  const [selectedSala, setSelectedSala] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [userLevelFilter, setUserLevelFilter] = useState<string>('');
  const [minVagas, setMinVagas] = useState<number | null>(null);
  const [maxVagas, setMaxVagas] = useState<number | null>(null);
  const [tamanhoFilter, setTamanhoFilter] = useState<string>('');

  const resetFilters = () => {
    setSelectedSala(null);
    setSearchTerm('');
    setAvailableOnly(false);
    setUserLevelFilter('');
    setMinVagas(null);
    setMaxVagas(null);
    setTamanhoFilter('');
  };

  useEffect(() => {
    if (!open) {
      resetFilters();
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    if (selectedSala !== null) {
      onSalaSelect(selectedSala);
      handleClose();
    }
  };

  const handleClearFilters = () => {
    resetFilters();
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleDeselect = () => {
    setSelectedSala(null);
  };

  const filteredSalas = salasPresenciais.filter(sala => {
    return (
      (!searchTerm || sala.nome.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!availableOnly || sala.available) &&
      (!minVagas || sala.vagas >= minVagas) &&
      (!maxVagas || sala.vagas <= maxVagas) &&
      (!tamanhoFilter || sala.tamanho === tamanhoFilter)
    );
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          backgroundColor: '#2F2F2F',
          border: '1px solid #000',
          boxShadow: 24,
          padding: 4,
          zIndex: 100,
          color: '#fff',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center">
            <RoomIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Busca de salas presenciais</Typography>
          </Box>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
            startIcon={<ClearIcon />}
          >
            Clear Filters
          </Button>
        </Box>
        <Stack spacing={2}>
          <SearchSalas searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
          <Stack direction="row" spacing={5}>
            <FilterTamanho tamanhoFilter={tamanhoFilter} setTamanhoFilter={setTamanhoFilter} />
            <FilterVagas minVagas={minVagas} maxVagas={maxVagas} setMinVagas={setMinVagas} setMaxVagas={setMaxVagas} />
          </Stack>
        </Stack>
        <Box mt={4} sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Grid container spacing={2}>
            {filteredSalas.map(sala => (
              <Grid item xs={12} key={sala.id_sala_presencial}>
                <SalaCard 
                  sala={sala} 
                  onSelect={() => setSelectedSala(sala.id_sala_presencial)} 
                  selected={selectedSala === sala.id_sala_presencial}
                  onDeselect={handleDeselect} 
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ ml: 2 }}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalPesquisaSalas;
