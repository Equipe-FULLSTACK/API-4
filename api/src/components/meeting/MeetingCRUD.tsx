import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import CustomizedSnackbars from "../snackbar/Snackbar";
import { URI } from "../../utilities/uris/uri";

const MeetingCRUD = ({
  open,
  onClose,
  reuniao,
  adicionarReuniao,
  atualizarReuniao,
  removerReuniao,
}) => {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [formData, setFormData] = useState({
    id: reuniao?.id || null,
    nome: reuniao?.nome || "",
    data: reuniao?.data || "",
    inicio: reuniao?.inicio || "",
    termino: reuniao?.duracao || "",
    tipoReuniao: reuniao?.tipoReuniao || "",
  });

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toTimeString().split(" ")[0].slice(0, 5);
    setFormData({
      id: reuniao?.id || null,
      nome: reuniao?.nome || "",
      data: reuniao?.data || currentDate,
      inicio: reuniao?.inicio || currentTime,
      termino: reuniao?.duracao || 30,
      tipoReuniao: reuniao?.tipoReuniao || "",
    });
  }, [reuniao]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isFormComplete =
    formData.nome &&
    formData.data &&
    formData.inicio &&
    formData.termino &&
    formData.tipoReuniao;

  const handleSave = async () => {
    const { nome, data, inicio, termino, tipoReuniao } = formData;
    console.log("Tentando salvar a reunião com os seguintes dados:", formData);

    if (tipoReuniao !== "Presencial") {
      const start_time = `${data}T${inicio}:00`;
      const duration = parseInt(termino);

      try {
        console.log("Enviando dados para a API:", { topic: nome, start_time, duration, agenda: tipoReuniao });
        const response = await axios.post(
          "http://localhost:3000/zoom/meetings",
          {
            titulo: nome,
            data_inicio: start_time,
            duracao: duration,
            descricao: tipoReuniao,
          }
        );

        console.log("Resposta da API createProcess:", response.data);
        const meeting = response.data.meeting;
        if (meeting) {
          const joinUrl = meeting.zoom_meeting_join_url;
          console.log("Meeting join URL:", joinUrl);
          adicionarReuniao(formData);
          alert(`Reunião criada com sucesso! \n Link da reunião: ${joinUrl}`);
          window.open(joinUrl, "_blank");
        } else {
          throw new Error("Nenhuma reunião encontrada na resposta");
        }
      } catch (error) {
        console.error("Erro ao criar reunião:", error);
        alert(`Erro ao criar reunião: ${error}`);
      }
    } else {
      adicionarReuniao(formData);
      setSnackbarMessage("Sala adicionada com sucesso!");
    }
    onClose();
  };

  const handleRemove = () => {
    console.log("Removendo reunião com ID:", formData.id);
    if (formData.id) {
      removerReuniao(formData.id);
    }
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "#2F2F2F",
            border: "1px solid #000",
            boxShadow: 24,
            padding: 4,
            zIndex: 1300,
          }}
        >
          <Typography variant="h6">
            {formData.id ? "Editar Reunião" : "Adicionar Reunião"}
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
            label="Data"
            name="data"
            type="date"
            value={formData.data}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Início"
            name="inicio"
            type="time"
            value={formData.inicio}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Duração"
            name="termino"
            type="text"
            value={formData.termino}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
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
          <Box display="flex" justifyContent="space-between" mt={3}>
            {formData.id && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleRemove}
              >
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
      {snackbarMessage && (
        <CustomizedSnackbars
          open={true}
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      )}
    </>
  );
};

export default MeetingCRUD;
