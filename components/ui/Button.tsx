import { ReactNode, forwardRef, ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import Link from 'next/link';

// Enhanced Button Props with better type safety and accessibility
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  // Accessibility props
  ariaLabel?: string;
  ariaDescribedby?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  {
    children,
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    disabled = false,
    leadingIcon,
    trailingIcon,
    href,
    target,
    rel,
    type = 'button',
    onClick,
    ariaLabel,
    ariaDescribedby,
    ...rest
  }, 
  ref
) => {
  // Common classNames for button styling
  const buttonClasses = clsx(
    'button',
    `button-${variant}`,
    `button-${size}`,
    fullWidth && 'w-full',
    isLoading && 'button-loading',
    'focus-ring',
    'interactive-active',
    'touch-target',
    className
  );

  // Determine whether to use button or link based on href
  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        onClick={!disabled ? onClick : undefined}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      >
        {isLoading && (
          <span className="loading-spinner mr-2" aria-hidden="true">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        {leadingIcon && !isLoading && <span className="button-icon button-icon-leading">{leadingIcon}</span>}
        <span className="button-text">{children}</span>
        {trailingIcon && <span className="button-icon button-icon-trailing">{trailingIcon}</span>}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={buttonClasses}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading && (
        <span className="loading-spinner mr-2" aria-hidden="true">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      {leadingIcon && !isLoading && <span className="button-icon button-icon-leading">{leadingIcon}</span>}
      <span className="button-text">{children}</span>
      {trailingIcon && <span className="button-icon button-icon-trailing">{trailingIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;