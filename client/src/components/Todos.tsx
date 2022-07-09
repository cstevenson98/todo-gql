import { useDeleteTodoMutation, useMyTodosQuery } from "../generated";
import React, { useContext, useMemo, useState } from "react";
import AddTodo from "./AddTodo";
import {
  GlobalActionsContext,
  GlobalActionsContextType,
} from "../Store/GlobalActionsStore";

export default function Todos() {
  const context = useMemo(() => ({ additionalTypenames: ["Todo"] }), []);
  const [result] = useMyTodosQuery({ context });
  const [, deleteTodo] = useDeleteTodoMutation();

  const { isAddModalOpen } = useContext(
    GlobalActionsContext
  ) as GlobalActionsContextType;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        {isAddModalOpen && <AddTodo />}
        <div className="flex-col">
          {result.data?.mytodos.map((elem) => {
            return (
              <div className="card w-52 bg-primary shadow-lg text-primary-content m-3">
                <div className="card-body">
                  <h2 className="card-title">{elem.title}</h2>
                  <p>{elem.description}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-square btn-sm"
                      onClick={() => deleteTodo({ todoID: elem.id })}
                    >
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
      </div>
    </div>
  );
}
