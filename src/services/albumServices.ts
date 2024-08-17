import { Album } from "../hooks/users/useUserAlbums";
import HttpService from "./httpServices";

class AlbumService extends HttpService<Album> {
    constructor() {
        super('albums');
    }

    getUserAlbums(userId: string) {
        const { request } = this.getAll({
            params: {
                userId,
                _limit: 10
            }
        });
        return request;
    }
}

export default new AlbumService();
