import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {

    const variants = {
      primary: "bg-primary-500 text-white hover:bg-primary-400 hover:shadow-glow-primary active:scale-95 focus-visible:ring-primary-500 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed",
      secondary: "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 active:scale-95 focus-visible:ring-neutral-400 disabled:bg-neutral-900 disabled:text-neutral-600 disabled:cursor-not-allowed",
      danger: "bg-semantic-error text-white hover:bg-red-500 active:scale-95 focus-visible:ring-red-500 disabled:bg-red-900 disabled:text-red-400 disabled:cursor-not-allowed",
      outline: "bg-transparent text-primary-400 border border-primary-500/50 hover:border-primary-400 hover:bg-primary-500/10 active:scale-95 focus-visible:ring-primary-500 disabled:border-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed",
      ghost: "bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white active:scale-95 focus-visible:ring-neutral-400 disabled:text-neutral-600 disabled:cursor-not-allowed",
    };

    const sizes = {
      sm: "text-sm px-3 py-1.5 h-8",
      md: "text-base px-4 py-2 h-10",
      lg: "text-lg px-6 py-3 h-12",
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 relative overflow-hidden group",
          variants[variant],
          sizes[size],
          isLoading && "cursor-wait opacity-80 pointer-events-none",
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";
