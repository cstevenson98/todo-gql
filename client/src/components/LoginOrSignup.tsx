import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const LoginOrSignup = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="flex justify-center">
      {tab === 0 ? <Login setTab={setTab} /> : <Signup setTab={setTab} />}
    </div>
  );
};

export default LoginOrSignup;
