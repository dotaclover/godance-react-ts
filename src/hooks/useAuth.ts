import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const { setUser, setAuth, logout } = useStore();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = ({ username }: { username: string, password: string }) => {
        setLoading(true);
        setError("");
        setTimeout(() => {
            const data = {
                token: "fake-jwt-token",
                user: {
                    id: 1,
                    name: username
                }
            }
            setAuth(data.token);
            setUser(data.user);

            setLoading(false);
            navigate("/");
        }, 1000);
    };

    return { login, logout, loading, error };
};
