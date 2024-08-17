import React from "react";
import { useParams } from "react-router-dom";
import useUserAlbums from "../../hooks/users/useUserAlbums";
import { useTranslation } from "react-i18next";
import List from "../../components/List";

const UserAlbums: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, error, isLoading } = useUserAlbums(userId!);
  const { t } = useTranslation();

  if (isLoading) return <div>{t("albums.Loading...")}</div>;
  if (error) return <div>{t("albums.Error loading albums.")}</div>;

  return (
    <div>
      <h1 className="text-center">{t("albums.My Albums")}</h1>
      {data && (
        <List data={data.map((a) => ({ ...a, to: `/users/${a.id}/photos` }))} />
      )}
    </div>
  );
};

export default UserAlbums;
