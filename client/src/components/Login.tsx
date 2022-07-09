import React, { useContext, useEffect, useState } from "react";
import { SessionContext, SessionContextType } from "../Store/SessionStore";
import { useLoginMutation } from "../generated";
import { SignUpTab } from "../consts/consts";

export default function Login({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setIsLogged } = useContext(SessionContext) as SessionContextType;
  const [result, login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    login({ email: email, password: password });
  };

  useEffect(() => {
    if (result?.data?.login.token && !result.error) {
      localStorage.setItem("token", result?.data?.login?.token as string);
      setIsLogged(true);
    }
  }, [result]);

  return (
    <div className="hero pt-12">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-col">
          <div className="flex justify-center">
            <div className="text-3xl mb-11">Log in, if you please</div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered block"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={submit}>
                  Log in
                </button>
              </div>
              <div className="flex items-center pt-4">
                <div className="text-xs mr-1">Don't have an account?</div>
                <div
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
                  onClick={() => setTab(SignUpTab)}
                >
                  Sign up...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
