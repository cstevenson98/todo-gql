Fullstack Todo App (ReactTS/Go/GraphQL)
===
<p float="left">
  <img src="https://user-images.githubusercontent.com/11011155/178117836-01535aa2-99f0-4460-a020-818efe9ea2a6.png" alt="drawing" width="43"/>
  <img src="https://user-images.githubusercontent.com/11011155/178117691-ef0a41e9-2b01-4135-a35d-460f56ed8ba1.png" alt="drawing" width="30"/>
  <img src="https://user-images.githubusercontent.com/11011155/178117696-036d0499-110f-4707-a357-b0b58f1444fb.png" alt="drawing" width="30"/>
  <img src="https://user-images.githubusercontent.com/11011155/178117874-9636e045-14ec-4cc9-b49d-64c906e36e6d.png" alt="drawing" width="30"/>
  <img src="https://user-images.githubusercontent.com/11011155/178118253-719c8246-9f06-4836-ac48-3ddbfeb93349.png" alt="drawing" width="30"/>
</p>

A todo app I wrote which has as its stack a Go-based GraphQL server and a React frontend. The central interesting aspect is that all types, in both the backend and frontend code, are generated from the GraphQL schema, and so this gives nice type safety across the project.

To build locally
--

This requires docker and `docker-compose` to be installed.

  - `HOST_ADDRESS=<your_ip_address> docker-compose up -d`
   
And then open `http://localhost:3000/` in your browser to view.
