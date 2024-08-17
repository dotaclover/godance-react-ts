import React from "react";
import { useParams } from "react-router-dom";
import useUserPosts from "../../hooks/users/useUserPosts";
import { useTranslation } from "react-i18next";
import PostList from "../../components/Post/PostList";

const UserPosts: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, error, isLoading } = useUserPosts(userId!);
  const { t } = useTranslation();

  if (isLoading) return <div>{t("posts.Loading...")}</div>;
  if (error) return <div>{t("posts.Error loading user posts.")}</div>;

  return (
    <div>
      <h1 className="text-center">{t("posts.My Posts")}</h1>
      {data && (
        <PostList data={data.map((p) => ({ ...p, to: `/posts/${p.id}` }))} />
      )}
    </div>
  );
};

export default UserPosts;
