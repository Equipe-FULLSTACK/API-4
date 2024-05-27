import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CardMettingDay from './CardMettingDay';
import { Meeting } from '../../types/MeetingTypes';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface VisualizacaoAllProps {
    reunioes: Meeting[];
}

const VisualizacaoAll: React.FC<VisualizacaoAllProps> = ({ reunioes }) => {

    // Formata a data para 'dd/MM/yyyy'
    const formatarData = (date: Date | null | undefined): string => {
        if (!date) return ''; // Retorna uma string vazia se a data for nula ou indefinida
        return format(date, 'dd/MM/yyyy', { locale: ptBR });
    };
    
    // Formata a hora para 'HH:mm'
    const formatarHora = (date: Date | null | undefined): string => {
        if (!date) return ''; // Retorna uma string vazia se a data for nula ou indefinida
        return format(date, 'HH:mm', { locale: ptBR });
    };

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={100}>Dia</TableCell>
                        <TableCell width={100}>Hora Início</TableCell>
                        <TableCell>Reunião</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Exibe todas as reuniões sem filtrar */}
                    {reunioes.map((reuniao, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{formatarData(reuniao.data_inicio)}</TableCell>
                                <TableCell>{formatarHora(reuniao.data_final)}</TableCell>
                                <TableCell>
                                    {/* Exibe o componente CardMettingDay para a reunião */}
                                    <CardMettingDay
                                        nome={reuniao.titulo}
                                        inicio={formatarHora(reuniao.data_inicio)}
                                        termino={formatarHora(reuniao.data_final)}
                                        tipoReuniao={reuniao.tipo}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default VisualizacaoAll;
