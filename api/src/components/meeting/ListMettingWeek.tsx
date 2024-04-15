import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CardMettingDay from './CardMettingDay';

// Função para calcular os dias da semana com base na data selecionada
const calcularDiasDaSemana = (dataSelecionada) => {
    const data = new Date(dataSelecionada);
    const diaDaSemana = data.getDay(); // 0 para domingo, 6 para sábado

    // Calcula o início da semana (domingo)
    const inicioSemana = new Date(data);
    inicioSemana.setDate(data.getDate() - diaDaSemana);

    // Calcula todos os dias da semana
    const diasDaSemana = [];
    for (let i = 0; i < 7; i++) {
        const dia = new Date(inicioSemana);
        dia.setDate(inicioSemana.getDate() + i);
        diasDaSemana.push(dia);
    }

    return diasDaSemana;
};

const VisualizacaoSemanal = ({ dataSelecionada, reunioes }) => {
    // Calcula os dias da semana com base na data selecionada
    const diasDaSemana = calcularDiasDaSemana(dataSelecionada);
    // Nomes dos dias da semana
    const nomesDiasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    // Agrupa reuniões por dia
    const reunioesPorDia = diasDaSemana.map(dia => {
        const dataFormatada = dia.toISOString().split('T')[0];
        return reunioes.filter(reuniao => reuniao.data === dataFormatada);
    });

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        {/* Cabeçalho com a hora e os nomes dos dias da semana com suas datas */}
                        <TableCell>Hora</TableCell>
                        {nomesDiasDaSemana.map((nomeDia, index) => (
                            <TableCell key={index}>
                                {nomeDia} - {diasDaSemana[index].getDate()}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Looping para as horas de 00:00 até 23:00 */}
                    {Array.from({ length: 24 }, (_, indexHora) => {
                        const hora = `${String(indexHora).padStart(2, '0')}:00`;

                        // Verifica se há reuniões nesta hora para qualquer dia da semana
                        const temReunioesNestaHora = reunioesPorDia.some(reunioesNesteDia => reunioesNesteDia.some(reuniao => reuniao.inicio === hora));

                        if (temReunioesNestaHora) {
                            return (
                                <TableRow key={hora}>
                                    <TableCell>{hora}</TableCell>
                                    {/* Exibe as reuniões desta hora para cada dia da semana */}
                                    {reunioesPorDia.map((reunioesNesteDia, index) => (
                                        <TableCell key={index}>
                                            {/* Filtra as reuniões com a hora atual e mapeia */}
                                            {reunioesNesteDia.filter(reuniao => reuniao.inicio === hora).map((reuniao, reuniaoIndex) => (
                                                <CardMettingDay
                                                    key={reuniaoIndex}
                                                    nome={reuniao.nome}
                                                    inicio={reuniao.inicio}
                                                    termino={reuniao.termino}
                                                    tipoReuniao={reuniao.tipoReuniao}
                                                />
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
