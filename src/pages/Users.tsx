import React, { useState } from "react";
import useUsers from "../hooks/useUsers";
import styles from "./User.module.css";
import { useTranslation } from "react-i18next";

const Users: React.FC = () => {
  const { data, error, isLoading } = useUsers();
  const [showMore, setShowMore] = useState<{ [key: number]: boolean }>({});

  const { t } = useTranslation();

  if (isLoading) return <div>{t("users.Loading...")}</div>;
  if (error) return <div>{t("users.Error loading users.")}</div>;

  const toggleShowMore = (id: number) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="container-fluid mx-0 md-mx-3">
      <h1 className="text-center">{t("users.Title")}</h1>
      <table className={`table table-striped table-bordered ${styles.table}`}>
        <thead className="thead-dark">
          <tr>
            <th>{t("users.Username")}</th>
            <th>{t("users.Email")}</th>
            <th className="d-md-none"></th>
            <th className="d-none d-md-table-cell">{t("users.Name")}</th>
            <th className="d-none d-md-table-cell">{t("users.Phone")}</th>
            <th className="d-none d-md-table-cell">{t("users.Website")}</th>
            <th className="d-none d-md-table-cell">{t("users.Company")}</th>
            <th className="d-none d-md-table-cell">{t("users.Address")}</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <React.Fragment key={user.id}>
              <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className="d-md-none">
                  <button
                    className={`btn p-0 m-0 fs-3 ${styles.moreButtonIcon}`}
                    onClick={() => toggleShowMore(user.id)}
                  >
                    {showMore[user.id] ? "-" : "+"}
                  </button>
                </td>
                <td className="d-none d-md-table-cell">{user.name}</td>
                <td className="d-none d-md-table-cell">{user.phone}</td>
                <td className="d-none d-md-table-cell">{user.website}</td>
                <td className="d-none d-md-table-cell">{user.company.name}</td>
                <td className="d-none d-md-table-cell">
                  {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                </td>
              </tr>
              {showMore[user.id] && (
                <tr className="d-md-none">
                  <td colSpan={3}>
                    <div className={styles.userDetails}>
                      <p>
                        <strong>{t("users.Name")}:</strong> {user.name}
                      </p>
                      <p>
                        <strong>{t("users.Phone")}:</strong> {user.phone}
                      </p>
                      <p>
                        <strong>{t("users.Website")}:</strong> {user.website}
                      </p>
                      <p>
                        <strong>{t("users.Company")}:</strong>{" "}
                        {user.company.name}
                      </p>
                      <p>
                        <strong>{t("users.Address")}:</strong>{" "}
                        {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
