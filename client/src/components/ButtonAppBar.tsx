import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo lists
          </Typography>
          {isLogged && <Logout />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
