// src/components/BackButton.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClick = () => {
    navigate(-1); // 返回上一个页面
  };

  return (
    <button onClick={handleClick} className="btn btn-primary">
      {t("Back")}
    </button>
  );
};

export default BackButton;
