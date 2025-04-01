import { ReactNode, forwardRef, HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import Link from 'next/link';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  href?: string;
  interactive?: boolean;
  footer?: ReactNode;
  headerAction?: ReactNode;
  bordered?: boolean;
  isLoading?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>((
  {
    children,
    className,
    title,
    subtitle,
    titleAs = 'h2',
    elevation = 'sm',
    href,
    interactive = false,
    footer,
    headerAction,
    bordered = false,
    isLoading = false,
    ...rest
  },
  ref
) => {
  // Define styles based on props
  const cardClasses = clsx(
    'card',
    `elevation-${elevation}`,
    bordered && 'card-bordered',
    interactive && 'interactive-hover',
    interactive && 'focus-ring',
    isLoading && 'opacity-75',
    className
  );

  // Card content
  const TitleComponent = titleAs;
  
  const cardContent = (
    <>
      {/* Card Header */}
      {(title || headerAction) && (
        <div className="card-header">
          <div className="card-header-content">
            {title && (
              <TitleComponent className="card-title">
                {title}
              </TitleComponent>
            )}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {headerAction && <div className="card-header-action">{headerAction}</div>}
        </div>
      )}

      {/* Card Body */}
      <div className="card-content">
        {isLoading ? (
          <div className="card-skeleton" aria-hidden="true">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-3/4 mt-2"></div>
            <div className="skeleton h-4 w-1/2 mt-2"></div>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Card Footer */}
      {footer && <div className="card-footer">{footer}</div>}
    </>
  );

  // For interactive cards with href, render as a link
  if (href) {
    return (
      <Link 
        href={href} 
        className={cardClasses}
        tabIndex={0}
        aria-labelledby={title ? 'card-title' : undefined}
      >
        {cardContent}
      </Link>
    );
  }

  // For non-interactive cards
  return (
    <div 
      ref={ref} 
      className={cardClasses}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    >
      {cardContent}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;