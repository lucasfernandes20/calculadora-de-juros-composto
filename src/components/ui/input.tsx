import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, prefix, ...props }, ref) => {
    return (
      <div className={cn("flex items-stretch", className)}>
        {prefix && (
          <p className="bg-primary/70 rounded-tl-lg rounded-bl-lg flex justify-center items-center text-primary-foreground select-none w-10">
            {prefix}
          </p>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
            prefix ? "rounded-tl-none rounded-bl-none" : "rounded-md"
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

