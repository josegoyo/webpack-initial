import { Todo } from "../classes";
import { todoList } from "../index";

const htmlList = document.querySelector(".todo-list");
const textInput = document.querySelector(".new-todo");
const btnDeleteCompleted = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters");
const anchorFilters = document.querySelectorAll(".filtro");

export const createTodoHtml = (todo) => {
    const htmlTodo = `<li class="${todo.completed ? "completed" : ""}" data-id="${todo.id}">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
                            <label>${todo.description}</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Create a TodoMVC template">
                    </li>`;

    const div = document.createElement("div");
    div.innerHTML = htmlTodo;
    htmlList.append(div.firstElementChild);

    return div.firstElementChild;
};

//events
textInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && textInput.value.length > 0) {
        const newTask = new Todo(textInput.value);
        todoList.newTodo(newTask);
        createTodoHtml(newTask);
        textInput.value = "";
    }
});

htmlList.addEventListener("click", (event) => {
    const labelEvent = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const idElement = todoElement.getAttribute("data-id");

    if (labelEvent.includes("input")) {
        todoList.toggleTodo(idElement);
        todoElement.classList.toggle("completed");
    } else if (labelEvent.includes("button")) {
        todoList.deleteTodo(idElement);
        htmlList.removeChild(todoElement);
    }
});

btnDeleteCompleted.addEventListener("click", () => {
    todoList.deleteCompletedTodos();

    for (let i = htmlList.children.length - 1; i >= 0; i--) {
        const element = htmlList.children[i];
        if (element.classList.contains("completed")) {
            htmlList.removeChild(element);
        }
    }
});

ulFilters.addEventListener("click", (event) => {
    const filter = event.target.text;

    if (!filter) return;

    anchorFilters.forEach((elem) => elem.classList.remove("selected"));
    event.target.classList.add("selected");

    for (const element of htmlList.children) {
        element.classList.remove("hidden");
        const completed = element.classList.contains("completed");

        switch (filter) {
            case "Pendientes":
                if (completed) {
                    element.classList.add("hidden");
                }
                break;
            case "Completados":
                if (!completed) {
                    element.classList.add("hidden");
                }
                break;
        }
    }
});
