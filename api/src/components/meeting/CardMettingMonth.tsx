import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import { MeetingRoom, LaptopMac, SyncAlt } from '@mui/icons-material';
import MeetingTooltip from './MeetingTooltip';

interface ItemReuniaoProps {
    nome: string;
    inicio: string;
    termino: string;
    tipoReuniao: 'Presencial' | 'Online' | 'Hibrido';
}

const CardMettingMonth: React.FC<ItemReuniaoProps> = ({ nome, inicio, termino, tipoReuniao }) => {
    // Função para definir cores com base no tipo de reunião
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

    // Função para escolher ícones com base no tipo de reunião
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

    return (
        <MeetingTooltip nome={nome} inicio={inicio} termino={termino} tipoReuniao={tipoReuniao}>
            <Card sx={{ marginBottom: 1, width: 150, borderLeft: `4px solid ${getColorByTipoReuniao(tipoReuniao)}`, backgroundColor: 'transparent' }}>
                <CardContent sx={{ padding: '4px' }}>
                    <Stack direction="row" alignItems="center">
                        {/* Ícone para o tipo de reunião */}
                        {getIconByTipoReuniao(tipoReuniao)}
                        {/* Nome da reunião com estilos para truncar o texto com reticências */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: getColorByTipoReuniao(tipoReuniao),
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                flex: 1,
                            }}
                        >
                            {nome}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </MeetingTooltip>
    );
};

export default CardMettingMonth;
