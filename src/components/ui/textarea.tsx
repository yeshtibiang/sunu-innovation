import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-xl border border-input bg-paper px-3.5 py-2.5 text-base text-ink transition-colors outline-none",
        "placeholder:text-ink-muted",
        "hover:border-ink/25 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/15",
        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
