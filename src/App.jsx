import "./App.css";
import Comments from "./components/Comments";

// read data from promises and from context
function App() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <Comments />
    </div>
  );
}

export default App;
