"use client";

import { useState, useEffect } from "react";
import { Send, User, Mail, MessageCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (data: FormData) => void;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (errors.submit) {
      setErrors((prev) => ({ ...prev, submit: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (
        !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      ) {
        throw new Error("EmailJS configuration is missing");
      }

      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      emailjs.init("IWbJi61y2ImX6-lKU");
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setErrors({});
      onSubmit(formData);
      setFormData({ name: "", email: "", message: "" });

      toast.success("Message sent!", {
        description: "Thanks for reaching out. I'll get back to you soon.",
        duration: 4000,
      });
    } catch (error) {
      console.error("Failed to send email:", error);

      toast.error("Failed to send message", {
        description: "Please try again or contact me directly.",
        duration: 5000,
      });

      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3.5 bg-transparent border rounded-xl text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all duration-300 outline-none text-sm";

  const getInputClass = (field: string) => {
    if (errors[field]) return `${inputBase} border-red-400 dark:border-red-500`;
    if (focusedField === field)
      return `${inputBase} border-blue-400 dark:border-blue-500 shadow-sm shadow-blue-500/10`;
    return `${inputBase} border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Email row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User size={12} />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className={getInputClass("name")}
              placeholder="Your name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Mail size={12} />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={getInputClass("email")}
              placeholder="mail@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MessageCircle size={12} />
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            rows={5}
            className={`${getInputClass("message")} resize-none`}
            placeholder="Tell me about your project, idea, or just say hi..."
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-1.5">
            {errors.message ? (
              <p className="text-red-500 text-xs">{errors.message}</p>
            ) : (
              <div />
            )}
            <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600">
              {formData.message.length}/500
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3.5 px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            isSubmitting
              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
              : "hue-cycle-submit text-white active:scale-[0.97] shadow-lg shadow-black/10"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
