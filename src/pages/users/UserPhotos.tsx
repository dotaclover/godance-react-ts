import React from "react";
import { useParams } from "react-router-dom";
import useUserPhotos from "../../hooks/users/useUserPhotos";
import { useTranslation } from "react-i18next";
import styles from "./UserPhotos.module.css"; // 导入自定义 CSS 文件

const UserPhotos: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { data, error, isLoading } = useUserPhotos(albumId!);
  const { t } = useTranslation();

  if (isLoading) return <div>{t("photos.Loading...")}</div>;
  if (error) return <div>{t("photos.Error loading photos.")}</div>;

  return (
    <div>
      <h1 className="text-center">{t("photos.My Photos")}</h1>
      <div className="row">
        {data?.map((photo) => (
          <div key={photo.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className={styles["photo-container"]}>
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className={`img-fluid ${styles["photo-image"]}`}
              />
              <p className="text-center">{photo.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPhotos;
