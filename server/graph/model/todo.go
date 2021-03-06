package model

type AuthToken struct {
	Token string `json:"token"`
}

type Token struct {
	Token string `json:"token"`
}

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

type InternalUser struct {
	ID       string
	Name     string
	Email    string
	Password []byte
}

type NewUser struct {
	Name string `db:"name"`
}

type AccountInfo struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}
