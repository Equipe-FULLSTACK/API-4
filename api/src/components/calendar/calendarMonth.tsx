import React, { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Tooltip } from '@mui/material';
import { startOfMonth, endOfMonth, addDays, format, isSameDay, isToday } from 'date-fns';

interface CalendarProps {
  onDayClick: (date: Date) => void;
}

const MonthlyCalendar: React.FC<CalendarProps> = ({ onDayClick }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Data atual
  const currentDate = new Date();

  // Início e fim do mês atual
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  // Número total de dias no mês atual
  const totalDaysInMonth = Math.floor((endOfCurrentMonth.getTime() - startOfCurrentMonth.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Calcula os dias do mês atual em uma lista
  const daysOfMonth = Array.from({ length: totalDaysInMonth }, (_, i) => addDays(startOfCurrentMonth, i));

  // Manipulador de clique para um dia específico
  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    onDayClick(day);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Calendário Mensal
      </Typography>
      <Grid container spacing={2}>
        {daysOfMonth.map((day) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={day.toString()}>
            <Tooltip title={`Dia ${format(day, 'd MMMM yyyy')}`} placement="top">
              <Card
                variant={isToday(day) ? 'outlined' : 'elevation'}
                sx={{
                  backgroundColor: isSameDay(day, selectedDate) ? 'primary.main' : 'background.paper',
                  color: isSameDay(day, selectedDate) ? 'white' : 'text.primary',
                  cursor: 'pointer',
                }}
                onClick={() => handleDayClick(day)}
              >
                <CardContent>
                  <Typography variant="h6">
                    {format(day, 'd')}
                  </Typography>
                </CardContent>
              </Card>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MonthlyCalendar;
