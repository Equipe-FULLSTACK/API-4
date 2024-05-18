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
  atualizarSala,
  onUpdateRoom,
  onDeleteRoom,
}) => {
  const [formData, setFormData] = useState<FormData>({
    id: sala?.id || null,
    nome: sala?.nome || "",
    permissao_sala: sala?.permissao_sala || "",
    tipo_sala: sala?.tipo_sala || "",
    link_sala: sala?.link_sala || "",
    vagas_sala: sala?.vagas_sala || "",
    tamanho_sala: sala?.tamanho_sala || "",
  });

  const [errors, setErrors] = useState({});
  const [categoria, setCategoria] = useState<string>(formData.tipo_sala);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "tipo_sala") {
      setCategoria(value);
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
          adicionarSala(formData);
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
      id,
      nome,
      permissao_sala,
      vagas_sala,
      tamanho_sala,
    } = formData;

    console.log(id)
  
    try {
     
      let url = `http://localhost:3000/salapresencial/${id}`;
  
      let response = await axios.put(url, {
        nome: nome,
        tamanho: tamanho_sala,
        vagas: vagas_sala,
        permissao_sala: permissao_sala,
      });
  
      console.log(`API ${url} response:`, response.data);
  
      if (response.data) {
        setSnackbarMessage("Sala atualizada com sucesso!");
        onUpdateRoom(id, formData); // Atualiza a sala na lista
        onClose();
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
              <MenuItem value="Online">Virtual</MenuItem>
              <MenuItem value="Hibrido">Híbrido</MenuItem>
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
              <TextField
                label="Tamanho"
                name="tamanho_sala"
                type="text"
                value={formData.tamanho_sala}
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
              onClick={handleSave}
              disabled={!isFormComplete}
            >
              Salvar
            </Button>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              disabled={!isFormComplete}
            >
              Atualizar
            </Button> */}
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
