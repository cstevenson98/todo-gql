import { Box, Container, Tab, Tabs } from "@mui/material";
import TodoListTab from "./TodoListTab";
import React from "react";

export default function UsersView() {
  const [value, setValue] = React.useState(0);

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
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      <Box sx={{ marginTop: 5 }}>
        <TodoListTab id={"Hello"} />
      </Box>
    </Container>
  );
}
