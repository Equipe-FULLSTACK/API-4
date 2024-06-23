import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField, Grid } from '@mui/material';
import ptBRLocale from 'dayjs/locale/pt-br';

// Configura o idioma globalmente para o dayjs
dayjs.locale(ptBRLocale);

interface DateInputProps {
  onDateChange: (dataInicio: Date, dataFinal: Date, duracao: number) => void;
  initialDate?: Date;
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange, initialDate }) => {
  const [date, setDate] = useState<Dayjs>(dayjs(initialDate || new Date()));
  const [time, setTime] = useState<Dayjs>(dayjs(initialDate || new Date()));
  const [duration, setDuration] = useState<number>(60); // Default duration to 60 minutes

  useEffect(() => {
    const combinedDate = date.hour(time.hour()).minute(time.minute());
    const dataInicio = combinedDate.toDate();
    const dataFinal = dayjs(combinedDate).add(duration, 'minute').toDate();
    onDateChange(dataInicio, dataFinal, duration);
  }, [date, time, duration, onDateChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DatePicker
            label="Data de Início"
            value={date}
            onChange={(newValue) => {
              if (newValue) {
                setDate(newValue);
              }
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TimePicker
            label="Hora de Início"
            value={time}
            onChange={(newValue) => {
              if (newValue) {
                setTime(newValue);
              }
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Duração (minutos)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            fullWidth
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default DateInput;
