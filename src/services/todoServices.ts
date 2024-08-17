import { Todo } from "../hooks/users/useUserTodos";
import HttpService from "./httpServices";

class TodoService extends HttpService<Todo> {
    constructor() {
        super('todos');
    }

    toggleCompletion(todo: Todo) {
        return this.update({ ...todo, completed: !todo.completed });
    }
}

export default new TodoService();
