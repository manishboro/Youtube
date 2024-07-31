import { useEffect, useRef, useState } from "react";
import { AutoSizer, List, CellMeasurerCache, CellMeasurer } from 'react-virtualized';

import CommentCard from "./CommentCard";
import { fetchComments } from "../utils/fetchComments";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const Comments = () => {
  const pageSize = 5;
  const pageRef = useRef(1);

  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const handleFetchComments = async ({ page = 1, isFetchingFirstTime }) => {
    try {
      setIsError(false);
      isFetchingFirstTime && setIsLoading(true);

      const comments = await fetchComments(page);

      if (comments.length === pageSize) setHasMore(true);
      else setHasMore(false);

      setComments((prev) => [...prev, ...comments]);
    } catch (err) {
      setIsError(true);
    } finally {
      isFetchingFirstTime && setIsLoading(false);
    }
  };

  const [targetRef, isIntersecting] = useIntersectionObserver({ threshold: 1 });

  // Initial fetch
  useEffect(() => {
    handleFetchComments({ page: pageRef.current, isFetchingFirstTime: true });
  }, []);

  // Infinite scrolling
  useEffect(() => {
    if (isIntersecting && hasMore) {
      pageRef.current = pageRef.current + 1;
      handleFetchComments({ page: pageRef.current });
    }
  }, [isIntersecting, hasMore]);

  return (
    <div className="grid gap-5">
      {isError ? (
        <div>Something went wrong. Please try again later.</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : Array.isArray(comments) && comments.length ? (
        <>
          {comments.map((comment) => (
            <CommentCard key={comment.id} data={comment} />
          ))}

          <div ref={targetRef} className="text-center">
            Fetching more comments...
          </div>
        </>
      ) : (
        <div>No comments available</div>
      )}
    </div>
  );
};

export default Comments;
