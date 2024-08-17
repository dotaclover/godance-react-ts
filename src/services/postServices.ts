import HttpService from "./httpServices";
import { Post } from "../components/Post";

class PostService extends HttpService<Post> {
    constructor() {
        super('posts');
    }

    getPost(postId: string) {
        return this.get(postId).then(response => response.data);
    }

    getPosts() {
        return this.getAll({
            params: {
                _limit: 10
            }
        }).request.then(response => response.data);
    }

    getUserPosts(userId: string) {
        const { request } = this.getAll({
            params: {
                userId,
                _limit: 10
            }
        });
        return request;
    }
}

export default new PostService();
