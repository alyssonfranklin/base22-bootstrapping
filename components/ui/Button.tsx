import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'button',
        `button-${variant}`,
        `button-${size}`,
        className
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
