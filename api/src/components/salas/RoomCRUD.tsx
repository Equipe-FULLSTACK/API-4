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

interface FormData {
  id: number | null;
  id_sala_presencial?: number;
  nome: string;
  permissao_sala: string;
  tipo_sala: string;
  link_sala: string;
  vagas_sala: string;
  tamanho_sala: string;
}

const RoomCRUD = ({
  open,
  onClose,
  sala,
  adicionarSala,
  onUpdateRoom,
  onDeleteRoom,
  isUpdating,
  selectedRoomId, // Recebe o ID da sala selecionada
}) => {
  const [formData, setFormData] = useState<FormData>({
    id: sala?.id || null,
    nome: sala?.nome || "",
    id_sala_presencial: selectedRoomId,
    permissao_sala: sala?.permissao_sala || "",
    tipo_sala: sala?.tipo_sala || "",
    link_sala: sala?.link_sala || "",
    vagas_sala: sala?.vagas_sala || "",
    tamanho_sala: sala?.tamanho_sala || "Pequena",
  });

  const [errors, setErrors] = useState({});
  const [categoria, setCategoria] = useState<string>(formData.tipo_sala);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [tamanhoSala, setTamanhoSala] = useState<string>(formData.tamanho_sala);

  useEffect(() => {
    setFormData({
      id: sala?.id || null,
      nome: sala?.nome || "",
      permissao_sala: sala?.permissao_sala || "",
      tipo_sala: sala?.tipo_sala || "",
      link_sala: sala?.link_sala || "",
      vagas_sala: sala?.vagas_sala || "",
      tamanho_sala: sala?.tamanho_sala || "",
    });
    setCategoria(sala?.tipo_sala || "");
  }, [sala]);

  useEffect(() => {
    if (selectedRoomId) {
      setFormData((prevData) => ({
        ...prevData,
        id_sala_presencial: selectedRoomId,
      }));
    }
  }, [selectedRoomId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "tipo_sala") {
      setCategoria(value);
      // Defina tamanho_sala para vazio se o tipo_sala for Online
      const novoTamanhoSala = value === "Online" ? "" : tamanhoSala;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        tamanho_sala: novoTamanhoSala,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const isFormComplete =
    formData.nome &&
    formData.permissao_sala &&
    formData.tipo_sala &&
    formData.vagas_sala;

  const handleSave = async () => {
    const {
      nome,
      permissao_sala,
      tipo_sala,
      link_sala,
      vagas_sala,
      tamanho_sala,
    } = formData;

    try {
      let response;
      let url;

      if (tipo_sala === "Presencial") {
        url = "http://localhost:3000/salapresencial";
        response = await axios.post(url, {
          nome: nome,
          tamanho: tamanho_sala,
          vagas: vagas_sala,
          permissao_sala: permissao_sala,
        });
      } else if (tipo_sala === "Online") {
        url = "http://localhost:3000/salaonline";
        response = await axios.post(url, {
          nome: nome,
          link: link_sala,
        });
      }

      console.log(`API ${url} response:`, response.data);

      if (response.data) {
        const nomeSala = response.data.insertId;
        setSnackbarMessage("Sala adicionada com sucesso!");
        console.log("Sala:", response.data);
        if (nomeSala) {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
          /* window.location.reload() */
        } else {
          throw new Error("Nenhuma sala encontrada na resposta");
        }
      } else {
        throw new Error("Nenhuma resposta recebida do servidor");
      }
    } catch (error) {
      console.error("Erro ao criar reunião:", error);
      alert(`${error}`);
    }

    onClose();
  };

  const handleUpdate = async () => {
    const {
      id_sala_presencial,
      nome,
      permissao_sala,
      vagas_sala,
      tamanho_sala,
    } = formData;

    console.log("ID recebido em handleUpdate:", id_sala_presencial);

    if (!id_sala_presencial) {
      alert("ID não encontrado. Verifique os dados do formulário.");
      return;
    }

    try {
      let url = `http://localhost:3000/salapresencial/${id_sala_presencial}`;

      let response = await axios.put(url, {
        nome: nome,
        tamanho: tamanho_sala,
        vagas: vagas_sala,
        permissao_sala: permissao_sala,
      });

      console.log(`API ${url} response:`, response.data);

      if (response.data) {
        setSnackbarMessage("Sala atualizada com sucesso!");
        onUpdateRoom(response.data); // Atualiza a sala na lista
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 1300);
      } else {
        throw new Error("Nenhuma resposta recebida do servidor");
      }
    } catch (error) {
      console.error("Erro ao atualizar sala:", error);
      alert(`${error}`);
    }
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
            {formData.id ? "Editar Sala" : "Adicionar Sala"}
          </Typography>

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
              <MenuItem value="Presencial">Presencial</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {categoria === "Presencial" && (
            <>
              <Select
                labelId="tamanho-sala-label"
                id="tamanho-sala"
                name="tamanho_sala"
                value={formData.tamanho_sala}
                onChange={handleChange}
                label="Tamanho da Sala"
              >
                <MenuItem value="Pequena">Pequena</MenuItem>
                <MenuItem value="Média">Média</MenuItem>
                <MenuItem value="Grande">Grande</MenuItem>
                <MenuItem value="Auditório">Auditório</MenuItem>
              </Select>
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
            </>
          )}

          {categoria === "Online" && (
            <TextField
              label="Link"
              name="link_sala"
              type="text"
              value={formData.link_sala}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          )}

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
              onClick={isUpdating ? handleUpdate : handleSave}
              disabled={!isFormComplete}
            >
              {isUpdating ? "Atualizar" : "Salvar"}
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

export default RoomCRUD;
function setOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
