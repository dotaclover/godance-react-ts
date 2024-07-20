import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/apiClient";

const useUsers = () => {
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        setLoading(true);
        setUsers([]);
        setError("");

        const { request, cancel } = userService.getAll();
        request
            .then((res) => {
                setLoading(false);
                setUsers(res.data);
            })
            .catch((err) => {
                setLoading(false);
                !(err instanceof CanceledError) && setError(err.message);
            });
        return () => cancel();
    }, []);

    return { users, setUsers, error, setError, isLoading, setLoading };

}

export default useUsers;