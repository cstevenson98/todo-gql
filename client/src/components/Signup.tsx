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

export default function Signup() {
  const { result, executeMutation } = useSignupMutation();

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(email, password);
  }, [email, password]);

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
        <Button>Sign up</Button>
      </Stack>
    </Container>
  );
}
