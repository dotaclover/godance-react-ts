import { User } from "../hooks/useUsers";
import HttpService from "./httpServices";

class UserService extends HttpService<User> {
    constructor() {
        super('users');
    }

    getUsers() {
        const { request } = this.getAll();
        return request;
    }
}

export default new UserService();
