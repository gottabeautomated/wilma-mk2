import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "wedding";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      className, 
      variant = "primary", 
      size = "md", 
      isLoading = false,
      disabled,
      children,
      ...props 
    }, 
    ref
  ) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          // Variants
          {
            "bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-500": variant === "primary",
            "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-300": variant === "secondary",
            "border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-300": variant === "outline",
            "bg-transparent hover:bg-gray-100 focus-visible:ring-gray-300": variant === "ghost",
            "underline-offset-4 hover:underline text-purple-600 focus-visible:ring-purple-500": variant === "link",
            "bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600 focus-visible:ring-purple-500": variant === "wedding",
          },
          // Sizes
          {
            "h-9 px-3 text-sm": size === "sm",
            "h-10 px-4": size === "md",
            "h-11 px-6 text-lg": size === "lg",
          },
          // Loading state
          {
            "cursor-not-allowed": isLoading,
          },
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
