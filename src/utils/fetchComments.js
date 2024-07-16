export const fetchComments = async (postId = 1) => {
  const resPro = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const res = await resPro.json();

  if (!Array.isArray(res) || (Array.isArray(res) && !res.length)) {
    throw new Error("Failed to fetch comments");
  }

  return res;
};