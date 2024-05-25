import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CardMettingDay from './CardMettingDay';
import { Meeting } from '../../types/MeetingTypes';
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface VisualizacaoDiariaProps {
  dataSelecionada: Date;
  reunioes: Meeting[];
}

const VisualizacaoDiaria: React.FC<VisualizacaoDiariaProps> = ({ dataSelecionada, reunioes }) => {
  // Função para filtrar reuniões por data selecionada
  const filtrarReunioesPorDia = (date: Date): Meeting[] => {
    return reunioes
      .filter(reuniao => isSameDay(new Date(reuniao.data_inicio), date))
      .sort((a, b) => new Date(a.data_inicio).getTime() - new Date(b.data_inicio).getTime());
  };

  // Formata a data para 'dd/MM/yyyy'
  const formatarData = (date: Date): string => format(date, 'dd/MM/yyyy', { locale: ptBR });

  // Formata a hora para 'HH:mm'
  const formatarHora = (date: Date): string => format(date, 'HH:mm', { locale: ptBR });

  // Filtra reuniões por data selecionada
  const reunioesFiltradas = filtrarReunioesPorDia(dataSelecionada);

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
              <TableCell>{formatarData(new Date(reuniao.data_inicio))}</TableCell>
              <TableCell>{formatarHora(new Date(reuniao.data_inicio))}</TableCell>
              <TableCell>
                {/* Exibe o componente CardMettingDay para a reunião */}
                <CardMettingDay
                  nome={reuniao.titulo}
                  inicio={reuniao.data_inicio.toString()}
                  termino={reuniao.data_final.toString()}
                  tipoReuniao={reuniao.tipo}
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
