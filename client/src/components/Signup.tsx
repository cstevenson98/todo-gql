import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import { useSignupMutation } from "../generated";
import { authTokenType } from "../main";

export default function Signup() {
  const [result, executeMutation] = useSignupMutation();

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    executeMutation({ name: fullName, email: email, password: password });
  };

  useEffect(() => {
    console.log(result?.data?.signup.token, result.error);
    if (result?.data?.signup.token) {
      localStorage.setItem("token", result?.data?.signup?.token as string);
    }
  }, [result]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ margin: 5 }}>
        <Typography variant="h4" align="center">
          Please login
        </Typography>
      </Box>
      <Stack spacing={2}>
        <TextField
          id="filled-basic"
          label="Full Name"
          variant="filled"
          onChange={(e) => setFullname(e.target.value)}
        />
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
        <Button onClick={submit}>Sign up</Button>
      </Stack>
    </Container>
  );
}
