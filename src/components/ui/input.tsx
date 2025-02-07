import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, suffix, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            suffix ? "pr-8" : "", // Add right padding if suffix exists
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <span className="absolute right-2 pt-1 text-muted-foreground flex items-center">
            {typeof suffix === "string" ? <span>{suffix}</span> : suffix}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
