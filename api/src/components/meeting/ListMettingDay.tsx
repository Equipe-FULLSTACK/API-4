import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CardMettingDay from './CardMettingDay';

const VisualizacaoDiaria = ({ dataSelecionada, tipoSelecionado, reunioes }) => {
    // Função para filtrar reuniões por data e tipo
    const filtrarReunioesPorDiaETipo = (data, tipo) => reunioes.filter(reuniao => {
        const correspondeData = reuniao.data === data;
        const correspondeTipo = tipo === 'todos' || reuniao.tipoReuniao === tipo;
        return correspondeData && correspondeTipo;
    }).sort((a, b) => a.inicio.localeCompare(b.inicio));

    // Filtra reuniões por data e tipo selecionados
    const reunioesFiltradas = filtrarReunioesPorDiaETipo(dataSelecionada, tipoSelecionado);

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={'100'}>Dia</TableCell>
                        <TableCell width={'100'}>Hora Início</TableCell>
                        <TableCell>Reunião</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Exibe as reuniões filtradas */}
                    {reunioesFiltradas.map((reuniao, index) => (
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

export default VisualizacaoDiaria;
