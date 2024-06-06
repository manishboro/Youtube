import * as React from "react";

import Label from "../Label";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  required?: boolean;
  errorDetails?: { message: string };
  value?: string | number | readonly string[] | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ id, label, required, className, errorDetails, type, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={id}>
          {label} {!!required && <sup className="text-red-500">*</sup>}
        </Label>
      )}

      <input
        type={type}
        className={cn(
          label && "mt-1",
          errorDetails?.message && "border-red-600 text-red-600 focus-visible:!ring-red-600",
          "flex h-10 w-full rounded-md border border-solid border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset transition disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />

      {!!errorDetails?.message && <p className="text-sm text-red-600 font-semibold m-0 mt-1 p-0">{errorDetails.message}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
