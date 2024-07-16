import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

import "./App.css";
import Comments from "./components/Comments";
import { fetchComments } from "./utils/fetchComments";

function App() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <ErrorBoundary
        fallback={<div>Something went wrong. Please try again later.</div>}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Comments fetchComments={fetchComments()} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
