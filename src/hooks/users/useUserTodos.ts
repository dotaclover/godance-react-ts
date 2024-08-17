import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import todoService from "../../services/todoServices";

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const useUserTodos = (userId: string) => {
    const queryClient = useQueryClient();
    const CACHE_KEY_TODO = ["userTodos", userId];

    const { data, error, isLoading } = useQuery<Todo[], Error>({
        queryKey: CACHE_KEY_TODO,
        queryFn: () => todoService.getAll().request.then(res =>
            res.data.filter(todo => todo.userId.toString() === userId)
        )
    });

    const toggleTodoMutation = useMutation({
        mutationFn: (todo: Todo) => todoService.toggleCompletion(todo),
        onMutate: (newTodo: Todo) => {
            const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODO) || [];
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, (todos = []) =>
                todos.map(t => t.id !== newTodo.id ? t : ({ ...t, completed: !t.completed }))
            );
            return { previousTodos };
        },
        //@ts-ignore
        onError: (error, newTodo, context: { previousTodos?: Todo[] } | undefined) => {
            if (context?.previousTodos) {
                queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, context.previousTodos);
            }
        },
        // onSuccess: (savedTodo, newTodo) => {
        //     queryClient.invalidateQueries({ queryKey: CACHE_KEY_TODO });
        // },
    });

    const deleteTodoMutation = useMutation({
        mutationFn: (id: number) => todoService.delete(id),
        onMutate: (id: number) => {
            const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODO) || [];
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, (todos = []) =>
                todos.filter(t => t.id !== id)
            );
            return { previousTodos };
        },
        //@ts-ignore
        onError: (error, newTodo, context: { previousTodos?: Todo[] } | undefined) => {
            if (context?.previousTodos) {
                queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, context.previousTodos);
            }
        },
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: CACHE_KEY_TODO });
        // }
    });

    return {
        data,
        error,
        isLoading,
        toggleTodo: toggleTodoMutation.mutate,
        deleteTodo: deleteTodoMutation.mutate
    };
};

export default useUserTodos;
