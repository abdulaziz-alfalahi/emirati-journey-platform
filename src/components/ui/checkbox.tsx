
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Base styles - Dubai Government standard
      "peer h-5 w-5 shrink-0 rounded border-2 border-ehrdc-neutral-light bg-white",
      "ring-offset-background transition-all duration-200",
      
      // Focus states with EHRDC teal
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ehrdc-teal/20",
      "focus-visible:ring-offset-2",
      
      // Hover states
      "hover:border-ehrdc-teal/50",
      
      // Checked states
      "data-[state=checked]:bg-ehrdc-teal data-[state=checked]:border-ehrdc-teal",
      "data-[state=checked]:text-white",
      
      // Disabled states
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:disabled:bg-ehrdc-neutral-light",
      
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
