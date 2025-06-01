
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles - Dubai Government standard
          "flex h-12 w-full rounded-lg border border-ehrdc-neutral-light bg-white px-4 py-3",
          "text-base text-ehrdc-neutral-dark placeholder:text-ehrdc-neutral-dark/50",
          "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
          
          // Focus states with EHRDC teal
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ehrdc-teal/20",
          "focus-visible:border-ehrdc-teal transition-all duration-200",
          
          // Hover states
          "hover:border-ehrdc-teal/50",
          
          // Disabled states
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-ehrdc-neutral-light/50",
          
          // Size variants for mobile
          "md:text-sm md:h-10",
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
