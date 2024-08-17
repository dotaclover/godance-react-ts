import axios from "axios";

// 创建 axios 实例
const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {}
});

// 请求拦截器
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token)
            config.headers['token'] = token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;