import { useSubscription } from "urql";
import { SubTodosDocument, SubTodosSubscription } from "./generated";
import Button from "@mui/material/Button";

function App() {
  const [result] = useSubscription<SubTodosSubscription>({
    query: SubTodosDocument,
  });

  return (
    <div>
      <Button variant="contained" fullWidth={true}>
        Hello world
      </Button>
      {result.data?.todos.map((elem) => {
        return (
          <ul>
            <li>Title: {elem.title}</li>
            <li>Description: {elem.description}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default App;
