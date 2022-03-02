package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"test/graph/generated"
	"test/graph/model"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	return r.NewTodo(input)
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	return r.NewUser(input)
}

func (r *mutationResolver) CreateGroup(ctx context.Context, input model.NewGroup) (*model.Group, error) {
	return r.NewGroup(input)
}

func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	return r.GetTodos(nil)
}

func (r *queryResolver) TodosByID(ctx context.Context, input []string) ([]*model.Todo, error) {
	return r.GetTodos(input)
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	return r.GetUsers(nil)
}

func (r *queryResolver) UsersByID(ctx context.Context, input []string) ([]*model.User, error) {
	return r.GetUsers(input)
}

func (r *queryResolver) Groups(ctx context.Context) ([]*model.Group, error) {
	return r.GetGroups(nil)
}

func (r *queryResolver) GroupByID(ctx context.Context, input []string) ([]*model.Group, error) {
	return r.GetGroups(input)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }