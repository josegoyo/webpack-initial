export class Todo {
    static fromJson({ id, description, completed, createdAt }) {
        const tempTodo = new Todo(description);

        tempTodo.id = id;
        tempTodo.createdAt = createdAt;
        tempTodo.completed = completed;

        return tempTodo;
    }

    constructor(description) {
        this.description = description;
        this.id = new Date().getTime();
        this.completed = false;
        this.createdAt = new Date();
    }
}
