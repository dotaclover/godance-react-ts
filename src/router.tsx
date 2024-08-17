import { createBrowserRouter } from "react-router-dom";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Users from "./pages/Users";
import UserPosts from "./pages/users/UserPosts";
import UserTodos from "./pages/users/UserTodos";
import UserAlbums from "./pages/users/UserAlbums";
import UserPhotos from "./pages/users/UserPhotos";
import ErrorPage from "./pages/ErrorPage";
import MainLayoutWrapper from "./pages/layouts/MainLayoutWrapper";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayoutWrapper />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Posts /> },
          { path: "posts/:postId", element: <PostDetail /> },
          { path: "users", element: <Users /> },
          { path: "users/:userId/posts", element: <UserPosts /> },
          { path: "users/:userId/todos", element: <UserTodos /> },
          { path: "users/:userId/albums", element: <UserAlbums /> },
          { path: "users/:albumId/photos", element: <UserPhotos /> },
        ],
      },
    ],
  },
]);

export default router;
