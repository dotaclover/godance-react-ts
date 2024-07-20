import { useEffect, useRef } from "react";
import userService, { User } from "../../services/userService";
import useUsers from "../../hooks/useUsers";

const DummyUser = () => {
  const { users, setUsers, error, setError, isLoading } = useUsers();

  const ref = useRef<HTMLInputElement>(null);

  const createUser = () => {
    const originUsers = [...users];
    const name = ref.current?.value ?? "";
    const user = { id: Date.now(), name };
    setUsers([user, ...users]);
    setError("");
    userService
      .create(user)
      .then(({ data: user }) => {
        setUsers([user, ...users]);
      })
      .catch((err) => {
        setError(err.message);
        setUsers(originUsers);
      });
  };

  const deleteUser = (user: User) => {
    const originUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    setError("");

    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originUsers);
    });
  };

  const updateUser = (user: User) => {
    const originUsers = [...users];
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
    setError("");

    userService.update(user).catch((err) => {
      setError(err.message);
      setUsers(originUsers);
    });
  };

  useEffect(() => {
    if (ref.current) ref.current.focus();
    document.title = "GoDance App";
  }, []);

  return (
    <>
      {!isLoading && error && <p className="text-danger">{error}</p>}

      <div className="d-flex justify-content-between">
        <input ref={ref} type="text" className="form-control" />
        <button className="btn btn-primary mx-3" onClick={createUser}>
          Add
        </button>
      </div>
      <ul className="list-group my-3">
        {users.map((user: User) => (
          <li className="list-group-item" key={user.id}>
            {user.name}
            <button
              className="btn btn-sm btn-outline-danger float-end"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
            <button
              className="btn btn-sm btn-outline-info mx-2 float-end"
              onClick={() => updateUser({ id: user.id, name: user.name + "!" })}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
      {isLoading && <p className="spinner-border"></p>}
    </>
  );
};

export default DummyUser;
