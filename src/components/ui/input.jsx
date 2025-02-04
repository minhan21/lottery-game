import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300",
        "bg-white px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "placeholder:text-gray-500",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }