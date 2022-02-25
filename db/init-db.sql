CREATE TABLE todos (
    id text not null, 
    title text not null, 
    description text not null, 
    done boolean not null, 
    primary key(id)
);

CREATE TABLE users (
    id text not null, 
    name text not null, 
    primary key(id)
);

CREATE TABLE users_todos (
    todo_id text not null, 
    user_id text not null, 
    primary key(todo_id, user_id), 
    foreign key(todo_id) references todos(id) on delete cascade, 
    foreign key(user_id) references users(id) on delete cascade
);

CREATE VIEW todos_users_view AS SELECT id, title, description, done, user_id FROM todos JOIN users_todos on todos.id = users_todos.todo_id;
