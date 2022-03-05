import { useSubscription } from "urql";
import {
  SubTodosDocument,
  SubTodosSubscription,
  useSubTodosSubscription,
} from "../generated";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
import React from "react";

interface UserID {
  id: String;
}

export default function TodoListTab({ id }: UserID) {
  const [result] = useSubTodosSubscription();

  return (
    <Stack spacing={2}>
      {result.data?.todos.map((elem, index) => {
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
