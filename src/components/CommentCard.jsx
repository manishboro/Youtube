import UserProfile from "/user-profile.jpg";

const CommentCard = ({ data }) => {
  return (
    <div className="py-3 px-4 rounded-lg border w-[30rem]">
      <div className="flex gap-2 items-center mb-1">
        <img src={UserProfile} alt={data.name} className="h-10 w-10" />
        <div className="text-sm font-bold">{data.email}</div>
      </div>
      <div className="text-base">{data.body}</div>
    </div>
  );
};

export default CommentCard;
