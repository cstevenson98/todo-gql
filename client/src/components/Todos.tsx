import { useMyTodosQuery } from "../generated";
import React, { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import AddTodo from "./AddTodo";

export default function Todos() {
  const [result] = useMyTodosQuery();

  const [toggleAddNewTodo, setToggleAddNewTodo] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="flex-col">
        {result.data?.mytodos.map((elem) => {
          return (
            <div className="card w-96 bg-primary text-primary-content m-3">
              <div className="card-body">
                <h2 className="card-title">{elem.title}</h2>
                <p>{elem.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ClickAwayListener onClickAway={() => setToggleAddNewTodo(false)}>
        {!toggleAddNewTodo ? (
          <button onClick={() => setToggleAddNewTodo(true)}>Add</button>
        ) : (
          <AddTodo />
        )}
      </ClickAwayListener>
    </div>
  );
}
