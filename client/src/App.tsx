import React, { useContext, useMemo } from "react";
import SessionProvider, {
  SessionContext,
  SessionContextType,
} from "./Store/SessionStore";
import Navbar from "./components/Navbar";
import LoginOrSignup from "./components/LoginOrSignup";
import Client from "./gql-client/client";
import { Provider } from "urql";
import Todos from "./components/Todos";
import GlobalActionsProvider from "./Store/GlobalActionsStore";

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
      {isLogged ? <Todos /> : <LoginOrSignup />}
    </Provider>
  );
}

function App() {
  return (
    <GlobalActionsProvider>
      <SessionProvider>
        <>
          <Navbar />
          <Main />
        </>
      </SessionProvider>
    </GlobalActionsProvider>
  );
}

export default App;
