import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Group = {
  __typename?: 'Group';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  todos: Array<Todo>;
  users: Array<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGroup: Group;
  createTodo: Todo;
  createUser: User;
  loginOrSignup: Token;
};


export type MutationCreateGroupArgs = {
  input: NewGroup;
};


export type MutationCreateTodoArgs = {
  input: NewTodo;
  userOrGroupID: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  input: NewUser;
  password: Scalars['String'];
};


export type MutationLoginOrSignupArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type NewGroup = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type NewTodo = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type NewUser = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  groupByID: Array<Group>;
  groups: Array<Group>;
  todos: Array<Todo>;
  todosByID: Array<Todo>;
  users: Array<User>;
  usersByID: Array<User>;
};


export type QueryGroupByIdArgs = {
  input: Array<Scalars['ID']>;
};


export type QueryTodosByIdArgs = {
  input: Array<Scalars['ID']>;
};


export type QueryUsersByIdArgs = {
  input: Array<Scalars['ID']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  groupID: Group;
  groups: Array<Group>;
  todoID: Todo;
  todos: Array<Todo>;
  userID: User;
  users: Array<User>;
};


export type SubscriptionGroupIdArgs = {
  id: Scalars['String'];
};


export type SubscriptionTodoIdArgs = {
  id: Scalars['String'];
};


export type SubscriptionUserIdArgs = {
  id: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  description: Scalars['String'];
  done: Scalars['Boolean'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  todos: Array<Todo>;
};

export type GetTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, title: string, description: string, done: boolean }> };

export type LoginOrSignupMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginOrSignupMutation = { __typename?: 'Mutation', loginOrSignup: { __typename?: 'Token', token: string } };

export type SubTodosSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubTodosSubscription = { __typename?: 'Subscription', todos: Array<{ __typename?: 'Todo', title: string, description: string }> };


export const GetTodosDocument = gql`
    query GetTodos {
  todos {
    id
    title
    description
    done
  }
}
    `;

export function useGetTodosQuery(options?: Omit<Urql.UseQueryArgs<GetTodosQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTodosQuery>({ query: GetTodosDocument, ...options });
};
export const LoginOrSignupDocument = gql`
    mutation loginOrSignup($username: String!, $password: String!) {
  loginOrSignup(username: $username, password: $password) {
    token
  }
}
    `;

export function useLoginOrSignupMutation() {
  return Urql.useMutation<LoginOrSignupMutation, LoginOrSignupMutationVariables>(LoginOrSignupDocument);
};
export const SubTodosDocument = gql`
    subscription SubTodos {
  todos {
    title
    description
  }
}
    `;

export function useSubTodosSubscription<TData = SubTodosSubscription>(options: Omit<Urql.UseSubscriptionArgs<SubTodosSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<SubTodosSubscription, TData>) {
  return Urql.useSubscription<SubTodosSubscription, TData, SubTodosSubscriptionVariables>({ query: SubTodosDocument, ...options }, handler);
};