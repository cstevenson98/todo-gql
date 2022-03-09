import React, { useState } from "react";

interface UserToken {
  token: string;
}

export type UserContextType = {
  authToken: UserToken;
  setAuthToken: (userToken: UserToken) => void;
};

export const UserContext = React.createContext<UserContextType | null>(null);

interface Props {
  children: JSX.Element;
}

const UserProvider = ({ children }: Props) => {
  const [userToken, setUserToken] = useState<UserToken>({ token: "" });

  return (
    <UserContext.Provider
      value={{ authToken: userToken, setAuthToken: setUserToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
