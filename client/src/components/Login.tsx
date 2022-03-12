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
import { useLoginMutation, useSignupMutation } from "../generated";

export default function Login() {
  const { setIsLogged } = useContext(SessionContext) as SessionContextType;
  const [result, executeMutation] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    executeMutation({ email: email, password: password });
  };

  useEffect(() => {
    if (result?.data?.login.token && !result.error) {
      localStorage.setItem("token", result?.data?.login?.token as string);
      setIsLogged(true);
    }
  }, [result]);

  return (
    <Stack spacing={2}>
      <TextField
        id="email"
        label="Email"
        variant="filled"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="filled"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={submit}>
        Log in
      </Button>
    </Stack>
  );
}
