import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from "urql";
import { authExchange } from "@urql/exchange-auth";
import { makeOperation } from "@urql/core";

export interface authTokenType {
  token: string;
}

const Client = () =>
  createClient({
    url: "http://localhost:8080/graphql",
    exchanges: [
      dedupExchange,
      cacheExchange,
      authExchange<authTokenType>({
        addAuthToOperation: ({ authState, operation }) => {
          // the token isn't in the auth state, return the operation without changes
          if (!authState || !authState.token) {
            return operation;
          }

          // fetchOptions can be a function (See Client API) but you can simplify this based on usage
          const fetchOptions =
            typeof operation.context.fetchOptions === "function"
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};

          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                Authorization: authState.token,
              },
            },
          });
        },
        willAuthError: ({ authState }) => {
          if (!authState) return true;
          // e.g. check for expiration, existence of auth etc
          return false;
        },
        didAuthError: ({ error }) => {
          // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === "FORBIDDEN"
          );
        },
        getAuth: async ({ authState }) => {
          console.log("Getting auth from session");
          // for initial launch, fetch the auth state from storage (local storage, async storage etc)
          if (!authState) {
            console.log("State is empty, loading from storage");
            const token = localStorage.getItem("token");
            console.log("Found token: ", token);
            if (token) {
              return { token };
            }
            return null;
          }

          return null;
        },
      }),
      fetchExchange,
    ],
  });

export default Client;
