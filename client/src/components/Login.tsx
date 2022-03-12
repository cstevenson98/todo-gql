import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { SessionContext, SessionContextType } from "../Store/SessionStore";

export default function Login() {
  const { setIsLogged } = useContext(SessionContext) as SessionContextType;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(email, password);
  }, [email, password]);

  return (
    <Container maxWidth="sm">
      <Stack spacing={2}>
        <TextField
          id="filled-basic"
          label="Email"
          variant="filled"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Password"
          type="password"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={() => {}}>
          Log in
        </Button>
      </Stack>
    </Container>
  );
}
