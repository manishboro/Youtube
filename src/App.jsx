import "./App.css";
import { Button, InputField } from "./components";

function App() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <form className="w-[30rem] grid gap-4 px-4 pt-2 py-6 rounded-lg overflow-hidden border">
        <div className="text-center text-xl font-semibold mb-4">Login in to your account</div>

        <InputField label="Email" placeholder="example@gmail.com" />
        <InputField label="Password" type="password" placeholder="password1234" />

        <Button className="mt-4">Hello</Button>
      </form>
    </div>
  );
}

export default App;
