import "./styles.css";
import { TodoList } from "./classes";
import { createTodoHtml } from "./js/components";

export const todoList = new TodoList();
console.log("todoList.todos=", todoList.todos);

todoList.todos.forEach((element) => {
    createTodoHtml(element);
});
