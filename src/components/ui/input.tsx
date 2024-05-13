import { Input } from "@headlessui/react"
import { forwardRef, HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  type?: string
  className?: string
  name?: string
}

const input = forwardRef<HTMLInputElement, InputProps>(({ className = '', type='text', onChange, onBlur, name, ...props }, ref) => (
  <Input 
    name={name}
    ref={ref}
    onChange={onChange}
    onBlur={onBlur}
    className={`input input-bordered w-full ${className}`}
    type={type}
    {...props}
  />
));

export default input