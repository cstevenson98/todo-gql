import React, { useContext } from "react";
import SessionProvider, {
  SessionContext,
  SessionContextType,
} from "./Store/SessionStore";
import ButtonAppBar from "./components/ButtonAppBar";
import UsersView from "./components/UsersView";
import LoginOrSignup from "./components/LoginOrSignup";

function Main() {
  const { isLogged } = useContext(SessionContext) as SessionContextType;

  if (isLogged) {
    return <UsersView />;
  }

  return <LoginOrSignup />;
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
