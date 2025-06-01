
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles - Dubai Government standard
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ehrdc-teal text-white hover:bg-ehrdc-dark-teal shadow-md hover:shadow-lg focus-visible:ring-ehrdc-teal/20",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg",
        outline: "border-2 border-ehrdc-teal bg-white text-ehrdc-teal hover:bg-ehrdc-teal hover:text-white shadow-sm hover:shadow-md",
        secondary: "bg-ehrdc-neutral-light text-ehrdc-neutral-dark hover:bg-ehrdc-neutral-light/80 shadow-sm hover:shadow-md",
        ghost: "text-ehrdc-teal hover:bg-ehrdc-teal/10 hover:text-ehrdc-dark-teal",
        link: "text-ehrdc-teal underline-offset-4 hover:underline hover:text-ehrdc-dark-teal",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
