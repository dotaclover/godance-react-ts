class AuthService {
    login(username: string, password: string) {
        return new Promise<{ id: number; name: string }>((resolve, reject) => {
            setTimeout(() => {
                if (username === "admin" && password === "admin") {
                    resolve({ id: 1, name: "Admin" });
                } else {
                    reject("Invalid credentials");
                }
            }, 1000);
        });
    }
}

export default new AuthService();
