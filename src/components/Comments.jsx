import { use } from "react";
import CommentCard from "./CommentCard";
import { AuthContext } from "../context/AuthContext";

// use can only be called inside of a functional component and other hooks.
const Comments = ({ fetchComments }) => {
  const auth = use(AuthContext);

  if (!auth.isAdmin) return "Youre not an admin";

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
