import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { SessionContext, SessionContextType } from "../Store/SessionStore";
import Logout from "./Logout";

export default function ButtonAppBar() {
  const { isLogged, setIsLogged } = useContext(
    SessionContext
  ) as SessionContextType;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo lists
          </Typography>
          {isLogged && <Logout />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
