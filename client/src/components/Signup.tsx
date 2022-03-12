import { Button, Container, Stack, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSignupMutation } from "../generated";
import { SessionContext, SessionContextType } from "../Store/SessionStore";

export default function Signup() {
  const { setIsLogged } = useContext(SessionContext) as SessionContextType;
  const [result, executeMutation] = useSignupMutation();
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    executeMutation({ name: fullName, email: email, password: password });
  };

  useEffect(() => {
    if (result?.data?.signup.token && !result.error) {
      localStorage.setItem("token", result?.data?.signup?.token as string);
      setIsLogged(true);
    }
  }, [result]);

  return (
    <Stack spacing={2}>
      <TextField
        id="fullname"
        label="Full Name"
        variant="filled"
        onChange={(e) => setFullname(e.target.value)}
      />
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
        Sign up
      </Button>
    </Stack>
  );
}
