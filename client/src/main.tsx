import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";

import { Provider } from "urql";
import Client from "./gql-client/client";

ReactDOM.render(
  <Provider value={Client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
