import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

import { URI } from '../../utilities/uris/uri';

const MeetingCRUD = ({ open, onClose, reuniao, adicionarReuniao, atualizarReuniao, removerReuniao }) => {
    // Estados locais para armazenar os dados da reunião
    const [formData, setFormData] = useState({
        id: reuniao?.id || null,
        nome: reuniao?.nome || '',
        data: reuniao?.data || '',
        inicio: reuniao?.inicio || '',
        termino: reuniao?.duracao || '',
        tipoReuniao: reuniao?.tipoReuniao || '',
    });

    // Define a data e hora atuais
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toTimeString().split(' ')[0].slice(0, 5);
        const oneHourLater = new Date(new Date().getTime() + 60 * 60 * 1000).toTimeString().split(' ')[0].slice(0, 5);

        setFormData({
            id: reuniao?.id || null,
            nome: reuniao?.nome || '',
            data: reuniao?.data || currentDate,
            inicio: reuniao?.inicio || currentTime,
            termino: reuniao?.duracao || 30,
            tipoReuniao: reuniao?.tipoReuniao || '',
        });
    }, [reuniao]);

    // Manipulador de mudança de formulário
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Verifica se todos os campos foram preenchidos para habilitar o botão salvar
    const isFormComplete = formData.nome && formData.data && formData.inicio && formData.termino && formData.tipoReuniao;

    const handleSave = async () => {
        const { nome, data, inicio, termino, tipoReuniao } = formData;
    
        // Verifica se a reunião não é presencial antes de prosseguir com a criação da reunião via API
        if (tipoReuniao !== 'Presencial') {
            // Format the date and time
            const start_time = `${data}T${inicio}:00`;
            const duration = parseInt(termino); // Assuming termino is in minutes
    
            try {
                // Chama o endpoint de API com os dados formatados
                const response = await axios.post('http://localhost:3000/criar_reuniao', {
                    topic: nome,
                    start_time: start_time,
                    duration: duration,
                    agenda: tipoReuniao,
                });
    
                console.log('API createProcess response:', response.data);
    
                // Extrai o link de reunião (join_url) da resposta
                const meeting = response.data.meeting;
                console.log('Meeting:', meeting);
    
                if (meeting) {
                    const joinUrl = meeting.join_url;
                    console.log('Meeting join URL:', joinUrl);
    
                    // Exibe a reunião ao usuário
                    adicionarReuniao(formData);
                    alert(`Reunião criada com sucesso! \n Link da reunião: ${joinUrl}`);
    
                    // Abre o joinUrl em uma nova aba
                    window.open(joinUrl, '_blank');
                } else {
                    throw new Error('Nenhuma reunião encontrada na resposta');
                }
            } catch (error) {
                console.error('Erro ao criar reunião:', error);
                alert(`${error}`);
            }
        } else {
            // Se o tipo de reunião for "Presencial", não chame a API e apenas adicione a reunião
            adicionarReuniao(formData);
            alert(`Reunião presencial adicionada com sucesso!`);
        }
    
        // Fecha o modal
        onClose();
    };
    
    const handleRemove = () => {
        if (formData.id) {
            removerReuniao(formData.id);
        }
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    backgroundColor: '#2F2F2F',
                    border: '1px solid #000',
                    boxShadow: 24,
                    padding: 4,
                    zIndex: 1300 // z-index alto para garantir que o modal fique na frente
                }}
            >
                <Typography variant="h6">
                    {formData.id ? 'Editar Reunião' : 'Adicionar Reunião'}
                </Typography>

                {/* Campo de formulário para o nome */}
                <TextField
                    label="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Campo de formulário para a data */}
                <TextField
                    label="Data"
                    name="data"
                    type="date"
                    value={formData.data}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Campo de formulário para o horário de início */}
                <TextField
                    label="Início"
                    name="inicio"
                    type="time"
                    value={formData.inicio}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Campo de formulário para o horário de término */}
                <TextField
                    label="Duração"
                    name="termino"
                    type="text"
                    value={formData.termino}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Campo de formulário para o tipo de reunião como lista suspensa */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="tipo-reuniao-label">Tipo de Reunião</InputLabel>
                    <Select
                        labelId="tipo-reuniao-label"
                        id="tipo-reuniao"
                        name="tipoReuniao"
                        value={formData.tipoReuniao}
                        onChange={handleChange}
                        label="Tipo de Reunião"
                    >
                        <MenuItem value="Online">Virtual</MenuItem>
                        <MenuItem value="Presencial">Presencial</MenuItem>
                        <MenuItem value="Hibrido">Híbrido</MenuItem>
                    </Select>
                </FormControl>

                {/* Botões para remover, salvar ou cancelar */}
                <Box display="flex" justifyContent="space-between" mt={3}>
                    {formData.id && (
                        <Button variant="outlined" color="secondary" onClick={handleRemove}>
                            Remover
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={!isFormComplete} // Desabilita o botão salvar se o formulário não estiver completo
                    >
                        Salvar
                    </Button>
                    <Button variant="text" color="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default MeetingCRUD;
