import { Suspense } from "react";
import "./App.css";
import Comments from "./components/Comments";
import { ErrorBoundary } from "react-error-boundary";
import { fetchComments } from "./utils/fetchComments";

// read data from promises and from context
function App() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <ErrorBoundary
        fallback={<div>Something went wrong. Please try again later.</div>}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Comments fetchComments={fetchComments()} isAdmin={true} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
