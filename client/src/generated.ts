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

export type AccountInfo = {
  __typename?: 'AccountInfo';
  email: Scalars['String'];
  name: Scalars['String'];
};

export type AuthToken = {
  __typename?: 'AuthToken';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGroupTodo: Todo;
  createTodo: Todo;
  login: AuthToken;
  signup: AuthToken;
};


export type MutationCreateGroupTodoArgs = {
  input: NewTodo;
};


export type MutationCreateTodoArgs = {
  input: NewTodo;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  input: NewUser;
  password: Scalars['String'];
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
  account: AccountInfo;
  mytodos: Array<Todo>;
};

export type Todo = {
  __typename?: 'Todo';
  description: Scalars['String'];
  done: Scalars['Boolean'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  todos: Array<Todo>;
};

export type GetTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodosQuery = { __typename?: 'Query', mytodos: Array<{ __typename?: 'Todo', id: string, title: string, description: string, done: boolean }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthToken', token: string } };

export type SignupMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthToken', token: string } };


export const GetTodosDocument = gql`
    query GetTodos {
  mytodos {
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
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const SignupDocument = gql`
    mutation signup($name: String!, $email: String!, $password: String!) {
  signup(email: $email, password: $password, input: {name: $name}) {
    token
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};