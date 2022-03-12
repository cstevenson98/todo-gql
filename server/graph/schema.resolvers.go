package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/cstevenson98/todo-gql/server/graph/auth"
	"github.com/cstevenson98/todo-gql/server/graph/generated"
	"github.com/cstevenson98/todo-gql/server/graph/model"
	"github.com/cstevenson98/todo-gql/server/pkg/token"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	userToAuth := auth.ForContext(ctx)
	newTodo, err := r.NewTodo(userToAuth.ID, input)
	if err != nil {
		return nil, err
	}

	return newTodo, nil
}

func (r *mutationResolver) CreateGroupTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) Login(ctx context.Context, email string, password string) (*model.AuthToken, error) {
	user, userErr := r.GetUserByEmailIfValid(email, password)
	if userErr != nil {
		return nil, userErr
	}

	token, err := token.GenerateToken(user.Name, user.ID)
	if err != nil {
		return &model.AuthToken{}, err
	}

	return &model.AuthToken{Token: token}, nil
}

func (r *mutationResolver) Signup(ctx context.Context, email string, password string, input model.NewUser) (*model.AuthToken, error) {
	newUser, err := r.NewUser(email, password, input)
	if err != nil {
		return &model.AuthToken{}, err
	}

	token, err := token.GenerateToken(newUser.Name, newUser.ID)
	if err != nil {
		return &model.AuthToken{}, err
	}

	return &model.AuthToken{Token: token}, nil
}

func (r *queryResolver) Mytodos(ctx context.Context) ([]*model.Todo, error) {
	userToAuth := auth.ForContext(ctx)
	if userToAuth == nil {
		return nil, fmt.Errorf("could not authenticate user")
	}
	return r.GetUserTodos(userToAuth.ID)
}

func (r *queryResolver) Account(ctx context.Context) (*model.AccountInfo, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
