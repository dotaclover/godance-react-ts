// hooks/users/useUserPosts.ts
import { useQuery, QueryKey } from '@tanstack/react-query';
import postService from '../../services/postServices';
import { Post } from '../../components/Post';

const useUserPosts = (userId: string) => {
    const queryKey: QueryKey = ['userPosts', userId];

    return useQuery<Post[]>({
        queryKey,
        queryFn: () => postService.getUserPosts(userId).then(response => response.data),
        staleTime: 5 * 60 * 1000
    });
};

export default useUserPosts;
