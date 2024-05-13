import { HTMLAttributes, ReactNode } from "react";

interface InputErrorProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const inputError = ({ children, className = '', ...props }: InputErrorProps) => {
  return (
    <div 
      className={`text-error text-xs ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export default inputError