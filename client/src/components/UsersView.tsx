import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import TodoListTab from "./TodoListTab";
import { useCreateTodoMutation } from "../generated";

export default function UsersView() {
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [result, executeMutation] = useCreateTodoMutation();

  const submit = () => {
    executeMutation({ title: title, description: description });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Personal" />
        </Tabs>
      </Box>
      <Box sx={{ marginTop: 5 }}>
        <TodoListTab />
      </Box>
      <Stack spacing={2}>
        <TextField
          id="title"
          label="Title"
          variant="filled"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          type="description"
          variant="filled"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" onClick={submit}>
          Log in
        </Button>
      </Stack>
    </Container>
  );
}
