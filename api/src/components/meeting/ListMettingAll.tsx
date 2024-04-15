import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CardMettingDay from './CardMettingDay';

const VisualizacaoAll = ({ reunioes }) => {
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
                    {reunioes.map((reuniao, index) => (
                        <TableRow key={index}>
                            <TableCell>{reuniao.data}</TableCell>
                            <TableCell>{reuniao.inicio}</TableCell>
                            <TableCell>
                                {/* Exibe o componente CardMettingDay para a reunião */}
                                <CardMettingDay
                                    nome={reuniao.nome}
                                    inicio={reuniao.inicio}
                                    termino={reuniao.termino}
                                    tipoReuniao={reuniao.tipoReuniao}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default VisualizacaoAll;
