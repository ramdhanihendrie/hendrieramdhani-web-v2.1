import { Label } from "@headlessui/react"
import { HTMLAttributes, ReactNode } from "react";

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const label = ({ children, className = '', ...props }: LabelProps) => {
  return (
    <Label 
      className={`label-text mt-3 ${className}`} 
      {...props}
    >
      {children}
    </Label>
  )
}

export default label