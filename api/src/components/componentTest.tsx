import React, { useState } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// Seu array de eventos
const eventosReuniao = [
    {
        nome: 'Reunião de Desenvolvimento',
        inicio: '11:30',
        termino: '12:30',
        tipoReuniao: 'Online',
        data: '2024-04-16',
    },
    // Adicione mais eventos aqui, conforme necessário
];

const CalendarComponent = () => {
    // Estado para a data selecionada
    const [dataSelecionada, setDataSelecionada] = useState(null);

    // Filtrando os eventos para a data selecionada
    const eventosFiltrados = eventosReuniao.filter(evento =>
        dataSelecionada ? evento.data === dataSelecionada.toISOString().split('T')[0] : false
    );

    return (
        <Box padding={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Selecione uma data"
                    value={dataSelecionada}
                    onChange={setDataSelecionada}
                    renderInput={(props) => <input {...props} />}
                />
            </LocalizationProvider>

            {/* Exibir os eventos para a data selecionada */}
            <Box marginTop={2}>
                <Typography variant="h6">Eventos na data selecionada:</Typography>
                {eventosFiltrados.length > 0 ? (
                    <List>
                        {eventosFiltrados.map((evento, index) => (
                            <ListItem key={index}>
                                <Typography>
                                    {evento.nome} ({evento.inicio} - {evento.termino})
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography>Nenhum evento na data selecionada.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default CalendarComponent;
