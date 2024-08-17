// hooks/users/useUserPhotos.ts
import { useQuery, QueryKey } from '@tanstack/react-query';
import photoService from '../../services/photoServices';

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const useUserPhotos = (userId: string) => {
    const queryKey: QueryKey = ['userPhotos', userId];

    return useQuery<Photo[]>({
        queryKey,
        queryFn: () => photoService.getUserPhotos(userId).then(response => response.data),
    });
};

export default useUserPhotos;
