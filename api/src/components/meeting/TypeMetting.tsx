import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Stack, Tooltip } from '@mui/material';
import { MeetingRoom, LaptopMac, SyncAlt } from '@mui/icons-material';

interface TypeMeetingProps {
    tipoSelecionado: string;
    onTipoChange: (tipo: string) => void;
    
}

const TypeMeeting: React.FC<TypeMeetingProps> = ({ tipoSelecionado, onTipoChange }) => {
    // Definindo cores para cada tipo de reunião
    const getColorByTipoReuniao = (tipo: 'Presencial' | 'Online' | 'Hibrido') => {
        switch (tipo) {
            case 'Presencial':
                return '#4caf50'; // Verde
            case 'Online':
                return '#2196f3'; // Azul
            case 'Hibrido':
                return '#f44336'; // Vermelho
            default:
                return '#000000'; // Preto como padrão
        }
    };

    // Escolhendo ícones com base no tipo de reunião
    const getIconByTipoReuniao = (tipo: 'Presencial' | 'Online' | 'Hibrido') => {
        switch (tipo) {
            case 'Presencial':
                return (
                    <Tooltip title="Presencial">
                        <MeetingRoom sx={{ color: getColorByTipoReuniao(tipo), marginRight: 1 }} />
                    </Tooltip>
                );
            case 'Online':
                return (
                    <Tooltip title="Online">
                        <LaptopMac sx={{ color: getColorByTipoReuniao(tipo), marginRight: 1 }} />
                    </Tooltip>
                );
            case 'Hibrido':
                return (
                    <Tooltip title="Híbrido">
                        <SyncAlt sx={{ color: getColorByTipoReuniao(tipo), marginRight: 1 }} />
                    </Tooltip>
                );
            default:
                return null;
        }
    };

    return (
        <FormControl margin="normal" fullWidth>
            {/* Exibe o label atualizado com base no tipo selecionado */}
            <InputLabel id="tipo-reuniao-label">Tipo de Reunião</InputLabel>
            <Select
                labelId="tipo-reuniao-label"
                id="tipo-reuniao-select"
                value={tipoSelecionado}
                onChange={(e) => onTipoChange(e.target.value)}
            >
                {/* Renderiza as opções de seleção com ícones */}
                {['todos', 'Presencial', 'Online', 'Hibrido'].map(tipo => (
                    <MenuItem key={tipo} value={tipo}>
                        {/* Renderiza o ícone ao lado do tipo de reunião */}
                        <Stack direction="row" alignItems="center" spacing={1}>
                            {getIconByTipoReuniao(tipo as 'Presencial' | 'Online' | 'Hibrido')}
                            <span>{tipo === 'todos' ? 'Todos os Tipos' : tipo}</span>
                        </Stack>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TypeMeeting;
