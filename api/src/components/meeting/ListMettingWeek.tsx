import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CardMettingDay from './CardMettingDay';
import { Meeting } from '../../types/MeetingTypes';
import { startOfWeek, endOfWeek, format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Função para calcular os dias da semana com base na data selecionada
const calcularDiasDaSemana = (dataSelecionada: Date): Date[] => {
    const inicioSemana = startOfWeek(dataSelecionada, { weekStartsOn: 0 });
    const fimSemana = endOfWeek(dataSelecionada, { weekStartsOn: 0 });

    const diasDaSemana = [];
    for (let dia = inicioSemana; dia <= fimSemana; dia.setDate(dia.getDate() + 1)) {
        diasDaSemana.push(new Date(dia));
    }

    return diasDaSemana;
};

interface VisualizacaoSemanalProps {
    dataSelecionada: Date;
    reunioes: Meeting[];
    onSelectReuniao: (reuniao: Meeting) => void; // Nova prop para seleção de reunião
}

const VisualizacaoSemanal: React.FC<VisualizacaoSemanalProps> = ({ dataSelecionada, reunioes, onSelectReuniao }) => {

    const diasDaSemana = calcularDiasDaSemana(dataSelecionada);

    const nomesDiasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    // Agrupa reuniões por dia
    const reunioesPorDia = diasDaSemana.map(dia => {
        return reunioes.filter(reuniao => isSameDay(new Date(reuniao.data_inicio), dia));
    });

    // Formata a data para 'dd/MM/yyyy'
    const formatarData = (date: Date): string => format(date, 'dd/MM/yyyy', { locale: ptBR });

    // Formata a hora para 'HH:mm'
    const formatarHora = (date: Date): string => format(date, 'HH:mm', { locale: ptBR });

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        {/* Cabeçalho com a hora e os nomes dos dias da semana com suas datas */}
                        <TableCell>Hora</TableCell>
                        {diasDaSemana.map((dia, index) => (
                            <TableCell key={index}>
                                {nomesDiasDaSemana[dia.getDay()]} - {format(dia, 'dd/MM')}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Looping para as horas de 00:00 até 23:00 */}
                    {Array.from({ length: 24 }, (_, indexHora) => {
                        const hora = `${String(indexHora).padStart(2, '0')}:00`;

                        // Verifica se há reuniões nesta hora para qualquer dia da semana
                        const temReunioesNestaHora = reunioesPorDia.some(reunioesNesteDia =>
                            reunioesNesteDia.some(reuniao => formatarHora(new Date(reuniao.data_inicio)) === hora)
                        );

                        if (temReunioesNestaHora) {
                            return (
                                <TableRow key={hora}>
                                    <TableCell>{hora}</TableCell>
                                    {/* Exibe as reuniões desta hora para cada dia da semana */}
                                    {reunioesPorDia.map((reunioesNesteDia, index) => (
                                        <TableCell key={index}>
                                            {/* Filtra as reuniões com a hora atual e mapeia */}
                                            {reunioesNesteDia
                                                .filter(reuniao => formatarHora(new Date(reuniao.data_inicio)) === hora)
                                                .map((reuniao, reuniaoIndex) => (
                                                    <div key={reuniaoIndex} onClick={() => onSelectReuniao(reuniao)} style={{ cursor: 'pointer', border: '1px solid transparent' }} onMouseOver={(e) => e.currentTarget.style.border = '1px solid #3f51b5'} onMouseOut={(e) => e.currentTarget.style.border = '1px solid transparent'}>
                                                        <CardMettingDay
                                                            nome={reuniao.titulo}
                                                            inicio={formatarHora(reuniao.data_inicio)}
                                                            termino={formatarHora(reuniao.data_final)}
                                                            tipoReuniao={reuniao.tipo}
                                                        />
                                                    </div>
                                                ))}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        } else {
                            return null;
                        }
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default VisualizacaoSemanal;
