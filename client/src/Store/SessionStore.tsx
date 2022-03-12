import React, { useState } from "react";

export type SessionContextType = {
  isLogged: boolean;
  setIsLogged: (islogged: boolean) => void;
};

export const SessionContext = React.createContext<SessionContextType | null>(
  null
);

const SessionProvider = ({ children }: { children: JSX.Element }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <SessionContext.Provider
      value={{ isLogged: isLogged, setIsLogged: setIsLogged }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
