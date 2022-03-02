package graph

import (
	"database/sql"
	"github.com/google/uuid"
	"test/graph/model"
)

type Resolver struct {
	DB *sql.DB
}

// NewTodo creates a new TODO
func (r *Resolver) NewTodo(input model.NewTodo) (*model.Todo, error) {
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

// NewUser creates a new USER
func (r *Resolver) NewUser(input model.NewUser) (*model.User, error) {
	stmt := `INSERT INTO users (id, name) VALUES($1, $2)`

	id := uuid.NewString()
	var user model.User

	_, err := r.DB.Exec(stmt, id, input.Name)
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

			groups = append(groups, group)
		}
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return groups, nil
}