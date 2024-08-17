import { useQuery, QueryKey } from '@tanstack/react-query';
import albumService from '../../services/albumServices';

export interface Album {
    userId: number;
    id: number;
    title: string;
}

const useUserAlbums = (userId: string) => {
    const queryKey: QueryKey = ['userAlbums', userId];

    return useQuery<Album[]>({
        queryKey,
        queryFn: () => albumService.getUserAlbums(userId).then(response => response.data),
    });
};

export default useUserAlbums;
