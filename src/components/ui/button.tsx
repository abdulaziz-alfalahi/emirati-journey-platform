
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  // Base styles - Dubai Government standard with shine animation support
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        // Primary button with shine effect
        default: "bg-ehrdc-teal text-white hover:bg-ehrdc-dark-teal shadow-md hover:shadow-lg focus-visible:ring-ehrdc-teal/20 before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-[100%]",
        
        // Secondary button
        secondary: "bg-ehrdc-neutral-light text-ehrdc-neutral-dark hover:bg-ehrdc-neutral-light/80 shadow-sm hover:shadow-md focus-visible:ring-ehrdc-neutral-dark/20",
        
        // Outline button
        outline: "border-2 border-ehrdc-teal bg-white text-ehrdc-teal hover:bg-ehrdc-teal hover:text-white shadow-sm hover:shadow-md focus-visible:ring-ehrdc-teal/20",
        
        // Ghost/Text button
        ghost: "text-ehrdc-teal hover:bg-ehrdc-teal/10 hover:text-ehrdc-dark-teal focus-visible:ring-ehrdc-teal/20",
        
        // Link button
        link: "text-ehrdc-teal underline-offset-4 hover:underline hover:text-ehrdc-dark-teal focus-visible:ring-ehrdc-teal/20",
        
        // Destructive button
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg focus-visible:ring-red-500/20",
        
        // Success button
        success: "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg focus-visible:ring-green-600/20",
        
        // Warning button
        warning: "bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg focus-visible:ring-orange-500/20",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        xl: "h-16 px-10 py-5 text-lg",
        icon: "h-12 w-12",
        "icon-sm": "h-10 w-10",
        "icon-lg": "h-14 w-14",
      },
      loading: {
        true: "cursor-not-allowed",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, loadingText, asChild = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText || "Loading..."}
          </>
        )}
        {!loading && children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
