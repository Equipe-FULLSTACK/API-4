import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Stack,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import NovoEventoButton from "../../components/botoes/btnNovoEvento";
import SearchButton from "../../components/botoes/btnSearch";
import PrintButton from "../../components/botoes/btnPrint";
import ProfileActions from "../../components/perfil/profileActions";
import NavBar from "../../components/navBar/navBar";
import PermissionFilter from "../../components/salas/PermissionFilter";
import { Room } from "../../types/RoomTypes";
import axios from "axios";
import RoomTable from "../../components/salas/RoomPage";
import RoomCRUD from "../../components/salas/RoomCRUD";
import { authenticateUser } from "../../services/auth";
import { eadmin } from "../../services/auth";
import TelaSalaUsuarios from "../users/TelaSalaUsuarios";
import BtnSIATT from "../../components/botoes/btnSIATTLogo";
import DateInput from "../../components/calendar/CalendarComponent";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const API_URL = "http://localhost:3000";

const HomePageAdminRooms: React.FC = () => {
  const [tipoSelecionado, setTipoSelecionado] = useState("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [salaEditada, setSalaEditada] = useState(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  console.log(eadmin);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get<Room[]>(`${API_URL}/salapresencial`);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleSearch = async (text: string) => {
    // A FAZER
  };

  const handleTipoChange = (novoTipo: string) => {
    // A FAZER
  };

  const handleDeleteRoom = async (roomId: number) => {
    try {
      await axios.delete(`${API_URL}/salapresencial/${roomId}`);
      setRooms((prevRooms) =>
        prevRooms.filter((room) => room.id_sala !== roomId)
      );
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleEditPermission = async (roomId: number) => {
    try {
      const response = await axios.get<Room>(
        `${API_URL}/salapresencial/${roomId}`
      );
      setSalaEditada(response.data); // Define a sala editada com base na resposta da API
      setSelectedRoomId(response.data.id); // Define o ID da sala selecionada
      setModalOpen(true); // Abre o modal para edição
    } catch (error) {
      console.error("Error fetching room for edit:", error);
    }
  };

  return (
    <>
      {eadmin ? (
        <ThemeProvider theme={darkTheme}>
          <Stack flexDirection="row" sx={{ width: "100%" }}>
            <Stack height="100vh" flexDirection="row" marginRight={1}>
              <NavBar />
              <Divider orientation="vertical" />
            </Stack>
            <Divider />
            <Stack width="100%">
              <Stack
                flexDirection="row"
                height={40}
                padding={1}
                margin="1rem 3rem 1rem 0rem"
                justifyContent="space-between"
                width="auto"
              >
                <Box display="flex" gap="40px">
                  <BtnSIATT />
                  <NovoEventoButton onClick={() => setModalOpen(true)} />
                  <SearchButton onSearch={handleSearch} />
                  <PrintButton />
                </Box>

                <ProfileActions />
              </Stack>
              <Divider />
              <Stack>
                <Stack
                  flexDirection={"row"}
                  justifyContent="space-between"
                  marginRight={3}
                  marginLeft={3}
                  marginBottom={2}
                  marginTop={2}
                  alignItems="center"
                >
                  <Box display="flex" gap="5px" alignItems="center">
                    <Box
                      width={5}
                      height={27}
                      sx={{
                        background: 'linear-gradient(to top, #cfd30b, #d1d50c)',
                        borderTopLeftRadius: 4, 
                        borderBottomLeftRadius: 4, 
                      }}
                    ></Box>
                    <Typography fontSize="35px">Lista de salas</Typography>
                  </Box>
                  <Stack width={"20rem"}>
                    <PermissionFilter
                      permissionSelected={tipoSelecionado}
                      onPermissionChange={handleTipoChange}
                    />
                  </Stack>
                </Stack>
                <Stack>
                  <RoomTable
                    rooms={rooms}
                    setRooms={setRooms}
                    onDeleteRoom={handleDeleteRoom}
                    onEditPermission={handleEditPermission}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <RoomCRUD
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            sala={salaEditada}
            adicionarSala={(novaSala) => setRooms([...rooms, novaSala])}
            onUpdateRoom={(id, salaAtualizada) =>
              setRooms(
                rooms.map((sala) => (sala.id === id ? salaAtualizada : sala))
              )
            }
          />
        </ThemeProvider>
      ) : (
        <TelaSalaUsuarios />
      )}
    </>
  );
};

export default HomePageAdminRooms;
