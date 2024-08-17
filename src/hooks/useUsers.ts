import { useQuery } from '@tanstack/react-query';
import userService from '../services/userServices';

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}


const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => userService.getUsers().then(response => response.data),
        staleTime: 5 * 60 * 1000,
    });
};

export default useUsers;
