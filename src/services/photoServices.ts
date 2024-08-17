// services/PhotoService.ts
import HttpService from "./httpServices";

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

class PhotoService extends HttpService<Photo> {
    constructor() {
        super('photos');
    }

    getUserPhotos(userId: string) {
        const { request } = this.getAll({
            params: {
                userId,
                _limit: 10
            }
        });
        return request;
    }
}

export default new PhotoService();
