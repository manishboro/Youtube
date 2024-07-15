import { useState, useActionState, useOptimistic } from "react";
import { useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";
import { mockApi } from "./utils/mockApi";
import { Button, InputField } from "./components";


const ButtonWrapper = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} className="mt-4">
      Update
    </Button>
  );
};

function App() {
  const [currentEmail, setCurrentEmail] = useState("123@gmail.com");

  const [optimisticEmail, setOptimisticEmail] = useOptimistic(currentEmail);

  const [state, submitAction, isPending] = useActionState(
    async (previousState, _formData) => {
      try {
        const body = {
          email: _formData.get("email"),
        };

        setOptimisticEmail(body.email);

        if (previousState?.email === _formData.get("email")) {
          toast.error(
            "You have inputted the same email. Please enter a new one!"
          );
          return body;
        }

        const data = await mockApi(body);

        setCurrentEmail(data.email);

        toast.success("Email updated successfully");

        return data;
      } catch (err) {
        toast.error("Email updation failed");
        return { error: true, message: "Email updation failed" };
      }
    },
    null
  );

  return (
    <>
      <div className="w-full h-full flex items-center justify-center p-8">
        <div>
          {state?.error ? (
            <div className="text-center mb-2 text-lg font-bold text-red-500">
              {state.message}
            </div>
          ) : null}

          <div>Your current email is : {optimisticEmail}</div>

          <form
            action={submitAction}
            className="w-[30rem] grid gap-4 px-4 pt-2 py-6 rounded-lg overflow-hidden border"
          >
            <div className="text-center text-xl font-semibold mb-4">
              Update Email
            </div>

            <InputField
              label="Email"
              name="email"
              placeholder="example@gmail.com"
              defaultValue={currentEmail}
              disabled={isPending}
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
