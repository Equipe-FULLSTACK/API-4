import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Paper,
  Button,
  Box,
} from "@mui/material";
import {

  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import NomeColumn from "./NameColumn";
import TamanhoColumn from "./presencial/TamanhoColumn";
import VagasColumn from "./presencial/VagasColumn";
import PermissaoColumn from "./PermissionColumn";
import SnackbarDelete from "../snackbar/SnackbarDelete";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import OnlineRoom from "./Online";
import DiretoriaColumn from "./TypeColumn";
import RoomCRUD from "./RoomCRUD";
import { Room } from "../../types/RoomTypes";

interface RoomTableProps {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>; // Função de atualização de salas
  onDeleteRoom?: (roomId: number) => void;
  onEditPermission?: (roomId: number) => void;
}

const RoomTable: React.FC<RoomTableProps> = ({
  rooms,
  setRooms,
  onDeleteRoom,
  onEditPermission,
}) => {
  const [sala, setSala] = useState<Room[]>([]);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoomForEdit, setSelectedRoomForEdit] = useState<Room | null>(
    null
  );

  const getColorByPermission = (permissionLevel: string) => {
    switch (permissionLevel) {
      case "1":
        return {
          color: "#4caf50",
          icon: <PersonIcon />,
          description: "Nível 1",
        };
      case "2":
        return {
          color: "#2196f3",
          icon: <SupervisedUserCircleIcon />,
          description: "Nível 2",
        };
      case "3":
        return { color: "#f44336", icon: <LockIcon />, description: "Nível 3" };
      default:
        return {
          color: "primary",
          icon: <PersonIcon />,
          description: "Nível 1",
        };
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/salapresencial"
        );
        setSala(response.data);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
        alert("Erro ao buscar salas. Por favor, tente novamente.");
      }
    };

    fetchRooms();
  }, []);

  const handleDeleteRoom = async (roomId: number) => {
    window.name = "SIATT";
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta sala?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/salapresencial/${roomId}`);
      const updatedRooms = rooms.filter((room) => room.id !== roomId);
      setRooms(updatedRooms);
      setSnackbarMessage("A sala foi removida!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao excluir sala:", error);
      alert("Erro ao excluir sala. Por favor, tente novamente.");
    }
  };

  const [isUpdating, setIsUpdating] = useState(false);
  const handleUpdateRoom = (roomId: number) => {
    console.log(roomId);
    const roomToUpdate = sala.find(
      (room) =>
        room.id_sala_presencial !== null && room.id_sala_presencial === roomId
    );
    if (roomToUpdate) {
      setSelectedRoomForEdit(roomToUpdate);
      setIsEditModalOpen(true);
      setIsUpdating(true);
    }
  };

  const handleUpdateRoomSuccess = (updatedRoom) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id_sala_presencial === updatedRoom.id_sala_presencial
          ? updatedRoom
          : room
      )
    );
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          overflowY: "auto",
          maxHeight: "75vh",
          "&::-webkit-scrollbar": { borderRadius: "10px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#242424",
            borderRadius: "20px",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button disabled></Button>
              </TableCell>

              <NomeColumn rooms={sala} setRooms={setRooms} />

              <TamanhoColumn rooms={rooms} setRooms={setRooms} />

              <VagasColumn rooms={rooms} setRooms={setRooms} />

              <DiretoriaColumn rooms={rooms} setRooms={setRooms} />

              <TableCell>
                <Button disabled>
                  <Typography variant="body1" color="initial">
                    Ações
                  </Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id_sala}>
                <TableCell
                 sx={{
                    borderLeft: `4px solid ${
                      room.permissao_sala ? getColorByPermission(room.permissao_sala).color : '#f44336'
                    }`,
                  }}  
                ></TableCell>

                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      variant="body1"
                      sx={{ color: getColorByPermission(room.tipo_sala).color }}
                    >
                      <Box
                        width={10}
                        height={10}
                        borderRadius="50%"
                       /*  sx={{
                          backgroundColor: room.permissao_sala
                            ? getColorByPermission(room.permissao_sala).color
                            : "#f44336",
                        }} */
                        display="inline-block"
                        mr={1}
                      />
                      {room.nome}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      backgroundColor: getColorByPermission(room.tipo_sala)
                        .color,
                      borderRadius: 2,
                      padding: "4px 16px",
                      display: "inline-flex",
                    }}
                  >
                    <ApartmentIcon />
                    <Typography variant="body2" sx={{ color: "primary" }}>
                      {room.tamanho}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      backgroundColor: getColorByPermission(room.tipo_sala)
                        .color,
                      borderRadius: 2,
                      padding: "4px 16px",
                      display: "inline-flex",
                    }}
                  >
                    {getColorByPermission(room.tipo_sala).icon}
                    <Typography variant="body2" sx={{ color: "primary" }}>
                      {room.vagas}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Stack
                    direction="row"
                    alignItems="center"
                    display="flex"
                    gap="10px"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      width="11vw"
                      bgcolor={
                        room.permissao_sala
                          ? getColorByPermission(room.permissao_sala).color
                          : "#f44336"
                      }
                      borderRadius={2}
                      padding={1}
                    >
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: "transparent",
                          marginRight: 1,
                        }}
                      >
                        {room.permissao_sala ? (
                          getColorByPermission(room.permissao_sala).icon
                        ) : (
                          <CancelIcon />
                        )}
                      </Avatar>
                      <Typography variant="body2" color="text.primary">
                        {room.permissao_sala
                          ? getColorByPermission(room.permissao_sala)
                              .description
                          : "Sem permissão"}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() =>
                          handleDeleteRoom(room.id_sala_presencial)
                        }
                        sx={{
                          "&:hover": {
                            color: "error.main",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    {onEditPermission && (
                      <Tooltip title="Edit Permission">
                        <IconButton
                          onClick={() =>
                            handleUpdateRoom(room.id_sala_presencial)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <RoomCRUD
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          sala={selectedRoomForEdit}
          onUpdateRoom={handleUpdateRoomSuccess}
          selectedRoomId={selectedRoomForEdit?.id_sala_presencial}
          isUpdating={isUpdating}
        />
      </TableContainer>
      {snackbarMessage && (
        <SnackbarDelete
          open={true}
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      )}
    </>
  );
};

export default RoomTable;
