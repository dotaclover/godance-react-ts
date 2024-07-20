import HttpService from "./httpService";
export interface User {
    id: number;
    name: string;
}

export default new HttpService<User>("/users");