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

interface SignupProps {
  isLogin: Boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Signup({ isLogin, setLogin }: SignupProps) {
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
        <Button />
      </Stack>
    </Container>
  );
}
