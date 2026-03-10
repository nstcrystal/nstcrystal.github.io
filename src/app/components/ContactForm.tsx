import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import { motion } from "motion/react";
import {
  User,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { InputField } from "./InputField";

/**
 * Contact Form Data Type (Simplified)
 */
interface ContactFormData {
  name: string;
  message: string;
}

/**
 * Form Validation Errors Type
 */
interface FormErrors {
  name?: string;
  message?: string;
}

export function ContactForm() {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    message: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Textarea ref for auto-resize
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Auto-resize textarea based on content
   * This runs whenever the message changes
   */
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";

      // Set height to scrollHeight (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formData.message]);

  /**
   * Validate form fields
   * Returns true if valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Simulate form submission
   * In production, this would be an actual API call
   */
  // const simulateSubmission = async (): Promise<void> => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       // Simulate success (90% of the time)
  //       if (Math.random() > 0.1) {
  //         resolve();
  //       } else {
  //         reject(new Error("Simulated network error"));
  //       }
  //     }, 2000); // 2 second delay to simulate network request
  //   });
  // };

  const sendMessage = async (data: ContactFormData) => {

    const response = await fetch("https://webhook-discord-qtkh.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "API error");
    }

    return result;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitStatus("idle");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await sendMessage(formData);

      setSubmitStatus("success");

      setFormData({
        name: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);

      // console.log("success");
    } catch (error) {
      setSubmitStatus("error");

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);

      // console.log("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle name input change
   */
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));

    // Clear error for name when user starts typing
    if (errors.name) {
      setErrors((prev) => ({
        ...prev,
        name: undefined,
      }));
    }
  };

  /**
   * Handle message textarea change
   */
  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      message: e.target.value,
    }));

    // Clear error for message when user starts typing
    if (errors.message) {
      setErrors((prev) => ({
        ...prev,
        message: undefined,
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
        onChange={handleNameChange}
        error={errors.name}
        required
        disabled={isSubmitting}
      />

      {/* Message Field (Auto-resizing Textarea) */}
      <div className="space-y-2">
        {/* Label */}
        <label className="block text-sm font-medium text-gray-700">
          Your Message
          <span className="text-red-500 ml-1">*</span>
        </label>

        {/* Textarea Container */}
        <div className="relative">
          {/* Icon */}
          <div className="absolute left-3 top-3 pointer-events-none">
            <MessageSquare size={18} className="text-gray-400" />
          </div>

          {/* Auto-resizing Textarea */}
          <textarea
            ref={textareaRef}
            placeholder="Tell me about your project, idea, or just say hi..."
            value={formData.message}
            onChange={handleMessageChange}
            disabled={isSubmitting}
            className={`
              w-full px-4 py-3 pl-11
              border border-gray-300 rounded-lg
              bg-white
              text-gray-900
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
              resize-none
              overflow-hidden
              min-h-[120px]
              ${errors.message ? "border-red-500 focus:ring-red-500" : ""}
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
            `}
            style={{
              maxHeight: "300px", // Maximum height before scrolling
            }}
          />
        </div>

        {/* Character Count (Optional) */}
        <div className="flex justify-between items-center">
          {/* Error Message */}
          {errors.message ? (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <span className="text-red-500">⚠</span>
              {errors.message}
            </p>
          ) : (
            <span /> // Empty span for flex spacing
          )}

          {/* Character Counter */}
          <p
            className={`text-xs ${
              formData.message.length > 1000 ? "text-red-600" : "text-gray-500"
            }`}
          >
            {formData.message.length}/1000
          </p>
        </div>
      </div>

      {/* Success Message */}
      {submitStatus === "success" && (
        <motion.div
          className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
          <div>
            <p className="font-medium text-green-900">
              Message sent successfully!
            </p>
            <p className="text-sm text-green-700">
              Thank you for reaching out. I'll get back to you soon.
            </p>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <motion.div
          className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <div>
            <p className="font-medium text-red-900">Failed to send message</p>
            <p className="text-sm text-red-700">
              Please try again or contact me directly via social media.
            </p>
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
          ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95"
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
    </motion.form>
  );
}
