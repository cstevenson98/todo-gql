package model

type Todo struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Done        bool   `json:"done"`
}

type NewTodo struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}