import React from 'react';
import { Tooltip, Card, CardContent, Typography, Stack } from '@mui/material';
import { MeetingRoom, LaptopMac, SyncAlt } from '@mui/icons-material';

interface MeetingTooltipProps {
    nome: string;
    inicio: string;
    termino: string;
    tipoReuniao: 'Presencial' | 'Online' | 'Hibrido';
    children: React.ReactNode;
}

const MeetingTooltip: React.FC<MeetingTooltipProps> = ({ nome, inicio, termino, tipoReuniao, children }) => {
    // Função para definir a cor com base no tipo de reunião
    const getColorByTipoReuniao = (tipo: 'Presencial' | 'Online' | 'Hibrido') => {
        switch (tipo) {
            case 'Presencial':
                return '#4caf50'; // Verde
            case 'Online':
                return '#2196f3'; // Azul
            case 'Hibrido':
                return '#f44336'; // Vermelho
            default:
                return '#000000'; // Preto
        }
    };

    // Função para escolher o ícone com base no tipo de reunião
    const getIconByTipoReuniao = (tipo: 'Presencial' | 'Online' | 'Hibrido') => {
        switch (tipo) {
            case 'Presencial':
                return <MeetingRoom sx={{ color: getColorByTipoReuniao(tipo), marginRight: 1 }} />;
            case 'Online':
                return <LaptopMac sx={{ color: getColorByTipoReuniao(tipo), marginRight: 1 }} />;
            case 'Hibrido':
                return <SyncAlt sx={{ color: getColorByTipoReuniao(tipo), marginRight: 1 }} />;
            default:
                return null;
        }
    };

    // Conteúdo do tooltip baseado na estrutura do card
    const tooltipContent = (
        <Card sx={{ borderLeft: `4px solid ${getColorByTipoReuniao(tipoReuniao)}`, backgroundColor: '#2F2F2F', width:'auto' }}>
            <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" marginBottom={1}>
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

    return (
        <Tooltip title={tooltipContent} placement="top" arrow>
            {children}
        </Tooltip>
    );
};

export default MeetingTooltip;
