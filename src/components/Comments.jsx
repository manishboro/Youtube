import { use } from "react";
import CommentCard from "./CommentCard";

const Comments = ({ fetchComments }) => {
  const comments = use(fetchComments);

  return (
    <div className="grid gap-5">
      {comments.map((comment) => (
        <CommentCard key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default Comments;
