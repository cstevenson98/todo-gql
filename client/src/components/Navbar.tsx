import React, { useContext } from "react";
import { SessionContext, SessionContextType } from "../Store/SessionStore";
import { authTokenName } from "../consts/consts";
import {
  GlobalActionsContext,
  GlobalActionsContextType,
} from "../Store/GlobalActionsStore";

export default function Navbar() {
  const { isLogged, setIsLogged } = useContext(
    SessionContext
  ) as SessionContextType;

  const handleLogout = () => {
    localStorage.removeItem(authTokenName);
    setIsLogged(false);
  };

  const { isAddModalOpen, setIsAddModalOpen } = useContext(
    GlobalActionsContext
  ) as GlobalActionsContextType;

  console.log("isAddModalOpen", isAddModalOpen);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {isLogged && (
          <div className="dropdown">
            <label
              // @ts-ignore
              for="my-modal"
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              onClick={() => setIsAddModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </label>
          </div>
        )}
      </div>
      <div className="navbar-center">
        <a className="normal-case text-xl">React Todo App</a>
      </div>
      <div className="navbar-end">
        {isLogged && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => handleLogout()}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
