import { useGetTodosQuery } from "../generated";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
import React from "react";

export default function TodoListTab() {
  const [result] = useGetTodosQuery();

  return (
    <Stack spacing={2}>
      {result.data?.mytodos.map((elem, index) => {
        return (
          <Card key={index}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                {elem.title}
              </Typography>
              <Typography variant="h6">{elem.description}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}
