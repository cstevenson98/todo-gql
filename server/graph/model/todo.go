package model

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
	ID             string  `db:"id"`
	Name           string  `db:"name"`
	Todos          []*Todo `db:"todos"`
}

type NewUser struct {
	Name string `db:"name"`
}

type Group struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Todos       []*Todo `json:"todos"`
	Users       []*User `json:"users"`
}

type NewGroup struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}
