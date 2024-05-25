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

const RoomCRUDPresencial = ({
  open,
  onClose,
  sala,
  adicionarSala,
  atualizarSala,
  removerSala,
}) => {
  const [formData, setFormData] = useState({
    id: sala?.id || null,
    nome: sala?.nome || "",
    tamanho_sala: sala?.tamanho_sala || "",
    vagas_sala: sala?.vagas_sala || "",
    permissao_sala: sala?.permissao_sala || "",
  });

  useEffect(() => {
    setFormData({
      id: sala?.id || null,
      nome: sala?.nome || "",
      tamanho_sala: sala?.tamanho_sala || "",
      vagas_sala: sala?.vagas_sala || "",
      permissao_sala: sala?.permissao_sala || "",
    });
  }, [sala]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isFormComplete =
    formData.nome &&
    formData.tamanho_sala &&
    formData.vagas_sala &&
    formData.permissao_sala;

  const handleSave = async () => {
    const { id, nome, tamanho_sala, vagas_sala, permissao_sala } = formData;

    try {
      if (id) {
        const response = await axios.put(
          `http://localhost:3000/salapresencial/${id}`,
          {
            nome_sala: nome,
            tamanho_sala: tamanho_sala,
            vagas_sala: vagas_sala,
            permissao_sala: permissao_sala,
          }
        );

        console.log("API update response:", response.data);

        if (response.data) {
          atualizarSala(formData);
          alert(`Sala Atualizada com Sucesso`);
        } else {
          throw new Error("Nenhuma sala encontrada na resposta");
        }
      } else {
        const response = await axios.post(
          "http://localhost:3000/salapresencial",
          {
            nome_sala: nome,
            tamanho_sala: tamanho_sala,
            vagas_sala: vagas_sala,
            permissao_sala: permissao_sala,
          }
        );

        console.log("API create response:", response.data);

        if (response.data) {
          adicionarSala(formData);
          alert(`Sala Criada com Sucesso`);
        } else {
          throw new Error("Nenhuma sala encontrada na resposta");
        }
      }
    } catch (error) {
      console.error("Erro ao criar/atualizar sala:", error);
      alert(`${error}`);
    }

    onClose();
  };

  const handleRemove = async () => {
    try {
      if (formData.id) {
        const response = await axios.delete(
          `http://localhost:3000/salapresencial/${formData.id}`
        );
        console.log("API delete response:", response.data);

        if (response.data) {
          removerSala(formData.id);
          alert(`Sala Removida com Sucesso`);
        } else {
          throw new Error("Nenhuma sala encontrada na resposta");
        }
      } else {
        throw new Error("ID da sala não encontrado");
      }
    } catch (error) {
      console.error("Erro ao remover sala:", error);
      alert(`${error}`);
    }

    onClose();
  };

  return (
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
          {formData.id ? "Editar Sala" : "Adicionar Sala"}
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

export default RoomCRUDPresencial;
