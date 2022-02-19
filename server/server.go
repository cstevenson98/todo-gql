package main

import (
	"database/sql"
	"fmt"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/lib/pq"
	"log"
	"net/http"
	"os"
	"test/graph"
	"test/graph/generated"
)

const defaultPort = "8080"
const (
	host     = "localhost"
	dbport     = 5432
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

	// GraphQL logic
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{DB: db}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
