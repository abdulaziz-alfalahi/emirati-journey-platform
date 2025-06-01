
import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Info } from "lucide-react"

interface FormFieldProps {
  children: React.ReactNode
  label?: string
  description?: string
  error?: string
  success?: string
  required?: boolean
  className?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, label, description, error, success, required, className, ...props }, ref) => {
    const fieldId = React.useId()
    
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && (
          <Label 
            htmlFor={fieldId}
            className={cn(
              "text-sm font-medium text-ehrdc-neutral-dark",
              error && "text-red-600",
              success && "text-green-600"
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        
        {description && (
          <p className="text-sm text-ehrdc-neutral-dark/70 flex items-start gap-1">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            {description}
          </p>
        )}
        
        <div className="relative">
          {React.cloneElement(children as React.ReactElement, {
            id: fieldId,
            'aria-describedby': error ? `${fieldId}-error` : success ? `${fieldId}-success` : description ? `${fieldId}-description` : undefined,
            'aria-invalid': error ? 'true' : 'false',
            className: cn(
              (children as React.ReactElement).props.className,
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              success && "border-green-500 focus:border-green-500 focus:ring-green-500/20"
            )
          })}
        </div>
        
        {error && (
          <p 
            id={`${fieldId}-error`}
            className="text-sm text-red-600 flex items-start gap-1"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            {error}
          </p>
        )}
        
        {success && !error && (
          <p 
            id={`${fieldId}-success`}
            className="text-sm text-green-600 flex items-start gap-1"
          >
            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            {success}
          </p>
        )}
      </div>
    )
  }
)
FormField.displayName = "FormField"

export { FormField }
