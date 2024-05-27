import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { Meeting } from '../../../types/MeetingTypes';
import { SalaOnline } from '../../../types/roomOnlineTypes';
import { SalaPresencial } from '../../../types/roomPresencialTypes';
import DateInput from './DateTimeInputField';

interface MeetingCRUDProps {
    open: boolean;
    onClose: () => void;
    reunioes: Meeting[];
    reuniao?: Meeting;
    adicionarReuniao: (reuniao: Meeting) => void;
    atualizarReuniao: (reuniao: Meeting) => void;
    removerReuniao: (id: number) => void;
    salasPresenciais: SalaPresencial[];
    salasOnline: SalaOnline[];
}

axios.defaults.withCredentials = true;
const MeetingCRUD: React.FC<MeetingCRUDProps> = ({ open, onClose, reuniao, adicionarReuniao, atualizarReuniao, removerReuniao, salasPresenciais, salasOnline }) => {
    const [formData, setFormData] = useState<Meeting>({
        id_reuniao: 0,
        titulo: '',
        descricao: '',
        data_inicio: new Date(),
        data_final: new Date(),
        tipo: 'Presencial',
        sala_presencial_id: 0,
        sala_online_id: 0,
        organizador_id: 0,
    });

    useEffect(() => {
        if (reuniao) {
            setFormData(reuniao);
        }
    }, [reuniao]);

    const handleSave = async () => {
        try {
            const duration = Math.floor((new Date(formData.data_final).getTime() - new Date(formData.data_inicio).getTime()) / 60000); // Calcula a duração em minutos
            const dataToSend = { ...formData, duracao: duration };
            
            console.log('Dados enviados para salvar reunião:', dataToSend);
            if (formData.id_reuniao) {
                await axios.put(`http://localhost:3000/zoom/meetings/:${formData.id_reuniao}`, dataToSend);
                console.log('Reunião atualizada:', formData);
                atualizarReuniao(formData);
            } else {
                const response = await axios.post('http://localhost:3000/zoom/meetings', dataToSend);
                console.log('Reunião criada:', response.data);
                adicionarReuniao(response.data);
                alert("Reunião criada com sucesso!");
            }
            onClose();
        } catch (error) {
            console.error('Erro ao salvar reunião:', error);
        }
    };

    const handleRemove = async () => {
        try {
            if (formData.id_reuniao) {
                console.log('Removendo reunião com ID:', formData.id_reuniao);
                await axios.delete(`http://localhost:3000/zoom/meeting/:${formData.id_reuniao}`);
                removerReuniao(formData.id_reuniao);
                onClose();
            }
        } catch (error) {
            console.error('Erro ao remover reunião:', error);
        }
    };

    const handleDataInicioChange = (date: Date) => {
        setFormData({ ...formData, data_inicio: date });
    };

    const handleDataFinalChange = (date: Date) => {
        setFormData({ ...formData, data_final: date });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    backgroundColor: '#2F2F2F',
                    border: '1px solid #000',
                    boxShadow: 24,
                    padding: 4,
                    zIndex: 1300
                }}
            >
                <TextField
                    label="Título"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Descrição"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <DateInput
                    initialDate={formData.data_inicio}
                    onDateChange={handleDataInicioChange}
                />
                <DateInput
                    initialDate={formData.data_final}
                    onDateChange={handleDataFinalChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Tipo</InputLabel>
                    <Select
                        value={formData.tipo}
                        onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'Presencial' | 'Hibrido' | 'Online' })}
                    >
                        <MenuItem value="Presencial">Presencial</MenuItem>
                        <MenuItem value="Hibrido">Hibrido</MenuItem>
                        <MenuItem value="Online">Online</MenuItem>
                    </Select>
                </FormControl>
                {formData.tipo === 'Presencial' || formData.tipo === 'Hibrido' ? (
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Sala Presencial</InputLabel>
                        <Select
                            value={formData.sala_presencial_id}
                            onChange={(e) => setFormData({ ...formData, sala_presencial_id: Number(e.target.value) })}
                        >
                            {salasPresenciais.map((sala) => (
                                <MenuItem key={sala.id_sala_presencial} value={sala.id_sala_presencial}>
                                    {sala.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : null}
                {formData.tipo === 'Online' || formData.tipo === 'Hibrido' ? (
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Sala Online</InputLabel>
                        <Select
                            value={formData.sala_online_id}
                            onChange={(e) => setFormData({ ...formData, sala_online_id: Number(e.target.value) })}
                        >
                            {salasOnline.map((sala) => (
                                <MenuItem key={sala.id_sala_online} value={sala.id_sala_online}>
                                    {sala.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : null}
                
                <Box display="flex" justifyContent="space-between" mt={3}>
                    {formData.id_reuniao && (
                        <Button variant="outlined" color="secondary" onClick={handleRemove}>
                            Remover
                        </Button>
                    )}
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default MeetingCRUD;
