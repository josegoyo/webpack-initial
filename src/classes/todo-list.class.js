import { Todo } from "./index";

export class TodoList {
    constructor() {
        this.getTodosLocalStorage();
    }

    newTodo(task) {
        this.todos.push(task);

        this.saveTodosLocalStorage();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id != id);

        this.saveTodosLocalStorage();
    }

    toggleTodo(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completed = !todo.completed;
            }
        }

        this.saveTodosLocalStorage();
    }

    deleteCompletedTodos() {
        this.todos = this.todos.filter((todo) => !todo.completed);

        this.saveTodosLocalStorage();
    }

    saveTodosLocalStorage() {
        localStorage.setItem("TODOS", JSON.stringify(this.todos));
    }

    getTodosLocalStorage() {
        this.todos = localStorage.getItem("TODOS") ? JSON.parse(localStorage.getItem("TODOS")) : [];

        this.todos = this.todos.map((obj) => {
            return Todo.fromJson(obj);
        });
    }
}
