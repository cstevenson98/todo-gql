import React, { useState } from "react";
import { useCreateTodoMutation } from "../generated";
import { SignUpTab } from "../consts/consts";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [, executeMutation] = useCreateTodoMutation();

  const submit = () => {
    executeMutation({ title: title, description: description });
  };

  return (
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
  );
};

export default AddTodo;
