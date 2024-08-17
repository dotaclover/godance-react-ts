import React from "react";
import usePosts from "../hooks/usePosts";
import { useTranslation } from "react-i18next";
import PostList from "../components/Post/PostList";

const Posts: React.FC = () => {
  const { data, error, isLoading } = usePosts();
  const { t } = useTranslation();

  if (isLoading) return <div>{t("posts.Loading...")}</div>;
  if (error) return <div>{t("posts.Error loading posts.")}</div>;

  return (
    <div>
      <h1 className="text-center">{t("posts.Posts")}</h1>
      {data && (
        <PostList data={data.map((p) => ({ ...p, to: `/posts/${p.id}` }))} />
      )}
    </div>
  );
};

export default Posts;
