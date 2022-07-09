import React, { useContext, useState } from "react";
import { useCreateTodoMutation } from "../generated";
import {
  GlobalActionsContext,
  GlobalActionsContextType,
} from "../Store/GlobalActionsStore";
import ClickAwayListener from "react-click-away-listener";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [, createTodo] = useCreateTodoMutation();

  const { setIsAddModalOpen } = useContext(
    GlobalActionsContext
  ) as GlobalActionsContextType;

  // Todo error handling with toastr
  const submit = () => {
    createTodo({ title: title, description: description });
    setIsAddModalOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsAddModalOpen(false)}>
      <div className="block">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="title"
                className="input input-bordered"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="description"
                placeholder="description"
                className="input input-bordered block"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={submit}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default AddTodo;
