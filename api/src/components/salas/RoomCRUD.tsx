import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const RoomCRUD = ({ open, onClose, sala, adicionarSala, atualizarSala, removerSala }) => {
    const [formData, setFormData] = useState({
        id: sala?.id || null,
        nome: sala?.nome || '',
        permissao_sala: sala?.permissao_sala || '',
        tipo_sala: sala?.tipo_sala || '',
        link_sala: sala?.link_sala || '',
        vagas_sala: sala?.vagas_sala || ''
    });

    useEffect(() => {
        setFormData({
            id: sala?.id || null,
            nome: sala?.nome || '',
            permissao_sala: sala?.permissao_sala || '',
            tipo_sala: sala?.tipo_sala || '',
            link_sala: sala?.link_sala || '',
            vagas_sala: sala?.vagas_sala || ''
        });
    }, [sala]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const isFormComplete = formData.nome && formData.permissao_sala && formData.tipo_sala && formData.link_sala && formData.vagas_sala;

    const handleSave = async () => {
        const { nome, permissao_sala, tipo_sala, link_sala, vagas_sala } = formData;
    
        try {
            const response = await axios.post('http://localhost:3000/sala', {
                nome_sala: nome,
                tipo_sala: tipo_sala,
                permissao_sala: permissao_sala,
                link_sala: link_sala,
                vagas_sala: vagas_sala
            });
    
            console.log('API createProcess response:', response.data);
    
            const nomeSala = response.data.insertId;
            console.log('Sala:', nomeSala);
    
            if (response.data) {
                const nomeSala = response.data.insertId; // Aqui você pode ajustar para o campo correto, dependendo do que deseja acessar
                console.log('Sala:', response.data);
            
                if (nomeSala) {
                    adicionarSala(formData);
                    alert(`Sala Criada com Sucesso`);
                } else {
                    throw new Error('Nenhuma sala encontrada na resposta');
                }
            } else {
                throw new Error('Nenhuma resposta recebida do servidor');
            }
        } catch (error) {
            console.error('Erro ao criar reunião:', error);
            alert(`${error}`);
        }
    
        onClose();
    };
    
    const handleRemove = () => {
        if (formData.id) {
            removerSala(formData.id);
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
                    zIndex: 1300
                }}
            >
                <Typography variant="h6">
                    {formData.id ? 'Editar Sala' : 'Adicionar Sala'}
                </Typography>

                <TextField
                    label="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Vagas"
                    name="vagas_sala"
                    type="text"
                    value={formData.vagas_sala}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Permissao"
                    name="permissao_sala"
                    type="text"
                    value={formData.permissao_sala}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Link"
                    name="link_sala"
                    type="text"
                    value={formData.link_sala}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="tipo-reuniao-label">Tipo de Reunião</InputLabel>
                    <Select
                        labelId="tipo-reuniao-label"
                        id="tipo-reuniao"
                        name="tipo_sala"
                        value={formData.tipo_sala}
                        onChange={handleChange}
                        label="Tipo de Reunião"
                    >
                        <MenuItem value="Online">Virtual</MenuItem>
                        <MenuItem value="Presencial">Presencial</MenuItem>
                        <MenuItem value="Hibrido">Híbrido</MenuItem>
                    </Select>
                </FormControl>

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
                        disabled={!isFormComplete}
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

export default RoomCRUD;
