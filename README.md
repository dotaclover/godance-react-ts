# React + TypeScript + Vite 前端模板

## 即插即用

把项目克隆到本地,在根目录执行`npm run dev`就行了，默认用户名和密码都是`admin`。

如果要发布，先执行`npm run build`，成功后会产生一个 dist 目录，直接把 dist 目录发布即可。
如果`npm run build`报错，就是 TS 编译没通过，根据控制台输出的错误修改只，哈哈。

## 示例说明

先使用`vite`的`react-ts`模板创建的项目：

```bash
npm create vite@latest my-react-project -- --template react-ts
```

再安装一些类库

- axios(网络请求)
- bootstrap(页面布局)
- i18next(多语言)
- react-router-dom(路由支持)
- @tanstack/react-query(接口数据管理)
- zustand(全局状态管理)

```bash
npm install react-router-dom@6 @tanstack/react-query zustand i18next react-i18next bootstrap axios
```

调整后目录结构如下:

```
my-react-project/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── ...
│   ├── locales/
│   │   ├── en.json
│   │   └── zh.json
│   ├── pages/
│   │   ├── layouts/
│   │   └── ...
│   ├── services/
│   │   └── apiClient.ts
│   │   └── httpService.ts
│   │   └── ...
│   ├── i18n.ts
│   └── main.tsx
│   └── router.tsx
│   └── store.ts
├── index.html
└── package.json
└── ...
```

## 关于接口请求

`API`请求相关的文件都放在`src/services`下, `apiClient.ts`返回一个`axios`对象，其他接口直接使用它实现后台请求。
现在的演示后台是使用`https://jsonplaceholder.typicode.com/`作为`dummy`数据源的，开发的时候根据实际情况修改`baseURL`和`token`。
`httpServices`是一个`REST`风格的基类，开发的时候根据后台接口的实际情况也可能需要修改。其他`services`文件可以继承这个`httpService`进一步简化接口请求。

```typescript
//src/services/apiClient.ts

import axios from "axios";

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {},
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["token"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
```

## 关于数据传递

全局共享数据，如登录状态、语言选择等使用`zustand`管理，参考`src/store.ts`,项目地址：`https://github.com/pmndrs/zustand`。

```typescript
export const useStore = create<AppState>((set) => ({
  language: localStorage.getItem("token") || "en",
  setLanguage: (language) => {
    localStorage.setItem("language", language);
    set({ language });
  },
}));
```

接口数据，不需要全局共享的如用户列表、帖子列表等使用`react-query`调用，参考`src/hooks/`下面的自定义`hook`。`react-query`自带重试、缓存、刷新等功能，项目地址：`https://github.com/TanStack/query`。

```typescript
const usePost = (postId: string) => {
  const queryKey: QueryKey = ["post", postId];

  return useQuery<Post>({
    queryKey,
    queryFn: () => postService.get(postId).then((response) => response.data),
    staleTime: 5 * 60 * 1000,
  });
};

export default usePost;
```

## 关于多语言

多语言使用`react-i18next`处理，配置参考`src/i18n.ts`和`src/main.ts`。
当前示例中，翻译写在`src/locales`下，目前有提供`en.json`和`zh.json`两个翻译文件。
开发中根据实际需要添加或修改，增加或删除语言需要修改`src/i18n.ts`。

```tsx
//在组件中使用翻译
import { useTranslation } from "react-i18next";
const { t } = useTranslation();

return (
  <button onClick={handleClick} className="btn btn-primary">
    {t("Back")}
  </button>
);
```

## 关于路由

路由使用`react-router-dom@6`，路由配置参考`src/router.tsx`和`src/main.ts`。
当前示例包含一个`/login`公共路由和一组`/`下的保护路由，登录后才能访问。
开发中根据实际需要修改`src/router.tsx`即可。
