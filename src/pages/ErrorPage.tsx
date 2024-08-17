import React from "react";
import { useTranslation } from "react-i18next";

const ErrorPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p className="lead">{t("Page Not Found")}</p>
        <a href="/" className="btn btn-primary">
          {t("Go Home")}
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
