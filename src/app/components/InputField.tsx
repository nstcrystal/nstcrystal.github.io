import { forwardRef, InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
}

/**
 * Reusable Input Field Component
 * 
 * Features:
 * - Label with required indicator
 * - Optional icon
 * - Error state display
 * - Focus animations
 * - Accessible
 * 
 * Usage:
 * <InputField
 *   label="Name"
 *   icon={User}
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 *   error={errors.name}
 *   required
 * />
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, icon: Icon, className = '', required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {/* Label */}
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Input Container */}
        <div className="relative">
          {/* Icon */}
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon size={18} className="text-gray-400" />
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 
              ${Icon ? 'pl-11' : ''}
              border border-gray-300 rounded-lg
              bg-white
              text-gray-900
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="text-red-500">⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
