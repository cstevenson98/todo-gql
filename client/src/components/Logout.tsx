import { Button } from "@mui/material";
import { useContext } from "react";
import { SessionContext, SessionContextType } from "../Store/SessionStore";

const Logout = () => {
  const { setIsLogged } = useContext(SessionContext) as SessionContextType;

  const handle = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  return (
    <Button variant="contained" onClick={handle}>
      Log out
    </Button>
  );
};

export default Logout;
