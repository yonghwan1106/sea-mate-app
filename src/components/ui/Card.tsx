'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'safety' | 'subtle' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: 'none' | 'default' | 'accent' | 'danger' | 'warning' | 'success';
  hover?: boolean;
}

const variantStyles = {
  default: 'glass-card',
  safety: 'safety-card',
  subtle: 'glass-card-subtle',
  interactive: 'glass-card-interactive',
};

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const borderStyles = {
  none: '',
  default: 'border border-white/10',
  accent: 'border-2 border-cyan-500/50',
  danger: 'border-2 border-red-500/50',
  warning: 'border-2 border-orange-500/50',
  success: 'border-2 border-green-500/50',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      border = 'none',
      hover = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${borderStyles[border]}
          ${hover ? 'hover:bg-white/12 transition-colors' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// 카드 헤더
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  action?: ReactNode;
}

export function CardHeader({ icon, title, action, className = '', ...props }: CardHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`} {...props}>
      <h3 className="font-bold flex items-center gap-2">
        {icon && <span aria-hidden="true">{icon}</span>}
        {title}
      </h3>
      {action}
    </div>
  );
}

// 카드 콘텐츠
export function CardContent({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export default Card;
