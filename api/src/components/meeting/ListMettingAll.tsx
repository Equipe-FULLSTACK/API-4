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
                        const dataInicio = new Date(reuniao.data_inicio);
                        const dataFinal = new Date(reuniao.data_final);

                        return (
                            <TableRow key={index}>
                                <TableCell>{format(dataInicio, 'dd/MM/yyyy', { locale: ptBR })}</TableCell>
                                <TableCell>{format(dataInicio, 'HH:mm', { locale: ptBR })}</TableCell>
                                <TableCell>
                                    {/* Exibe o componente CardMettingDay para a reunião */}
                                    <CardMettingDay
                                        nome={reuniao.titulo}
                                        inicio={dataInicio.toString()}
                                        termino={dataFinal.toString()}
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
