import { useQuery, QueryKey } from '@tanstack/react-query';
import postService from '../services/postServices';
import { Post } from '../components/Post';

const usePosts = () => {
    const queryKey: QueryKey = ['posts'];

    return useQuery<Post[]>({
        queryKey,
        queryFn: () => postService.getAll().request.then(response => response.data),
        staleTime: 5 * 60 * 1000,
    });
};

export default usePosts;
