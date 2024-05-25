import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Stack } from '@mui/material';
import CardMettingMonth from './CardMettingMonth';
import { Meeting } from '../../types/MeetingTypes';
import { startOfMonth, endOfMonth, format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Função para calcular os dias do mês com base na data selecionada
const calcularDiasDoMes = (dataSelecionada: Date): Date[] => {
    const primeiroDiaDoMes = startOfMonth(dataSelecionada);
    const ultimoDiaDoMes = endOfMonth(dataSelecionada);
    const diasDoMes = [];

    for (let dia = primeiroDiaDoMes; dia <= ultimoDiaDoMes; dia.setDate(dia.getDate() + 1)) {
        diasDoMes.push(new Date(dia));
    }

    return diasDoMes;
};

interface VisualizacaoMensalProps {
  dataSelecionada: Date;
  reunioes: Meeting[];
}

const VisualizacaoMensal: React.FC<VisualizacaoMensalProps> = ({ dataSelecionada, reunioes }) => {
    // Calcula os dias do mês com base na data selecionada
    const diasDoMes = calcularDiasDoMes(dataSelecionada);
    
    // Cria uma matriz para armazenar as linhas da tabela (semanas)
    const linhas = [];

    // Preenche cada linha (semana) com células (dias)
    for (let i = 0; i < diasDoMes.length; i += 7) {
        const semana = [];

        for (let j = 0; j < 7; j++) {
            const indiceDia = i + j;
            if (indiceDia < diasDoMes.length) {
                const dia = diasDoMes[indiceDia];
                const dataFormatada = format(dia, 'yyyy-MM-dd');

                // Filtra as reuniões para este dia
                const reunioesNesteDia = reunioes.filter(reuniao => isSameDay(new Date(reuniao.data_inicio), dia));

                // Adiciona a célula com os cards dos eventos do dia
                semana.push(
                    <TableCell key={j} sx={{ paddingTop: '8px', alignContent: 'flex-start', width: 100, height: 150 }}>
                        <Stack flexDirection="column">
                            {/* Exibe o dia */}
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                {dia.getDate()}
                            </Typography>

                            {/* Exibe as reuniões deste dia */}
                            {reunioesNesteDia.slice(0, 2).map((reuniao, reuniaoIndex) => (
                                <CardMettingMonth
                                    key={reuniaoIndex}
                                    nome={reuniao.titulo}
                                    inicio={reuniao.data_inicio.toString()}
                                    termino={reuniao.data_final.toString()}
                                    tipoReuniao={reuniao.tipo}
                                />
                            ))}

                            {/* Exibe reticências se houver mais de duas reuniões */}
                            {reunioesNesteDia.length > 2 && (
                                <Typography variant="body2">
                                    +{reunioesNesteDia.length - 2}...
                                </Typography>
                            )}
                        </Stack>
                    </TableCell>
                );
            } else {
                // Adiciona uma célula vazia se não houver dias restantes no mês
                semana.push(<TableCell key={j} />);
            }
        }
        
        // Adiciona a semana (linha) à matriz de linhas
        linhas.push(<TableRow key={i}>{semana}</TableRow>);
    }

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        {/* Cabeçalho com os nomes dos dias da semana */}
                        <TableCell>Domingo</TableCell>
                        <TableCell>Segunda</TableCell>
                        <TableCell>Terça</TableCell>
                        <TableCell>Quarta</TableCell>
                        <TableCell>Quinta</TableCell>
                        <TableCell>Sexta</TableCell>
                        <TableCell>Sábado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Exibe as semanas como linhas na tabela */}
                    {linhas}
                </TableBody>
            </Table>
        </div>
    );
};

export default VisualizacaoMensal;
