import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";

import {
  createClient,
  Provider,
  defaultExchanges,
  subscriptionExchange,
} from "urql";
import { createClient as createWSClient } from "graphql-ws";

const wsClient = createWSClient({
  url: "ws://localhost:8080/graphql",
});

const client = createClient({
  url: "/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => ({
          unsubscribe: wsClient.subscribe(operation, sink),
        }),
      }),
    }),
  ],
});

ReactDOM.render(
  <Provider value={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
