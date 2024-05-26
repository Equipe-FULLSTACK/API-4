import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

interface DateInputProps {
    onDateChange: (date: Date) => void;
    initialDate: Date;
}

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

const DateInput: React.FC<DateInputProps> = ({ onDateChange, initialDate }) => {
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(dayjs(initialDate));

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      onDateChange(date.toDate());
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default DateInput;
