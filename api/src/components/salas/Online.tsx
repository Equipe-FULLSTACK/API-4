import React, { useEffect, useState } from "react";
import axios from "axios";
import NomeColumn from "./NameColumn";
import LinkColumn from "./presencial/LinkColumn";
import { Room } from "../../types/RoomTypes";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
  TableBody,
  Stack,
  Box,
  Link,
} from "@mui/material";
import {
  Person as PersonIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
  Lock as LockIcon,
} from "@mui/icons-material";

interface RoomTableProps {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  onDeleteRoom?: (roomId: number) => void;
  onEditPermission?: (roomId: number) => void;
}

const OnlineRoom: React.FC<RoomTableProps> = ({
  setRooms,
}) => {
  const [sala, setSala] = useState<Room[]>([]);

  useEffect(() => {
    const fetchOnlineRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/salaonline");
        console.log("Salas Online:", response.data); // Log dos dados recebidos
        setSala(response.data);
      } catch (error) {
        console.error("Error fetching online rooms:", error);
      }
    };

    fetchOnlineRooms();
  }, []);

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
              <LinkColumn rooms={sala} setRooms={setRooms} />
            </TableRow>
          </TableHead>

          <TableBody>
            {sala.map((room) => (
              <TableRow key={room.id}>
                <TableCell
                  sx={{
                    borderLeft: "4px solid #d0d40b",
                  }}
                ></TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body1">
                      <Box
                        width={10}
                        height={10}
                        borderRadius="50%"
                        display="inline-block"
                        mr={1}
                      />
                      {room.nome}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body1">
                      <Box
                        width={10}
                        height={10}
                        borderRadius="50%"
                        display="inline-block"
                        mr={1}
                      />
                      <Link href={room.link}>{room.link}</Link>
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OnlineRoom;
