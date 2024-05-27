import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, Stack, Divider, Box } from "@mui/material";
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

const TelaSalaUsuarios = () => {
    function handleSearch(text: string): void {
        throw new Error("Function not implemented.");
    }

  return (
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
              <SearchButton onSearch={handleSearch} />
              <PrintButton />
              <ProfileActions />
            </Stack>
            <Stack marginTop={3}>
              <Stack
                flexDirection={"row"}
                justifyContent={"end"}
                marginRight={3}
              >
                <Stack width={"20rem"}>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
    </Stack>
  </ThemeProvider>
  )
}

export default TelaSalaUsuarios
