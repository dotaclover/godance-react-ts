import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

interface Props {
  handleClick?: (id: number) => void;
  data: { id: number; title: string; to?: string }[];
}
const List = ({ data, handleClick }: Props) => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  return (
    <ul className="list-group">
      {data?.map((item) => (
        <Link
          key={item.id}
          to={item.to || ""}
          className={styles.link}
          onClick={() => {
            setActiveItemId(item.id);
            if (handleClick) handleClick(item.id);
          }}
        >
          <li
            className={`${styles.listItem} list-group-item ${
              activeItemId === item.id ? "active" : ""
            }`}
          >
            {item.title}
          </li>
        </Link>
      ))}
    </ul>
  );
};
export default List;
