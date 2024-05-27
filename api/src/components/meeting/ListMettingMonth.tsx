import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Stack } from '@mui/material';
import CardMettingMonth from './CardMettingMonth';
import { Meeting } from '../../types/MeetingTypes';
import { startOfMonth, endOfMonth, format, isSameDay, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Função para calcular os dias do mês com base na data selecionada
const calcularDiasDoMes = (dataSelecionada: Date): Date[] => {
    const primeiroDiaDoMes = startOfMonth(dataSelecionada);
    const ultimoDiaDoMes = endOfMonth(dataSelecionada);
    const diasDoMes = [];

    // Adiciona dias do mês anterior para preencher a primeira semana
    for (let dia = subDays(primeiroDiaDoMes, primeiroDiaDoMes.getDay()); dia < primeiroDiaDoMes; dia.setDate(dia.getDate() + 1)) {
        diasDoMes.push(new Date(dia));
    }

    // Adiciona os dias do mês atual
    for (let dia = primeiroDiaDoMes; dia <= ultimoDiaDoMes; dia.setDate(dia.getDate() + 1)) {
        diasDoMes.push(new Date(dia));
    }

    // Adiciona dias do próximo mês para preencher a última semana
    for (let dia = addDays(ultimoDiaDoMes, 1); dia.getDay() !== 0; dia.setDate(dia.getDate() + 1)) {
        diasDoMes.push(new Date(dia));
    }

    return diasDoMes;
};

interface VisualizacaoMensalProps {
    dataSelecionada: Date;
    reunioes: Meeting[];
    onSelectReuniao: (reuniao: Meeting) => void; // Nova prop para seleção de reunião
}

const VisualizacaoMensal: React.FC<VisualizacaoMensalProps> = ({ dataSelecionada, reunioes, onSelectReuniao }) => {
    // Calcula os dias do mês com base na data selecionada
    const diasDoMes = calcularDiasDoMes(dataSelecionada);

    // Cria uma matriz para armazenar as linhas da tabela (semanas)
    const linhas = [];

    // Formata a data para 'dd/MM/yyyy'
    const formatarData = (date: Date): string => format(date, 'dd/MM/yyyy', { locale: ptBR });

    // Formata a hora para 'HH:mm'
    const formatarHora = (date: Date): string => format(date, 'HH:mm', { locale: ptBR });

    // Preenche cada linha (semana) com células (dias)
    for (let i = 0; i < diasDoMes.length; i += 7) {
        const semana = [];

        for (let j = 0; j < 7; j++) {
            const indiceDia = i + j;
            if (indiceDia < diasDoMes.length) {
                const dia = diasDoMes[indiceDia];

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
                                <div key={reuniaoIndex} onClick={() => onSelectReuniao(reuniao)} style={{ cursor: 'pointer', border: '1px solid transparent' }} onMouseOver={(e) => e.currentTarget.style.border = '1px solid #3f51b5'} onMouseOut={(e) => e.currentTarget.style.border = '1px solid transparent'}>
                                    <CardMettingMonth
                                        nome={reuniao.titulo}
                                        inicio={formatarHora(reuniao.data_inicio)}
                                        termino={formatarHora(reuniao.data_final)}
                                        tipoReuniao={reuniao.tipo}
                                    />
                                </div>
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
