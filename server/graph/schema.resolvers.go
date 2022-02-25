package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"github.com/google/uuid"
	"test/graph/generated"
	"test/graph/model"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	stmt := `INSERT INTO todos (id, title, description, done) VALUES($1, $2, $3, $4)`

	id := uuid.NewString()
	var todo model.Todo

	_, err := r.DB.Exec(stmt, id, input.Title, input.Description, false)
	if err != nil {
		return nil, err
	}
	todo.ID = id
	todo.Title = input.Title
	todo.Description = input.Description
	todo.Done = false
	return &todo, nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	qry := `SELECT id, title, description, done FROM todos`
	rows, err := r.DB.Query(qry)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var todos []*model.Todo
	for rows.Next() {
		todo := &model.Todo{}
		err = rows.Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Done)
		if err != nil {
			return nil, err
		}

		todos = append(todos, todo)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return todos, nil
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	qry := `SELECT id, name FROM users`
	rows, err := r.DB.Query(qry)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var users []*model.User
	for rows.Next() {
		user := &model.User{}
		err = rows.Scan(&user.ID, &user.Name)
		if err != nil {
			return nil, err
		}

		todoQry := `SELECT id, title, description, done FROM todos_users_view where user_id = '` + user.ID + `'`
		fmt.Println(todoQry)
		todoRows, rowsErr := r.DB.Query(todoQry)
		if rowsErr != nil {
			return nil, rowsErr
		}

		var todos []*model.Todo
		for todoRows.Next() {
			todo := &model.Todo{}
			rowsErr = todoRows.Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Done)
			todos = append(todos, todo)
		}
		user.Todos = todos
		users = append(users, user)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }