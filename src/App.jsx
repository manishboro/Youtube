import { useState, useTransition, useActionState } from "react";
import { useFormStatus } from "react-dom";
import "./App.css";
import { mockApi } from "./utils/mockApi";
import { Button, InputField } from "./components";

import toast, { Toaster } from "react-hot-toast";

const ButtonWrapper = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} className="mt-4">
      Update
    </Button>
  );
};

function App() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  // const [error, setError] = useState(null);

  // const [isPending, startTransition] = useTransition();
  const [state, submitAction, isPending] = useActionState(
    async (previousState, _formData) => {
      try {
        console.log(_formData.get("email"), _formData.get("password"));

        const body = {
          email: _formData.get("email"),
          password: _formData.get("password"),
        };

        if (previousState?.email === _formData.get("email")) {
          throw new Error();
          toast.error(
            "You have inputted the same email. Please enter a new one!"
          );
          return body;
        }

        const data = await mockApi(body);

        console.log(data);

        toast.success("Login successful");

        return data;
      } catch (err) {
        console.log(err);
        // setError(true);
        toast.error("Login failed");
        return { error: true, message: "Failed to login" };
      }
    },
    null
  );

  console.log("state", state);
  console.log("isPending", isPending);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center p-8">
        <div>
          {state?.error ? (
            <div className="text-center mb-2 text-lg font-bold text-red-500">
              {state.message}
            </div>
          ) : null}
          <form
            action={submitAction}
            className="w-[30rem] grid gap-4 px-4 pt-2 py-6 rounded-lg overflow-hidden border"
          >
            <div className="text-center text-xl font-semibold mb-4">
              Login in to your account
            </div>

            <InputField
              label="Email"
              name="email"
              placeholder="example@gmail.com"
              // value={formData.email}
              disabled={isPending}
              // onChange={(e) =>
              //   setFormData((prev) => ({ ...prev, email: e.target.value }))
              // }
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="password1234"
              // value={formData.password}
              disabled={isPending}
              // onChange={(e) =>
              //   setFormData((prev) => ({ ...prev, password: e.target.value }))
              // }
            />

            <ButtonWrapper />
          </form>
        </div>
      </div>

      <Toaster
        toastOptions={{ duration: 2000 }}
        containerStyle={{ zIndex: 99999999 }}
        position="bottom-right"
      />
    </>
  );
}

export default App;
