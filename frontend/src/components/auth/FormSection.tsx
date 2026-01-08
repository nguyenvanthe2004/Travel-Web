import { ArrowLeft, Lock, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, forgotPasswordCode } from "../../services/auth";

const FormSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({ email: "", code: "" });
  const [touched, setTouched] = useState({ email: false, code: false });
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (value: string): string => {
    if (!value) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateCode = (value: string): string => {
    if (!value) {
      return "Verification code is required";
    }
    if (value.length !== 6) {
      return "Code must be 6 digits";
    }
    if (!/^\d+$/.test(value)) {
      return "Code must contain only numbers";
    }
    return "";
  };

  // Handle changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);
    if (touched.code) {
      setErrors((prev) => ({ ...prev, code: validateCode(value) }));
    }
  };

  // Handle blur
  const handleBlur = (field: "email" | "code") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else {
      setErrors((prev) => ({ ...prev, code: validateCode(code) }));
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const emailError = validateEmail(email);
    setErrors({ email: emailError, code: "" });
    setTouched({ email: true, code: false });

    if (emailError) {
      return;
    }

    try {
      await forgotPasswordCode(email);
      setShowCodeInput(true);
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        email: err?.message || "Failed to send code. Please try again.",
      }));
    }
  };

  const handleSendPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate code
    const codeError = validateCode(code);
    setErrors((prev) => ({ ...prev, code: codeError }));
    setTouched((prev) => ({ ...prev, code: true }));

    if (codeError) {
      return;
    }

    try {
      await forgotPassword(email, code);
      alert("Password sent successfully!")
      navigate("/login");
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        code: err?.message || "Invalid verification code. Please try again.",
      }));
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col px-6 py-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 bg-[#fcfaf8]">
      <header className="mb-8 sm:mb-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-[#f8941f] w-8 h-8 sm:w-10 sm:h-10">
            <img src="/icons/logo.svg" alt="" />
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Vista Stays
          </span>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto lg:mx-0 py-8 sm:py-12">
        {/* Icon & Heading */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#f8941f]/10 text-[#f8941f] mb-6 shadow-sm ring-1 ring-[#f8941f]/20">
            <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black leading-tight tracking-tight mb-4 text-gray-900">
            Forgot your password?
          </h1>
          <p className="text-[#9c7349] text-base sm:text-lg leading-relaxed">
            Don't worry, it happens. Enter your email associated with your
            account and we'll send you a reset link.
          </p>
        </div>

        {/* Input Form */}
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              className="text-sm sm:text-base font-bold text-gray-900"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                className={`w-full h-14 pl-12 pr-4 rounded-xl border bg-white text-base placeholder-[#9c7349]/70 focus:outline-none focus:ring-4 transition-all shadow-sm ${
                  touched.email && errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-gray-300 focus:border-[#f8941f] focus:ring-[#f8941f]/10"
                }`}
                id="email"
                placeholder="e.g., alex@example.com"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur("email")}
              />
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                touched.email && errors.email ? "text-red-500" : "text-[#9c7349]"
              }`}>
                <Mail className="w-5 h-5" />
              </div>
            </div>
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {showCodeInput && (
            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base font-bold text-gray-900">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={handleCodeChange}
                onBlur={() => handleBlur("code")}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className={`w-full h-14 px-4 rounded-xl border bg-white text-base focus:outline-none focus:ring-4 transition-all shadow-sm ${
                  touched.code && errors.code
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-[#f8941f] focus:border-[#f8941f] focus:ring-[#f8941f]/10"
                }`}
              />
              {touched.code && errors.code ? (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.code}
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  We have sent a verification code to your email
                </p>
              )}
            </div>
          )}

          <button
            onClick={showCodeInput ? handleSendPassword : handleSendCode}
            type="submit"
            className="w-full h-14 rounded-xl bg-[#f8941f] hover:bg-orange-600 text-white text-base font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {showCodeInput ? "Reset Password" : "Send Verification Code"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <button
            onClick={handleBackToLogin}
            type="button"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9c7349] hover:text-[#f8941f] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </button>
        </div>
      </main>

      <footer className="mt-auto pt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-[#9c7349]/80">
        <a className="hover:text-[#f8941f] transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-[#f8941f] transition-colors" href="#">
          Terms of Service
        </a>
        <span className="hidden sm:inline-block ml-auto opacity-50">
          © 2024 TravelApp Inc.
        </span>
      </footer>
    </div>
  );
};
export default FormSection;