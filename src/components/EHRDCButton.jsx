import React from 'react';
import { useEHRDC } from './EHRDCProvider';

export const EHRDCButton = ({ 
  children, 
  variant = 'primary', 
  size = 'default',
  icon = null,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props 
}) => {
  const { preferences } = useEHRDC();

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[var(--ehrdc-primary)] hover:bg-[var(--ehrdc-primary-dark)] text-white border-transparent';
      case 'secondary':
        return 'bg-[var(--dubai-primary)] hover:bg-[var(--dubai-primary-dark)] text-white border-transparent';
      case 'outline':
        return 'bg-transparent hover:bg-[var(--ehrdc-primary)] hover:text-white text-[var(--ehrdc-primary)] border-[var(--ehrdc-primary)]';
      case 'ghost':
        return 'bg-transparent hover:bg-[var(--ehrdc-primary-50)] text-[var(--ehrdc-primary)] border-transparent';
      case 'destructive':
        return 'bg-red-600 hover:bg-red-700 text-white border-transparent';
      default:
        return 'bg-[var(--ehrdc-primary)] hover:bg-[var(--ehrdc-primary-dark)] text-white border-transparent';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-9 px-3 text-sm';
      case 'lg':
        return 'h-12 px-8 text-lg';
      case 'icon':
        return 'h-10 w-10 p-0';
      default:
        return 'h-10 px-4 py-2';
    }
  };

  const baseClasses = `
    inline-flex items-center justify-center whitespace-nowrap rounded-md 
    font-medium transition-all duration-300 ease-in-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ehrdc-primary)] focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    dubai-touch-target
    transform hover:-translate-y-0.5 active:translate-y-0
    border
  `;

  const iconElement = icon && (
    <span className={`material-icons ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-xl' : 'text-base'}`}>
      {icon}
    </span>
  );

  const loadingElement = loading && (
    <span className="material-icons animate-spin mr-2">refresh</span>
  );

  return (
    <button
      className={`
        ${baseClasses}
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${loading ? 'cursor-wait' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      dir={preferences.textDirection}
      {...props}
    >
      {loading && loadingElement}
      {!loading && icon && iconPosition === 'left' && (
        <span className={children ? (preferences.textDirection === 'rtl' ? 'ml-2' : 'mr-2') : ''}>
          {iconElement}
        </span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className={children ? (preferences.textDirection === 'rtl' ? 'mr-2' : 'ml-2') : ''}>
          {iconElement}
        </span>
      )}
    </button>
  );
};

// Dubai Design System Button Integration
export const DubaiButton = ({ 
  children, 
  button_color = 'default-primary',
  start_icon = null,
  end_icon = null,
  custom_class = '',
  component_mode = '',
  button_id = '',
  aria_label = '',
  onClick,
  ...props 
}) => {
  const { preferences } = useEHRDC();

  const getColorClasses = () => {
    switch (button_color) {
      case 'default-primary':
        return 'bg-[var(--ehrdc-primary)] hover:bg-[var(--ehrdc-primary-dark)] text-white';
      case 'default-secondary':
        return 'bg-[var(--dubai-primary)] hover:bg-[var(--dubai-primary-dark)] text-white';
      case 'outline-primary':
        return 'bg-transparent border-2 border-[var(--ehrdc-primary)] text-[var(--ehrdc-primary)] hover:bg-[var(--ehrdc-primary)] hover:text-white';
      case 'outline-secondary':
        return 'bg-transparent border-2 border-[var(--dubai-primary)] text-[var(--dubai-primary)] hover:bg-[var(--dubai-primary)] hover:text-white';
      default:
        return 'bg-[var(--ehrdc-primary)] hover:bg-[var(--ehrdc-primary-dark)] text-white';
    }
  };

  return (
    <button
      id={button_id}
      aria-label={aria_label}
      className={`
        inline-flex items-center justify-center
        px-4 py-2 rounded-md font-medium
        transition-all duration-300 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ehrdc-primary)] focus-visible:ring-offset-2
        dubai-touch-target
        transform hover:-translate-y-0.5 active:translate-y-0
        ${getColorClasses()}
        ${custom_class}
      `}
      onClick={onClick}
      dir={preferences.textDirection}
      {...props}
    >
      {start_icon && (
        <span className={`material-icons ${children ? (preferences.textDirection === 'rtl' ? 'ml-2' : 'mr-2') : ''}`}>
          {start_icon}
        </span>
      )}
      {children}
      {end_icon && (
        <span className={`material-icons ${children ? (preferences.textDirection === 'rtl' ? 'mr-2' : 'ml-2') : ''}`}>
          {end_icon}
        </span>
      )}
    </button>
  );
};

