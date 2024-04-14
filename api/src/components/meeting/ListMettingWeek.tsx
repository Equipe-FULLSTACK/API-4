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

// Função para filtrar reuniões por data e tipo selecionados
const filtrarReunioesPorDataETipo = (data, tipo, reunioes) => {
    return reunioes.filter(reuniao => {
        const dataReuniao = reuniao.data;
        const correspondeTipo = tipo === 'todos' || reuniao.tipoReuniao === tipo;
        // Verifica se a data da reunião corresponde à data fornecida
        return dataReuniao === data && correspondeTipo;
    }).sort((a, b) => a.inicio.localeCompare(b.inicio));
};

// Função para agrupar reuniões por hora
const agruparReunioesPorHora = (reunioes) => {
    const agrupamento = {};
    reunioes.forEach(reuniao => {
        const hora = reuniao.inicio;
        if (!agrupamento[hora]) {
            agrupamento[hora] = [];
        }
        agrupamento[hora].push(reuniao);
    });
    return agrupamento;
};

const VisualizacaoSemanal = ({ dataSelecionada, tipoSelecionado, reunioes }) => {
    // Calcula os dias da semana com base na data selecionada
    const diasDaSemana = calcularDiasDaSemana(dataSelecionada);
    // Nomes dos dias da semana
    const nomesDiasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    // Filtra as reuniões para cada dia da semana e tipo selecionado
    const reunioesPorDia = diasDaSemana.map(dia => {
        const dataFormatada = dia.toISOString().split('T')[0];
        return filtrarReunioesPorDataETipo(dataFormatada, tipoSelecionado, reunioes);
    });

    // Agrupa reuniões por hora para cada dia da semana
    const reunioesAgrupadasPorDia = reunioesPorDia.map(agruparReunioesPorHora);

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
                        const temReunioesNestaHora = reunioesAgrupadasPorDia.some(reunioesPorHora => reunioesPorHora[hora]);

                        if (temReunioesNestaHora) {
                            return (
                                <TableRow key={hora}>
                                    <TableCell>{hora}</TableCell>
                                    {/* Exibe as reuniões desta hora para cada dia da semana */}
                                    {reunioesAgrupadasPorDia.map((reunioesPorHora, index) => (
                                        <TableCell key={index}>
                                            {reunioesPorHora[hora]?.map((reuniao, reuniaoIndex) => (
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
