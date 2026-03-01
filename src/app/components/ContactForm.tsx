import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { User, Mail as MailIcon, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { InputField } from './InputField';
import { TextareaField } from './TextareaField';

/**
 * Contact Form Data Type
 */
interface ContactFormData {
  name: string;
  // email: string;
  message: string;
}

/**
 * Form Validation Errors Type
 */
interface FormErrors {
  name?: string;
  // email?: string;
  message?: string;
}

/**
 * Contact Form Component
 * 
 * Features:
 * - Field validation (required fields + email format)
 * - Loading state during submission
 * - Success/error feedback messages
 * - Smooth animations
 * - Fully responsive
 * - Accessible
 * 
 * Note: This is a frontend-only implementation.
 * Form submission is simulated with setTimeout.
 * 
 * To implement real submission:
 * 1. Replace simulateSubmission with actual API call
 * 2. Add backend endpoint (e.g., Discord webhook via server)
 * 3. Handle real errors and responses
 */
export function ContactForm() {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    // email: '',
    message: '',
  });

  // Validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  /**
   * Validate form fields
   * Returns true if valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate email
    // if (!formData.email.trim()) {
    //   newErrors.email = 'Email is required';
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   newErrors.email = 'Please enter a valid email address';
    // }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Simulate form submission
   * In production, this would be an actual API call
   */
  const simulateSubmission = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% of the time)
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Simulated network error'));
        }
      }, 2000); // 2 second delay to simulate network request
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous status
    setSubmitStatus('idle');

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Start submission
    setIsSubmitting(true);

    try {
      // Simulate submission (replace with real API call)
      await simulateSubmission();

      // Success
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        // email: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      // Error
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle input changes
   */
  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Name Field */}
      <InputField
        label="Your Name"
        type="text"
        icon={User}
        placeholder="Vo Van Duy"
        value={formData.name}
        onChange={handleChange('name')}
        error={errors.name}
        required
        disabled={isSubmitting}
      />

      {/* Email Field */}
      {/* <InputField
        label="Email Address"
        type="email"
        icon={MailIcon}
        placeholder="john.doe@example.com"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        required
        disabled={isSubmitting}
      /> */}

      {/* Message Field */}
      <TextareaField
        label="Your Message"
        icon={MessageSquare}
        placeholder="Tell me about your project, idea, or just say hi..."
        value={formData.message}
        onChange={handleChange('message')}
        error={errors.message}
        required
        rows={6}
        disabled={isSubmitting}
      />

      {/* Success Message */}
      {submitStatus === 'success' && (
        <motion.div
          className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
          <div>
            <p className="font-medium text-green-900">Message sent successfully!</p>
            <p className="text-sm text-green-700">Thank you for reaching out. I'll get back to you soon.</p>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <motion.div
          className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <div>
            <p className="font-medium text-red-900">Failed to send message</p>
            <p className="text-sm text-red-700">Please try again or contact me directly via email.</p>
          </div>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full flex items-center justify-center gap-2
          px-6 py-3 rounded-lg
          font-medium text-white
          transition-all duration-200
          ${isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'
          }
        `}
        whileHover={isSubmitting ? {} : { scale: 1.02 }}
        whileTap={isSubmitting ? {} : { scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </motion.button>

      {/* Disclaimer */}
      {/* <p className="text-xs text-gray-500 text-center">
        This is a frontend demo. Messages are not actually sent.
        <br />
        In production, this would connect to a secure backend service.
      </p> */}
    </motion.form>
  );
}
