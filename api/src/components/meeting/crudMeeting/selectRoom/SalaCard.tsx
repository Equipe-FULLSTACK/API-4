import React from 'react';
import { Card, CardContent, Typography, Stack, Tooltip, Button, Box } from '@mui/material';
import { MeetingRoom, Group, EventSeat, Person } from '@mui/icons-material';
import { SalaAvailable } from '../../../../types/roomPresencialTypes';

interface SalaCardProps {
  sala: SalaAvailable;
  onSelect: () => void;
  selected: boolean;
  onDeselect: () => void;
}

const SalaCard: React.FC<SalaCardProps> = ({ sala, onSelect, selected, onDeselect }) => {
  const getColorByAvailability = (available: boolean) => {
    return available ? '#4caf50' : '#f44336';
  };

  const getIconBySize = (size: string) => {
    switch (size) {
      case 'Pequena':
        return (
          <Tooltip title="Pequena">
            <EventSeat sx={{ color: '#4caf50', marginRight: 1 }} />
          </Tooltip>
        );
      case 'Média':
        return (
          <Tooltip title="Média">
            <Group sx={{ color: '#2196f3', marginRight: 1 }} />
          </Tooltip>
        );
      case 'Grande':
        return (
          <Tooltip title="Grande">
            <MeetingRoom sx={{ color: '#f44336', marginRight: 1 }} />
          </Tooltip>
        );
      case 'Auditório':
        return (
          <Tooltip title="Auditório">
            <MeetingRoom sx={{ color: '#ff9800', marginRight: 1 }} />
          </Tooltip>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      sx={{ 
        marginBottom: 1, 
        borderLeft: `4px solid ${getColorByAvailability(sala.available)}`, 
        backgroundColor: 'transparent',
        border: selected ? '2px solid #f44336' : 'none'
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Stack direction="row" alignItems="center" marginBottom={1}>
              {getIconBySize(sala.tamanho)}
              <Typography variant="h6">
                {sala.nome}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" alignContent='baseline' spacing={10}>
              <Stack direction="row" alignItems="end" spacing={1}>
                <Tooltip title="Tamanho">
                  <MeetingRoom sx={{ color: '#2196f3', marginRight: 0.5 }} />
                </Tooltip>
                <Typography variant="body2">
                  {sala.tamanho}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="end" spacing={1}>
                <Tooltip title="Vagas">
                  <Person sx={{ color: '#4caf50', marginRight: 0.5 }} />
                </Tooltip>
                <Typography variant="body2" alignItems={'center'}>
                  Capacidade {sala.vagas} vagas
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Stack direction="column" alignItems="flex-end">
            <Typography variant="body2" sx={{ color: getColorByAvailability(sala.available), marginBottom: 1 }}>
              {sala.available ? 'Disponivel' : 'Indisponível'}
            </Typography>
            {selected ? (
              <Button variant="outlined" color="secondary" onClick={onDeselect}>
                Desmarcar
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={onSelect}>
                Selecionar
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SalaCard;
