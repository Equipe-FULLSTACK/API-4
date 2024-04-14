import React from 'react';
import { Typography } from '@mui/material';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DateRangeProps {
    period: 'Dia' | 'Semana' | 'Mes';
    selectedDate: string; // Data selecionada em formato yyyy-MM-dd
    typographyProps?: React.ComponentProps<typeof Typography>;
}

const DateRange: React.FC<DateRangeProps> = ({ period, selectedDate, typographyProps }) => {
    // Converte a data selecionada para um objeto Date
    const date = new Date(selectedDate);
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    // Determina o intervalo de datas com base no período
    switch (period) {
        case 'Dia':
            startDate = date;
            endDate = date;
            break;
        case 'Semana':
            startDate = startOfWeek(date, { locale: ptBR });
            endDate = endOfWeek(date, { locale: ptBR });
            break;
        case 'Mes':
            startDate = startOfMonth(date);
            endDate = endOfMonth(date);
            break;
        default:
            throw new Error('Período inválido.');
    }

    // Formata as datas para o formato brasileiro
    const formattedStartDate = format(startDate, 'dd/MM/yyyy', { locale: ptBR });
    const formattedEndDate = format(endDate, 'dd/MM/yyyy', { locale: ptBR });

    // Retorna uma tipografia com o intervalo de datas formatado
    return (
        <Typography {...typographyProps}>
            {period === 'Dia' ? (
                formattedStartDate
            ) : (
                `${formattedStartDate} - ${formattedEndDate}`
            )}
        </Typography>
    );
};

export default DateRange;
