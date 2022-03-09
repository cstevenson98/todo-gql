import React, { useContext, useEffect, useState } from "react";
import ButtonAppBar from "./components/ButtonAppBar";
// import UsersView from "./components/UsersView";
// import Login from "./components/Login";
import UserProvider, { UserContextType, UserContext } from "./Store/UserStore";
import { Container, Typography } from "@mui/material";

function Main() {
  const { authToken, setAuthToken } = useContext(
    UserContext
  ) as UserContextType;

  useEffect(() => {
    setAuthToken({ token: "Helllllo" });
  }, []);

  return (
    <Container>
      <Typography>{authToken.token}</Typography>
    </Container>
  );
}

function App() {
  // const [hasLogged, setHasLogged] = useState(false);

  return (
    <UserProvider>
      <>
        <ButtonAppBar />
        <Main />
      </>
    </UserProvider>
  );
}

export default App;
