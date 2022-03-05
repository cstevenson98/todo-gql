import React, { useState } from "react";
import ButtonAppBar from "./components/ButtonAppBar";
import UsersView from "./components/UsersView";
import Login from "./components/Login";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <ButtonAppBar />
      {isLogin ? (
        <Login isLogin={isLogin} setLogin={setIsLogin} />
      ) : (
        <UsersView />
      )}
    </>
  );
}

export default App;
