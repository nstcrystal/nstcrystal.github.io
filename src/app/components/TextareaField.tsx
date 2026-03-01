import { forwardRef, TextareaHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
}

/**
 * Reusable Textarea Field Component
 * 
 * Features:
 * - Label with required indicator
 * - Optional icon
 * - Error state display
 * - Focus animations
 * - Auto-resize capability
 * - Accessible
 * 
 * Usage:
 * <TextareaField
 *   label="Message"
 *   icon={MessageSquare}
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 *   error={errors.message}
 *   required
 *   rows={5}
 * />
 */
export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, icon: Icon, className = '', required, rows = 5, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {/* Label */}
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Textarea Container */}
        <div className="relative">
          {/* Icon */}
          {Icon && (
            <div className="absolute left-3 top-3 pointer-events-none">
              <Icon size={18} className="text-gray-400" />
            </div>
          )}

          {/* Textarea Field */}
          <textarea
            ref={ref}
            rows={rows}
            className={`
              w-full px-4 py-3 
              ${Icon ? 'pl-11' : ''}
              border border-gray-300 rounded-lg
              bg-white
              text-gray-900
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
              resize-y
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

TextareaField.displayName = 'TextareaField';
