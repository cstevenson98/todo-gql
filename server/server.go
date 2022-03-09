package main

import (
	"database/sql"
	"fmt"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/cstevenson98/todo-gql/server/graph"
	"github.com/cstevenson98/todo-gql/server/graph/auth"
	"github.com/cstevenson98/todo-gql/server/graph/generated"
	"github.com/cstevenson98/todo-gql/server/graph/model"
	"github.com/gorilla/websocket"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
	"time"
)

const defaultPort = "8080"
const (
	host     = "localhost"
	dbport   = 5432
	user     = "root"
	password = "root"
	dbname   = "todo_db"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Database connection logic
	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, dbport, user, password, dbname)

	db, err := sql.Open("postgres", psqlconn)
	if err != nil {
		fmt.Printf("Could not open DB: %v\n", err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Printf("Could not open DB: %v\n", err.Error())
	}
	log.Println("Connected to database successfully")

	/////

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:*"},
		AllowCredentials: true,
		Debug:            false,
	})

	srv := handler.New(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		DB:            db,
		TodoObservers: map[string]chan []*model.Todo{},
	}}))

	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	})

	srv.Use(extension.Introspection{})

	http.Handle("/", playground.Handler("GraphQL playground", "/graphql"))
	http.Handle("/graphql", c.Handler(auth.Middleware()(srv)))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}