package model

type Todo struct {
	ID          string `db:"id"`
	Title       string `db:"title"`
	Description string `db:"description"`
	Done        bool   `db:"done"`
}

type NewTodo struct {
	Title       string `db:"title"`
	Description string `db:"description"`
}

type User struct {
	ID    string  `db:"id"`
	Name  string  `db:"name"`
	Todos []*Todo `db:"todos"`
}

type NewUser struct {
	Name string `db:"name"`
}