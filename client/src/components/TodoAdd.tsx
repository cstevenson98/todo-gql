import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCreateTodoMutation } from "../generated";

const TodoAdd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [, executeMutation] = useCreateTodoMutation();

  const submit = () => {
    executeMutation({ title: title, description: description });
  };

  return (
    <Box sx={{ margin: 5 }}>
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
          Create
        </Button>
      </Stack>
    </Box>
  );
};

export default TodoAdd;
