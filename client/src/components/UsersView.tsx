import React, { useState } from "react";
import {
  Button,
  Box,
  ClickAwayListener,
  Container,
  Tab,
  Tabs,
} from "@mui/material";
import TodoListTab from "./TodoListTab";
import TodoAdd from "./TodoAdd";

export default function UsersView() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [toggleAddNewTodo, setToggleAddNewTodo] = useState(false);

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

      {/* New todo add */}
      <ClickAwayListener onClickAway={() => setToggleAddNewTodo(false)}>
        <Container sx={{ margin: 3 }}>
          {!toggleAddNewTodo ? (
            <Button onClick={() => setToggleAddNewTodo(true)}>Add</Button>
          ) : (
            <TodoAdd />
          )}
        </Container>
      </ClickAwayListener>
    </Container>
  );
}
