import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Stack } from '@mui/material';
import CardMettingMonth from './CardMettingMonth';

// Função para calcular os dias do mês com base na data selecionada
const calcularDiasDoMes = (dataSelecionada) => {
    const data = new Date(dataSelecionada);
    const primeiroDiaDoMes = new Date(data.getFullYear(), data.getMonth(), 1);
    const ultimoDiaDoMes = new Date(data.getFullYear(), data.getMonth() + 1, 0);
    const diasDoMes = [];

    for (let dia = primeiroDiaDoMes.getDate(); dia <= ultimoDiaDoMes.getDate(); dia++) {
        diasDoMes.push(new Date(data.getFullYear(), data.getMonth(), dia));
    }

    return diasDoMes;
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

const VisualizacaoMensal = ({ dataSelecionada, tipoSelecionado, reunioes }) => {
    // Calcula os dias do mês com base na data selecionada
    const diasDoMes = calcularDiasDoMes(dataSelecionada);
    
    // Filtra as reuniões para cada dia do mês e tipo selecionado
    const reunioesPorDia = diasDoMes.map(dia => {
        const dataFormatada = dia.toISOString().split('T')[0];
        return filtrarReunioesPorDataETipo(dataFormatada, tipoSelecionado, reunioes);
    });

    // Calcula o número de semanas necessárias para renderizar o mês
    const semanasNoMes = Math.ceil((diasDoMes.length + diasDoMes[0].getDay()) / 7);

    // Cria uma matriz para armazenar as linhas da tabela (semanas)
    const linhas = [];

    // Preenche cada linha (semana) com células (dias)
    for (let i = 0; i < semanasNoMes; i++) {
        const semana = [];
        
        // Preenche cada célula com o dia correspondente
        for (let j = 0; j < 7; j++) {
            const indiceDia = i * 7 + j - diasDoMes[0].getDay();
            if (indiceDia >= 0 && indiceDia < diasDoMes.length) {
                const dia = diasDoMes[indiceDia];
                const dataFormatada = dia.toISOString().split('T')[0];
                const reunioesNesteDia = reunioesPorDia[indiceDia];

                // Adiciona a célula com os cards dos eventos do dia
                semana.push(
                    <TableCell key={j} sx={{ paddingTop: '8px', alignContent: 'flex-start', width: 100, height: 150 }}>
                        <Stack flexDirection={'column'}>
                            {/* Adiciona o dia com um estilo específico */}
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                {dia.getDate()}
                            </Typography>
                
                            {/* Mapeia as reuniões deste dia e renderiza os cards */}
                            {(
                                reunioesNesteDia?.slice(0, 2)?.map((reuniao, reuniaoIndex) => (
                                    <CardMettingMonth
                                        key={reuniaoIndex}
                                        nome={reuniao.nome}
                                        inicio={reuniao.inicio}
                                        termino={reuniao.termino}
                                        tipoReuniao={reuniao.tipoReuniao}
                                    />
                                ))
                            )}

                            {/* Exibe reticências e quantidade de eventos restantes caso haja mais que dois */}
                            {(
                                reunioesNesteDia?.length > 2 && (
                                    <Typography variant="body2">
                                        +{reunioesNesteDia.length - 2}...
                                    </Typography>
                                )
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
