import { useQuery, QueryKey } from '@tanstack/react-query';
import postService from '../services/postServices';
import { Post } from '../components/Post';

const usePost = (postId: string) => {
    const queryKey: QueryKey = ['post', postId];

    return useQuery<Post>({
        queryKey,
        queryFn: () => postService.get(postId).then(response => response.data),
        staleTime: 5 * 60 * 1000,
    });
};

export default usePost;
