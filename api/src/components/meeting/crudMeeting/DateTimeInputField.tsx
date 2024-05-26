import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ptBRLocale from 'dayjs/locale/pt-br';

// Configura o idioma globalmente para o dayjs
dayjs.locale(ptBRLocale);

interface DateInputProps {
    onDateChange: (date: Date) => void;
    initialDate?: Date;
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange, initialDate }) => {
    const [value, setValue] = React.useState<Dayjs>(dayjs(initialDate || '2022-04-17T15:30'));

    const logSelectedValue = (newValue: Dayjs) => {
        if (newValue) {
            console.log('Valor selecionado:', newValue.format('DD/MM/YYYY HH:mm'));
        } else {
            console.log('Nenhum valor selecionado');
        }
    };

    useEffect(() => {
        logSelectedValue(value);
    }, [value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label="Controlled picker"
                value={value}
                format='DD/MM/YYYY HH:mm'
                onChange={(newValue) => {
                    if (newValue) {
                        setValue(newValue);
                        logSelectedValue(newValue);
                        onDateChange(newValue.toDate());
                    }
                }}
            />
        </LocalizationProvider>
    );
};

export default DateInput;
