
import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode
  children: React.ReactNode
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn("", className)}
        {...props}
      >
        <span className="flex items-center gap-2">
          {icon}
          <span>{children}</span>
        </span>
      </Button>
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton }
