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

func (r *mutationResolver) CreateTodo(ctx context.Context, userOrGroupID string, input model.NewTodo) (*model.Todo, error) {
	newTodo, err := r.NewTodo(userOrGroupID, input)
	if err != nil {
		return nil, err
	}

	// Notify subscribers
	r.mu.Lock()
	todos, err := r.GetTodos(nil)
	for _, observer := range r.TodoObservers {
		observer <- todos
	}
	r.mu.Unlock()

	return newTodo, nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, email string, password string, input model.NewUser) (*model.User, error) {
	newUser, err := r.NewUser(email, password, input)
	if err != nil {
		return nil, err
	}

	// Notify subscribers
	r.mu.Lock()
	users, err := r.GetUsers(nil)
	for _, observer := range r.UserObservers {
		observer <- users
	}
	r.mu.Unlock()

	return newUser, nil
}

func (r *mutationResolver) CreateGroup(ctx context.Context, input model.NewGroup) (*model.Group, error) {
	newGroup, err := r.NewGroup(input)
	if err != nil {
		return nil, err
	}

	// Notify subscribers
	r.mu.Lock()
	group, err := r.GetGroups(nil)
	for _, observer := range r.GroupObservers {
		observer <- group
	}
	r.mu.Unlock()

	return newGroup, nil
}

func (r *mutationResolver) Login(ctx context.Context, email string, password string) (*model.Token, error) {
	return nil, nil
}

func (r *mutationResolver) Signup(ctx context.Context, email string, password string, input model.NewUser) (*model.Token, error) {
	return nil, nil
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

func (r *subscriptionResolver) Todos(ctx context.Context) (<-chan []*model.Todo, error) {
	id := uuid.NewString()
	todoChan := make(chan []*model.Todo, 1)

	// Clean-up goroutine
	go func() {
		<-ctx.Done()
		r.mu.Lock()
		delete(r.TodoObservers, id)
		r.mu.Unlock()
	}()

	r.mu.Lock()
	r.TodoObservers[id] = todoChan
	r.mu.Unlock()

	todos, err := r.GetTodos(nil)
	if err != nil {
		return nil, err
	}

	r.TodoObservers[id] <- todos
	return todoChan, nil
}

func (r *subscriptionResolver) TodoID(ctx context.Context, id string) (<-chan *model.Todo, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *subscriptionResolver) Users(ctx context.Context) (<-chan []*model.User, error) {
	id := uuid.NewString()
	userChan := make(chan []*model.User, 1)

	// Clean-up goroutine
	go func() {
		<-ctx.Done()
		r.mu.Lock()
		delete(r.UserObservers, id)
		r.mu.Unlock()
	}()

	r.mu.Lock()
	r.UserObservers[id] = userChan
	r.mu.Unlock()

	users, err := r.GetUsers(nil)
	if err != nil {
		return nil, err
	}

	r.UserObservers[id] <- users
	return userChan, nil
}

func (r *subscriptionResolver) UserID(ctx context.Context, id string) (<-chan *model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *subscriptionResolver) Groups(ctx context.Context) (<-chan []*model.Group, error) {
	id := uuid.NewString()
	groupChan := make(chan []*model.Group, 1)

	// Clean-up goroutine
	go func() {
		<-ctx.Done()
		r.mu.Lock()
		delete(r.GroupObservers, id)
		r.mu.Unlock()
	}()

	r.mu.Lock()
	r.GroupObservers[id] = groupChan
	r.mu.Unlock()

	groups, err := r.GetGroups(nil)
	if err != nil {
		return nil, err
	}

	r.GroupObservers[id] <- groups
	return groupChan, nil
}

func (r *subscriptionResolver) GroupID(ctx context.Context, id string) (<-chan *model.Group, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }