import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "bg-blue-500 text-white hover:bg-blue-600",
        "h-10 px-4 py-2",
        "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }