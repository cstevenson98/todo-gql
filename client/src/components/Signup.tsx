import React, { useContext, useEffect, useState } from "react";
import { useSignupMutation } from "../generated";
import { SessionContext, SessionContextType } from "../Store/SessionStore";
import { LoginTab } from "../consts/consts";

export default function Signup({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setIsLogged } = useContext(SessionContext) as SessionContextType;
  const [result, executeMutation] = useSignupMutation();

  // Form data
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    executeMutation({ name: fullName, email: email, password: password }).then(
      (result) => {
        if (result.data?.signup.token) {
          localStorage.setItem("token", result.data.signup.token);
          setIsLogged(true);
        }
      }
    );
  };

  useEffect(() => {
    if (result?.data?.signup.token && !result.error) {
      localStorage.setItem("token", result?.data?.signup?.token as string);
      setIsLogged(true);
    }
  }, [result]);

  return (
    <div className="hero pt-12">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-col">
          <div className="flex justify-center">
            <div className="text-3xl mb-11">✨ Cheeky sign up..? ✨</div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full name</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
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
                  Sign up
                </button>
              </div>
              <div className="flex items-center pt-4">
                <div className="text-xs mr-1">Already have an account?</div>
                <div
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
                  onClick={() => setTab(LoginTab)}
                >
                  Log in...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
