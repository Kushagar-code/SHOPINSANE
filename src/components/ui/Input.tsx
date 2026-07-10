import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {

    // Auto-generate ID if none provided but label exists
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium font-gt-standard transition-colors duration-200",
              error ? "text-semantic-error" : "text-ink-black"
            )}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "flex w-full rounded-lg bg-pure-white border text-ink-black placeholder:text-muted-gray transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-pure-white hover:border-cool-stone disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-semantic-error/50 focus-visible:ring-semantic-error/40 focus-visible:border-semantic-error"
              : "border-faint-border focus-visible:ring-shop-violet/40 focus-visible:border-shop-violet",
            "h-10 px-4 text-base font-gt-standard",
            className
          )}
          aria-invalid={!!error}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-semantic-error font-gt-standard opacity-90">{error}</span>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
