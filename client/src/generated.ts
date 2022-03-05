import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Group = {
  __typename?: "Group";
  description: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  todos: Array<Todo>;
  users: Array<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  createGroup: Group;
  createTodo: Todo;
  createUser: User;
};

export type MutationCreateGroupArgs = {
  input: NewGroup;
};

export type MutationCreateTodoArgs = {
  input: NewTodo;
  userOrGroupID: Scalars["ID"];
};

export type MutationCreateUserArgs = {
  input: NewUser;
};

export type NewGroup = {
  description: Scalars["String"];
  name: Scalars["String"];
};

export type NewTodo = {
  description: Scalars["String"];
  title: Scalars["String"];
};

export type NewUser = {
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  groupByID: Array<Group>;
  groups: Array<Group>;
  todos: Array<Todo>;
  todosByID: Array<Todo>;
  users: Array<User>;
  usersByID: Array<User>;
};

export type QueryGroupByIdArgs = {
  input: Array<Scalars["ID"]>;
};

export type QueryTodosByIdArgs = {
  input: Array<Scalars["ID"]>;
};

export type QueryUsersByIdArgs = {
  input: Array<Scalars["ID"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  groupID: Group;
  groups: Array<Group>;
  todoID: Todo;
  todos: Array<Todo>;
  userID: User;
  users: Array<User>;
};

export type SubscriptionGroupIdArgs = {
  id: Scalars["String"];
};

export type SubscriptionTodoIdArgs = {
  id: Scalars["String"];
};

export type SubscriptionUserIdArgs = {
  id: Scalars["String"];
};

export type Todo = {
  __typename?: "Todo";
  description: Scalars["String"];
  done: Scalars["Boolean"];
  id: Scalars["ID"];
  title: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  todos: Array<Todo>;
};

export type GetTodosQueryVariables = Exact<{ [key: string]: never }>;

export type GetTodosQuery = {
  __typename?: "Query";
  todos: Array<{
    __typename?: "Todo";
    id: string;
    title: string;
    description: string;
    done: boolean;
  }>;
};

export type SubTodosSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubTodosSubscription = {
  __typename?: "Subscription";
  todos: Array<{ __typename?: "Todo"; title: string; description: string }>;
};

export const GetTodosDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTodos" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "todos" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "done" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTodosQuery, GetTodosQueryVariables>;
export const SubTodosDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "SubTodos" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "todos" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubTodosSubscription,
  SubTodosSubscriptionVariables
>;
