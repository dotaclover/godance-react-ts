import styles from "./PostList.module.css";
import { Link } from "react-router-dom";
import { Post } from ".";
import { useState } from "react";

interface Props {
  data: Post[];
}

const PostList = ({ data }: Props) => {
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const handleClick = (id: number) => {
    setActivePostId(id);
  };
  return (
    <ul className="list-group">
      {data?.map((post) => (
        <Link
          key={post.id}
          to={post.to || ""}
          className={styles.link}
          onClick={() => handleClick(Number(post.id))}
        >
          <li
            className={`${styles.listItem} list-group-item ${
              activePostId === post.id ? "active" : ""
            }`}
          >
            {post.title}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default PostList;
