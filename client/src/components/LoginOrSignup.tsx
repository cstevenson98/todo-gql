import React from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import Signup from "./Signup";
import Login from "./Login";
import TabPanel from "./TabPanel";

const LoginOrSignup = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Log in" />
          <Tab label="Register" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup />
      </TabPanel>
    </Container>
  );
};

export default LoginOrSignup;
