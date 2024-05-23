import React, { useState, useEffect } from 'react';
import { TextField, Typography, Stack, Tooltip } from '@mui/material';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DateInputProps {
    onDateChange: (date: Date) => void;
    initialDate: Date;
    formatDate: 'Dia' | 'Semana' | 'Mes' | 'Todos';
    disabled?: boolean;
    required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange, initialDate, formatDate, disabled = false, required = false }) => {
    // Estado para a data selecionada e descrição da data
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
    const [dateDescription, setDateDescription] = useState<string>('');

    // Atualiza a data selecionada quando initialDate muda
    useEffect(() => {
        if (initialDate) {
            setSelectedDate(initialDate);
        }
    }, [initialDate]);

    // Atualiza a data e chama a função de mudança de data
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(event.target.value);
        setSelectedDate(newDate);
        onDateChange(newDate);
        console.log(`Teste nova data ${newDate}`);
    };

    // Atualiza a descrição da data sempre que selectedDate ou formatDate mudarem
    useEffect(() => {
        try {
            let description = '';
            const date = selectedDate;

            // Cria descrição com base no formato da data
            if (formatDate === 'Dia') {
                description = `Agenda do dia ${format(date, 'dd/MM/yyyy', { locale: ptBR })}`;
            } else if (formatDate === 'Semana') {
                const startOfSelectedWeek = format(startOfWeek(date, { weekStartsOn: 1 }), 'dd/MM/yyyy', { locale: ptBR });
                const endOfSelectedWeek = format(endOfWeek(date, { weekStartsOn: 1 }), 'dd/MM/yyyy', { locale: ptBR });
                description = `Agenda da semana de ${startOfSelectedWeek} a ${endOfSelectedWeek}`;
            } else if (formatDate === 'Mes') {
                const startOfSelectedMonth = format(startOfMonth(date), 'dd/MM/yyyy', { locale: ptBR });
                const endOfSelectedMonth = format(endOfMonth(date), 'dd/MM/yyyy', { locale: ptBR });
                description = `Agenda do mês de ${startOfSelectedMonth} a ${endOfSelectedMonth}`;
            } else {
                description = 'Lista de todas as reuniões cadastradas no sistema.';
            }

            // Atualiza a descrição da data
            setDateDescription(description);
        } catch (error) {
            console.error('Erro ao formatar a data:', error);
            setDateDescription('Erro ao formatar a data');
        }
    }, [selectedDate, formatDate]);

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            {/* Campo de texto para selecionar a data com tooltip */}
            <Tooltip title="Selecione uma data">
                <TextField
                    type="date"
                    lang="PT-BR"
                    label="Selecione uma data"
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={handleDateChange}
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: 200 }}
                    disabled={disabled}
                    required={required}
                />
            </Tooltip>

            {/* Exibe a descrição da data */}
            <Stack width="100%" justifyContent="center" alignItems="center">
                <Typography variant="h5">
                    {dateDescription}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default DateInput;
