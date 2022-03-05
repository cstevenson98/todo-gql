import { useSubscription } from "urql";
import { SubTodosDocument, SubTodosSubscription } from "./generated";

function App() {
  const [result] = useSubscription<SubTodosSubscription>({
    query: SubTodosDocument,
  });

  return (
    <div>
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
