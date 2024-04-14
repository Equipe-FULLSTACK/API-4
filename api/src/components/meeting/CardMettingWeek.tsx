import React from 'react';
import { Card, CardContent, Typography, Stack, Tooltip } from '@mui/material';
import { MeetingRoom, LaptopMac, SyncAlt } from '@mui/icons-material';

interface ItemReuniaoProps {
    nome: string;
    inicio: string;
    termino: string;
    tipoReuniao: 'Presencial' | 'Online' | 'Hibrido';
}

const CardMettingDay: React.FC<ItemReuniaoProps> = ({ nome, inicio, termino, tipoReuniao }) => {
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
        <Card sx={{ marginBottom: 1, borderLeft: `4px solid ${getColorByTipoReuniao(tipoReuniao)}`, backgroundColor: 'transparent' }}>
            <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" marginBottom={1}>
                    {/* Ícone para o tipo de reunião */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {getIconByTipoReuniao(tipoReuniao)}
                        <Typography variant="body1" sx={{ color: getColorByTipoReuniao(tipoReuniao) }}>
                            {nome}
                        </Typography>
                    </Stack>
                </Stack>

                <Typography variant="body2" sx={{ marginTop: 0.5 }}>
                    Início: {inicio} | Término: {termino}
                </Typography>
                
                <Typography variant="body2" sx={{ color: getColorByTipoReuniao(tipoReuniao), marginTop: 0.5 }}>
                    Modo: {tipoReuniao}
                </Typography>
                
            </CardContent>
        </Card>
    );
};

export default CardMettingWeek;
