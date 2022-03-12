import React, { useContext, useMemo } from "react";
import SessionProvider, {
  SessionContext,
  SessionContextType,
} from "./Store/SessionStore";
import ButtonAppBar from "./components/ButtonAppBar";
import UsersView from "./components/UsersView";
import LoginOrSignup from "./components/LoginOrSignup";
import Client from "./gql-client/client";
import { Provider } from "urql";

function Main() {
  const { isLogged } = useContext(SessionContext) as SessionContextType;

  const client = useMemo(() => {
    if (isLogged === null) {
      return null;
    }

    return Client();
  }, [isLogged]);

  if (!client) {
    return null;
  }

  return (
    <Provider value={client}>
      {isLogged ? <UsersView /> : <LoginOrSignup />}
    </Provider>
  );
}

function App() {
  return (
    <SessionProvider>
      <>
        <ButtonAppBar />
        <Main />
      </>
    </SessionProvider>
  );
}

export default App;
