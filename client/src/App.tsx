import React, { useContext, useEffect, useMemo } from "react";
import SessionProvider, {
  SessionContext,
  SessionContextType,
} from "./Store/SessionStore";
import ButtonAppBar from "./components/ButtonAppBar";
import UsersView from "./components/UsersView";
import LoginOrSignup from "./components/LoginOrSignup";
import Client from "./gql-client/client";
import { Provider } from "urql";
import { dedentBlockStringLines } from "graphql/language/blockString";

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
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

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
