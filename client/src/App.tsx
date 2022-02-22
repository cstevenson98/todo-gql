import {useQuery} from "urql";
import {GetTodosDocument, GetTodosQuery} from "./generated";

function App() {
  const [result] = useQuery<GetTodosQuery>({ query: GetTodosDocument })

  return (
    <>
      {result.data?.todos.map((elem) => {
        return (
            <ul>
              <li>Title: {elem.title}</li>
              <li>ID: {elem.id}</li>
            </ul>
        )
      })}
    </>
  )
}

export default App