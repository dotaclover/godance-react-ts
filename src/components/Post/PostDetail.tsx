import { Post } from ".";

interface Props {
  data: Post;
}
const PostDetail = ({ data }: Props) => {
  return (
    <div>
      <p className="fs-3 fw-bold text-center">{data?.title}</p>
      <p className="fs-5">{data?.body}</p>
    </div>
  );
};

export default PostDetail;
