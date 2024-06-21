// HomePageAdminUser.tsx
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, Stack, Divider } from "@mui/material";
import SearchButton from "../../components/botoes/btnSearch";
import PrintButton from "../../components/botoes/btnPrint";
import ProfileActions from "../../components/perfil/profileActions";
import NavBar from "../../components/navBar/navBar";
import PermissionFilter from "../../components/user/PermissionFilter";
import { User } from "../../types/userTypes";
import axios from "axios";
import BtnNewUser from "../../components/botoes/btnNewUser";
import UserCRUD from "../../components/modal/UserCRUD";
import BtnSIATT from "../../components/botoes/btnSIATTLogo";
import CustomizedSnackbars from "../../components/snackbar/Snackbar";
import DeleteFeedback from "../../components/snackbar/SnackbarDelete";
import UserPage from "../../components/user/UserPage";

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

const HomePageAdminUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersStart, setUsersStart] = useState<User[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState("todos");
  const [openUserCRUD, setOpenUserCRUD] = useState(false);
  const [editingUser, setEditingUser] = useState<User>();
  const [render, setRender] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [deleteSnackbar, setDeleteSnackbar] = React.useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${API_URL}/us`);
        setUsers(response.data);
        setUsersStart(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [render]);

  const handleSearch = async (text: string) => {
    console.log(`Texto pesquisado: ${text}`);
    try {
      if (text.trim() === "") {
        const response = await axios.get<User[]>(`${API_URL}/us`);
        setUsers(response.data);
      } else {
        const filteredUsers = users.filter(
          (user) =>
            user.nome_usuario.toLowerCase().includes(text.toLowerCase()) ||
            user.email_usuario.toLowerCase().includes(text.toLowerCase()) ||
            user.permissao_usuario.toLowerCase().includes(text.toLowerCase())
        );
        setUsers(filteredUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleTipoChange = (novoTipo: string) => {
    console.log(`Tipo selecionado: ${novoTipo}`);
    setTipoSelecionado(novoTipo);
    if (novoTipo === "todos") {
      axios
        .get<User[]>(`${API_URL}/us`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    } else {
      const filtered = usersStart.filter(
        (user) => user.permissao_usuario === novoTipo
      );
      setUsers(filtered);
    }
  };

  const handleEditDeleteUser = (user: User) => {
    console.log(user);
    setEditingUser(user);
    if (editingUser) {
      setOpenUserCRUD(true);
    }
  };

  const handleAddUser = () => {
    setOpenUserCRUD(true);
  };

  const handleCloseUserCRUD = () => {
    setOpenUserCRUD(false);
    setEditingUser(undefined);
    setRender((prevState) => !prevState);
  };

  const handleSaveUser = (userData: User) => {
    console.log("Adicionando ou atualizando usuário:", userData);
    handleCloseUserCRUD();
    setRender((prevState) => !prevState);
    setSnackbarMessage("Usuário adicionado com sucesso!");
  };

  const handleRemoveUser = (userId: number) => {
    setDeleteSnackbar("Usuário removido!");
    console.log("Removendo usuário:", userId);
    handleCloseUserCRUD();
    setRender((prevState) => !prevState);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Stack flexDirection="row" sx={{ width: "100%" }}>
          <Stack height="100vh" flexDirection="row" marginRight={1}>
            <NavBar />
            <Divider orientation="vertical" />
          </Stack>

          <Stack width="100%">
            <Stack
              flexDirection="row"
              height={40}
              padding={1}
              margin="1rem 3rem 1rem 0rem"
              justifyContent="space-between"
              width="auto"
            >
              <BtnSIATT disable={false} />
              <SearchButton onSearch={handleSearch} />
              <PrintButton />
              <ProfileActions />
            </Stack>

            <Divider />

            <Stack marginTop={3}>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                marginRight={3}
                alignItems={"center"}
              >
                <BtnNewUser onClick={handleAddUser} />
                <Stack width={"20rem"}>
                  <PermissionFilter
                    permissionSelected={tipoSelecionado}
                    onPermissionChange={handleTipoChange}
                  />
                </Stack>
              </Stack>

              <Stack>
                <UserPage
                  users={users}
                  setUsers={setUsers}
                  onDeleteUser={handleEditDeleteUser}
                  onEditPermission={handleEditDeleteUser}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* Modal para adicionar ou editar usuários */}
        <UserCRUD
          open={openUserCRUD}
          onClose={handleCloseUserCRUD}
          user={editingUser}
          onSave={handleSaveUser}
          onRemove={handleRemoveUser}
          onUpdateUser={handleSaveUser}
          onRemoveUser={handleRemoveUser}
          onAddUser={handleAddUser}
        />
      </ThemeProvider>
      {snackbarMessage && (
        <CustomizedSnackbars
          open={true}
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      )}
      {deleteSnackbar && (
        <DeleteFeedback
          open={true}
          message={deleteSnackbar}
          onClose={() => setDeleteSnackbar("")}
        />
      )}
    </>
  );
};

export default HomePageAdminUser;
