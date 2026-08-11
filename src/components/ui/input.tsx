import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-xl border border-input bg-paper px-3.5 py-2 text-base text-ink transition-colors outline-none",
        "placeholder:text-ink-muted selection:bg-primary selection:text-white",
        "file:mr-3 file:h-7 file:rounded-md file:border-0 file:bg-mist file:px-3 file:text-sm file:font-medium file:text-ink",
        "hover:border-ink/25 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/15",
        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
