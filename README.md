React-Go Fullstack Todo List
===

Live [demo](http://178.62.77.236:3000/).

This is a project where the goal was to have much of the code generated for full type safety. I used in the backend `gqlgen` to generate the Go server's resolvers. This hooks into the postgres database. 

The frontend is TypeScript-React and uses codegen to generate the hooks for querying the graphQL API. I used the MaterialUI to minimise styling overhead.

In the app, users can sign up with email and password, and add todos to their personal list. Authentication is handled using JWTs, and this token is used to fetch the correct todos. 

To build locally
--

This requires docker and `docker-compose` to be installed.

  - `HOST_ADDRESS=<your_ip_address> docker-compose up -d`
   
Screenshots
--
