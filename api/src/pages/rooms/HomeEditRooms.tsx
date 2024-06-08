import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Stack,
  Divider,
  Box,
  Typography,
  Button,
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
import { eadmin } from "../../services/auth";
import TelaSalaUsuarios from "../users/TelaSalaUsuarios";
import BtnSIATT from "../../components/botoes/btnSIATTLogo";
import OnlineRoom from "../../components/salas/Online";
import RoomTypeFilter from "../../components/salas/TypeRoomFilter";
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
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [onlineRooms, setOnlineRooms] = useState<Room[]>([]);
  const [showOnlineRooms, setShowOnlineRooms] = useState(false);

  console.log(eadmin);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get<Room[]>(`${API_URL}/salapresencial`);
        setAllRooms(response.data);
        // Ao buscar os quartos, defina os quartos filtrados inicialmente como todos os quartos
        setFilteredRooms(response.data);
        setSelectedRoomId(
          response.data.length > 0 ? response.data[0].id_sala_presencial : null
        );
        console.log("Salas:", response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleSearch = async (text: string) => {};

  const handleTipoChange = async (novoTipo: string) => {
    setTipoSelecionado(novoTipo);
    try {
      let response;
      if (novoTipo === "todos") {
        // Se todos os tipos de permissão devem ser exibidos, defina os quartos filtrados como todos os quartos
        setFilteredRooms(allRooms);
      } else {
        // Se um tipo de permissão específico foi selecionado, filtre os quartos pelo tipo de permissão
        const filtered = allRooms.filter(
          (room) => room.permissao_sala === novoTipo
        );
        setFilteredRooms(filtered);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
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
      console.log("Dados da sala recebidos:", response.data);
      console.log("ID da sala selecionada:", response.data.id_sala_presencial);
      setSalaEditada(response.data); // Define a sala editada com os dados da sala selecionada
      setModalOpen(true); // Abre o modal para edição
    } catch (error) {
      console.error("Error fetching room for edit:", error);
    }
  };

  const handleViewOnlineRooms = async () => {
    try {
      const response = await axios.get<Room[]>(`${API_URL}/salaonline`);
      setOnlineRooms(response.data);
      setShowOnlineRooms(true);
    } catch (error) {
      console.error("Error fetching online rooms:", error);
    }
  };

  const handleBackToRooms = () => {
    setShowOnlineRooms(false);
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
                  <NovoEventoButton
                    title="Criar sala"
                    onClick={() => setModalOpen(true)}
                  />
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
                        background: "linear-gradient(to top, #cfd30b, #d1d50c)",
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                      }}
                    ></Box>
                    <Typography fontSize="35px">Lista de salas</Typography>
                  </Box>
                  <Box display="flex" gap="20px" alignItems="center">
                    <Stack width={"20rem"}>
                      <PermissionFilter
                        permissionSelected={tipoSelecionado}
                        onPermissionChange={handleTipoChange}
                      />
                    </Stack>
                    <Box>
                      {showOnlineRooms ? (
                        <Button
                          onClick={handleBackToRooms}
                          sx={{
                            minWidth: 0,
                            margin: 0,
                            height: "60px",
                            transition: "border-color 0.3s",
                            border: "1px solid #D0D40B",
                            color: "#D0D40B",
                            padding: "15px",
                            "&:hover": {
                              background: "none",
                              boxShadow:
                                "0px 2px 7px 0px rgba(255, 213, 79, 0.7)",
                              transition: ".3s",
                            },
                          }}
                        >
                          Voltar
                        </Button>
                      ) : (
                        <Button
                          onClick={handleViewOnlineRooms}
                          sx={{
                            minWidth: 0,
                            margin: 0,
                            height: "60px",
                            transition: "border-color 0.3s",
                            border: "1px solid #D0D40B",
                            color: "#D0D40B",
                            padding: "15px",
                            "&:hover": {
                              background: "none",
                              boxShadow:
                                "0px 2px 7px 0px rgba(255, 213, 79, 0.7)",
                              transition: ".3s",
                            },
                          }}
                        >
                          Ver salas online
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Stack>
                <Stack>
                  {showOnlineRooms ? (
                    <OnlineRoom />
                  ) : (
                    <RoomTable
                      rooms={filteredRooms}
                      setRooms={setRooms}
                      onDeleteRoom={handleDeleteRoom}
                      onEditPermission={handleEditPermission}
                    />
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <RoomCRUD
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            sala={salaEditada}
            adicionarSala={(novaSala) => setRooms([...rooms, novaSala])}
            onUpdateRoom={(salaAtualizada) =>
              setRooms(
                rooms.map((sala) =>
                  sala.id === salaAtualizada.id ? salaAtualizada : sala
                )
              )
            }
            selectedRoomId={selectedRoomId}
          />
        </ThemeProvider>
      ) : (
        <TelaSalaUsuarios />
      )}
    </>
  );
};

export default HomePageAdminRooms;
