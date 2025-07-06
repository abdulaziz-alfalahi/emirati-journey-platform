import React from 'react';
import { useEHRDC } from './EHRDCProvider';

export const EHRDCCard = ({ 
  children, 
  variant = 'default',
  className = '',
  header = null,
  footer = null,
  icon = null,
  title = null,
  subtitle = null,
  hoverable = true,
  ...props 
}) => {
  const { preferences } = useEHRDC();

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-br from-[var(--ehrdc-primary)] to-[var(--ehrdc-primary-dark)] text-white border-transparent';
      case 'secondary':
        return 'bg-gradient-to-br from-[var(--dubai-primary)] to-[var(--dubai-primary-dark)] text-white border-transparent';
      case 'outline':
        return 'bg-transparent border-2 border-[var(--ehrdc-primary)] text-[var(--ehrdc-primary)]';
      case 'ghost':
        return 'bg-[var(--ehrdc-primary-50)] border-transparent text-[var(--ehrdc-primary)]';
      case 'elevated':
        return 'bg-white border-transparent shadow-lg';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  const baseClasses = `
    rounded-lg p-6 transition-all duration-300 ease-in-out
    ${hoverable ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
    ${getVariantClasses()}
  `;

  return (
    <div
      className={`${baseClasses} ${className}`}
      dir={preferences.textDirection}
      {...props}
    >
      {/* Header Section */}
      {(header || icon || title || subtitle) && (
        <div className="mb-4">
          {header && header}
          {!header && (icon || title || subtitle) && (
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              {icon && (
                <div className="flex-shrink-0">
                  <span className="material-icons text-2xl">{icon}</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                {title && (
                  <h3 className="text-lg font-semibold leading-6 mb-1">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm opacity-75">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

// Specialized EHRDC Card Components
export const EHRDCStatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon, 
  className = '' 
}) => {
  const { preferences } = useEHRDC();

  const changeColor = changeType === 'positive' ? 'text-green-600' : 
                     changeType === 'negative' ? 'text-red-600' : 'text-gray-600';

  return (
    <EHRDCCard 
      variant="elevated" 
      hoverable={false}
      className={`text-center ${className}`}
    >
      <div className="flex items-center justify-center mb-3">
        {icon && (
          <div className="p-3 bg-[var(--ehrdc-primary-50)] rounded-full">
            <span className="material-icons text-[var(--ehrdc-primary)] text-xl">
              {icon}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className={`text-xs ${changeColor} flex items-center justify-center`}>
            <span className="material-icons text-sm mr-1">
              {changeType === 'positive' ? 'trending_up' : 
               changeType === 'negative' ? 'trending_down' : 'trending_flat'}
            </span>
            {change}
          </p>
        )}
      </div>
    </EHRDCCard>
  );
};

export const EHRDCActionCard = ({ 
  title, 
  description, 
  action, 
  actionText, 
  icon, 
  variant = 'default',
  className = '' 
}) => {
  return (
    <EHRDCCard 
      variant={variant}
      icon={icon}
      title={title}
      className={className}
    >
      <p className="text-sm mb-4 opacity-90">
        {description}
      </p>
      
      <div className="flex justify-end">
        {action}
      </div>
    </EHRDCCard>
  );
};

export const EHRDCProgressCard = ({ 
  title, 
  progress, 
  total, 
  description, 
  icon,
  className = '' 
}) => {
  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;

  return (
    <EHRDCCard 
      variant="default"
      icon={icon}
      title={title}
      className={className}
    >
      <div className="space-y-3">
        <p className="text-sm text-gray-600">{description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{progress} of {total}</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[var(--ehrdc-primary)] h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </EHRDCCard>
  );
};

// Dubai Design System Card Integration
export const DubaiCard = ({ 
  children, 
  className = '',
  elevation = 'default',
  ...props 
}) => {
  const { preferences } = useEHRDC();

  const getElevationClasses = () => {
    switch (elevation) {
      case 'none':
        return 'shadow-none';
      case 'sm':
        return 'shadow-sm';
      case 'md':
        return 'shadow-md';
      case 'lg':
        return 'shadow-lg';
      case 'xl':
        return 'shadow-xl';
      default:
        return 'shadow';
    }
  };

  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200 p-6
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:-translate-y-1
        ${getElevationClasses()}
        ${className}
      `}
      dir={preferences.textDirection}
      {...props}
    >
      {children}
    </div>
  );
};

