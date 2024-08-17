import React from "react";
import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import BackButton from "../components/BackButton";
import PostDetailComponent from "../components/Post/PostDetail";
import { useTranslation } from "react-i18next";

const PostDetail: React.FC = () => {
  const { t } = useTranslation();
  const { postId } = useParams<{ postId: string }>();
  const { data, error, isLoading } = usePost(postId!);

  if (isLoading) return <div>{t("posts.Loading...")}</div>;
  if (error) return <div>{t("posts.Error loading posts.")}</div>;

  return (
    <>
      {data && <PostDetailComponent data={data} />}
      <div className="text-center p-3">
        <BackButton />
      </div>
    </>
  );
};

export default PostDetail;
