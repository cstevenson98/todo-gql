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
		return nil, fmt.Errorf("no users with those credentials found")
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

	var joinTableStmt string
	if len(user) != 0 {
		joinTableStmt = `INSERT INTO users_todos (todo_id, user_id) VALUES($1, $2)`
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

// GetUsers returns all or subset of USERS
func (r *Resolver) GetUserByEmailIfValid(email, password string) (*model.User, error) {
	qry := `SELECT * FROM users WHERE email = '` + email + `'`
	row := r.DB.QueryRow(qry)

	user := &model.InternalUser{}

	err := row.Scan(&user.ID, &user.Name, &user.Email, &user.Password)
	if err != nil {
		return nil, err
	}

	if err = row.Err(); err != nil {
		return nil, err
	}

	passwordGood := bcrypt.CompareHashAndPassword(user.Password, []byte(password))
	if passwordGood != nil {
		return nil, fmt.Errorf("invalid email or password")
	}

	todos, getTodosErr := r.GetUserTodos(user.ID)
	if getTodosErr != nil {
		return nil, getTodosErr
	}

	out := &model.User{
		ID:    user.ID,
		Name:  user.Name,
		Todos: todos,
	}

	return out, nil
}
