import apiClient from "./apiClient"

class HttpService<T extends { id: number }> {


    constructor(private endpoint: string) { }

    getAll() {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, { signal: controller.signal });
        return { request, cancel: () => controller.abort() }
    }

    async create(entity: T) {
        return apiClient.post<T, { data: T }>(this.endpoint, entity);
    }

    async delete(id: number) {
        return apiClient.delete(`${this.endpoint}/${id}`);
    }

    async update(entity: T) {
        return apiClient.patch(`/${this.endpoint}/${entity.id}`, entity);
    }
}

export default HttpService;