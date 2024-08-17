import React from "react";
import { useParams } from "react-router-dom";
import useUserTodos, { Todo } from "../../hooks/users/useUserTodos";
import { useTranslation } from "react-i18next";
import styles from "./UserTodos.module.css"; // 引入CSS模块

const UserTodos: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, error, isLoading, toggleTodo, deleteTodo } = useUserTodos(
    userId!
  );
  const { t } = useTranslation();

  const handleToggle = (todo: Todo) => toggleTodo(todo);

  const handleDelete = (id: number) => {
    if (window.confirm(t("todos.Are you sure you want to delete this todo?"))) {
      deleteTodo(id);
    }
  };

  if (isLoading) return <div>{t("todos.Loading...")}</div>;
  if (error) return <div>{t("todos.Error loading todos.")}</div>;

  return (
    <div>
      <h1 className="text-center">{t("todos.My Todos")}</h1>
      <ul className="list-group">
        {data?.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="form-check">
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
                className={`form-check-input ${styles.customCheckbox}`}
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`form-check-label ${styles.checkboxLabel}`}
              >
                {todo.title}
              </label>
            </div>
            <button
              className="btn btn-danger btn-sm text-truncate p-0"
              style={{ minWidth: "50px", maxWidth: "70px", minHeight: "16px" }}
              onClick={() => handleDelete(todo.id)}
            >
              {t("todos.Delete")}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTodos;
