import React, { useState } from "react";

export type GlobalActionsContextType = {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (islogged: boolean) => void;
};

export const GlobalActionsContext =
  React.createContext<GlobalActionsContextType | null>(null);

const GlobalActionsProvider = ({ children }: { children: JSX.Element }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  return (
    <GlobalActionsContext.Provider
      value={{
        isAddModalOpen: isAddModalOpen,
        setIsAddModalOpen: setIsAddModalOpen,
      }}
    >
      {children}
    </GlobalActionsContext.Provider>
  );
};

export default GlobalActionsProvider;
