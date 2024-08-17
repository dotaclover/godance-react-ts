import apiClient from "./apiClient";
import { AxiosRequestConfig } from "axios";

class HttpService<T extends { id: number | string }> {

    constructor(private endpoint: string) { }

    getAll(config?: AxiosRequestConfig) {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, { signal: controller.signal, ...config });
        return { request, cancel: () => controller.abort() };
    }

    get(id: number | string, config?: AxiosRequestConfig) {
        return apiClient.get<T>(`${this.endpoint}/${id}`, config);
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
