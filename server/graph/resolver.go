package graph

import (
	"database/sql"
	"fmt"
	"github.com/cstevenson98/todo-gql/server/graph/model"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"sync"
)

type Resolver struct {
	DB *sql.DB

	TodoObservers  map[string]chan []*model.Todo
	UserObservers  map[string]chan []*model.User
	GroupObservers map[string]chan []*model.Group

	UserAuthTokens map[string]string

	mu sync.Mutex
}

func (r *Resolver) UserLogIn(email, password string) (*model.User, error) {
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(password), hashSize)
	if err != nil {
		return nil, err
	}

	fmt.Println(string(hashedPass))

	query := `SELECT id, password FROM users WHERE users.email = ` + email
	rows, err := r.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var userID string
		var storedHash string
		err = rows.Scan(&userID, &storedHash)
		if err != nil {
			return nil, err
		}

		fmt.Println(storedHash)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return nil, nil
}

func (r *Resolver) UserSignUp(email, password string) (*model.User, error) {
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(password), hashSize)
	if err != nil {
		return nil, err
	}

	fmt.Println(string(hashedPass))

	stmt := `INSERT INTO users (id, name, email, password) VALUES($1, $2, $3, $4)`
	fmt.Println(stmt)
	return nil, nil
}

// NewTodo creates a new TODO
func (r *Resolver) NewTodo(userOrGroupID string, input model.NewTodo) (*model.Todo, error) {
	// Determine whether the ID corresponds to a user or group
	user, err := r.GetUsers([]string{userOrGroupID})
	if err != nil {
		return nil, err
	}

	group, err := r.GetGroups([]string{userOrGroupID})
	if err != nil {
		return nil, err
	}

	var joinTableStmt string
	if len(user) != 0 {
		joinTableStmt = `INSERT INTO users_todos (todo_id, user_id) VALUES($1, $2)`
	} else if len(group) != 0 {
		joinTableStmt = `INSERT INTO groups_todos (todo_id, group_id) VALUES($1, $2)`
	} else {
		return nil, fmt.Errorf("no group or user with ID: %q", userOrGroupID)
	}

	tx, err := r.DB.Begin()
	if err != nil {
		return nil, err
	}

	todoId := uuid.NewString()
	var todo model.Todo

	todoStmt := `INSERT INTO todos (id, title, description, done) VALUES($1, $2, $3, $4)`
	_, err = tx.Exec(todoStmt, todoId, input.Title, input.Description, false)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	_, err = tx.Exec(joinTableStmt, todoId, userOrGroupID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	err = tx.Commit()
	if err != nil {
		return nil, fmt.Errorf("database commit error %q", err.Error())
	}
	todo.ID = todoId
	todo.Title = input.Title
	todo.Description = input.Description
	todo.Done = false
	return &todo, nil
}

// NewUser creates a new USER
func (r *Resolver) NewUser(email, password string, input model.NewUser) (*model.User, error) {
	stmt := `INSERT INTO users (id, name, email, password) VALUES($1, $2, $3, $4)`

	id := uuid.NewString()
	var user model.User

	hash, err := bcrypt.GenerateFromPassword([]byte(password), hashSize)
	_, err = r.DB.Exec(stmt, id, input.Name, email, hash)
	if err != nil {
		return nil, err
	}
	user.ID = id
	user.Name = input.Name

	return &user, nil
}

// NewGroup creates a new GROUP
func (r *Resolver) NewGroup(input model.NewGroup) (*model.Group, error) {
	stmt := `INSERT INTO groups (id, name, description) VALUES($1, $2, $3)`

	id := uuid.NewString()
	var group model.Group

	_, err := r.DB.Exec(stmt, id, input.Name, input.Description)
	if err != nil {
		return nil, err
	}
	group.ID = id
	group.Name = input.Name
	group.Description = input.Description

	return &group, nil
}

// GetTodos returns all or subset of TODOS
func (r *Resolver) GetTodos(IDs []string) ([]*model.Todo, error) {
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

		// Only add if in IDs, unless empty in which case always add
		var idInList = false
		for _, id := range IDs {
			if id == todo.ID {
				idInList = true
				break
			}
		}
		if len(IDs) == 0 || idInList {
			todos = append(todos, todo)
		}
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return todos, nil
}

// GetUserTodos get todos corresponding to USER
func (r *Resolver) GetUserTodos(userID string) ([]*model.Todo, error) {
	todoQry := `SELECT id, title, description, done FROM todos_users_view where user_id = '` + userID + `'`
	todoRows, err := r.DB.Query(todoQry)
	if err != nil {
		return nil, err
	}

	var todos []*model.Todo
	for todoRows.Next() {
		todo := &model.Todo{}
		err = todoRows.Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Done)
		todos = append(todos, todo)
	}

	if err = todoRows.Err(); err != nil {
		return nil, err
	}
	return todos, nil
}

// GetUsers returns all or subset of USERS
func (r *Resolver) GetUsers(IDs []string) ([]*model.User, error) {
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

		var idInList = false
		for _, id := range IDs {
			if id == user.ID {
				idInList = true
				break
			}
		}

		if len(IDs) == 0 || idInList {
			user.Todos, err = r.GetUserTodos(user.ID)
			if err != nil {
				return nil, err
			}

			users = append(users, user)
		}
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func (r *Resolver) GetGroupTodos(groupID string) ([]*model.Todo, error) {
	todoQry := `SELECT id, title, description, done FROM todos_groups_view WHERE group_id = '` + groupID + `'`
	todoRows, err := r.DB.Query(todoQry)
	if err != nil {
		return nil, err
	}

	var todos []*model.Todo
	for todoRows.Next() {
		todo := &model.Todo{}
		err = todoRows.Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Done)
		todos = append(todos, todo)
	}

	if err = todoRows.Err(); err != nil {
		return nil, err
	}
	return todos, nil
}

func (r *Resolver) GetGroupUsers(groupID string) ([]*model.User, error) {
	userQry := `SELECT id, name, done FROM users_groups_view where group_id = '` + groupID + `'`
	userRows, err := r.DB.Query(userQry)
	if err != nil {
		return nil, err
	}

	var users []*model.User
	for userRows.Next() {
		user := &model.User{}
		err = userRows.Scan(&user.ID, &user.Name)
		users = append(users, user)
	}

	if err = userRows.Err(); err != nil {
		return nil, err
	}
	return users, nil
}

// GetUsers returns all or subset of USERS
func (r *Resolver) GetGroups(IDs []string) ([]*model.Group, error) {
	qry := `SELECT id, name, description FROM groups`
	rows, err := r.DB.Query(qry)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var groups []*model.Group
	for rows.Next() {
		group := &model.Group{}
		err = rows.Scan(&group.ID, &group.Name, &group.Description)
		if err != nil {
			return nil, err
		}

		var idInList = false
		for _, id := range IDs {
			if id == group.ID {
				idInList = true
				break
			}
		}

		if len(IDs) == 0 || idInList {
			group.Todos, err = r.GetGroupTodos(group.ID)
			if err != nil {
				return nil, err
			}

			group.Users, err = r.GetGroupUsers(group.ID)

			groups = append(groups, group)
		}
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return groups, nil
}