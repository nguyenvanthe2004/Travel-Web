import { Eye, EyeOff, Mail, Shield, User } from "lucide-react";
import React, { useState } from "react";
import { callRegister, verifyEmail } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const RightSide: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    code: false,
  });
  const navigate = useNavigate();

  // Validation functions
  const validateFullName = (value: string): string => {
    if (!value.trim()) {
      return "Full name is required";
    }
    if (value.trim().length < 2) {
      return "Full name must be at least 2 characters";
    }
    return "";
  };

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

  const validatePassword = (value: string): string => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const validateConfirmPassword = (value: string): string => {
    if (!value) {
      return "Please confirm your password";
    }
    if (value !== password) {
      return "Passwords do not match";
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
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    if (touched.fullName) {
      setErrors((prev) => ({ ...prev, fullName: validateFullName(value) }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
    // Also revalidate confirm password if it's been touched
    if (touched.confirmPassword && confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value !== confirmPassword ? "Passwords do not match" : "",
      }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
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
  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    switch (field) {
      case "fullName":
        setErrors((prev) => ({ ...prev, fullName: validateFullName(fullName) }));
        break;
      case "email":
        setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
        break;
      case "password":
        setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
        break;
      case "confirmPassword":
        setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(confirmPassword) }));
        break;
      case "code":
        setErrors((prev) => ({ ...prev, code: validateCode(code) }));
        break;
    }
  };

  const handleRegisterCode = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    setErrors({
      fullName: fullNameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      code: "",
    });

    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      code: false,
    });

    // If there are errors, don't submit
    if (fullNameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    try {
      await callRegister({ fullName, email, password });
      setShowCodeInput(true);
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        email: err?.message || "An unexpected error occurred",
      }));
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    const codeError = validateCode(code);
    setErrors((prev) => ({ ...prev, code: codeError }));
    setTouched((prev) => ({ ...prev, code: true }));

    if (codeError) {
      return;
    }

    try {
      await verifyEmail(email, code);
      navigate("/login");
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        code: err?.message || "Invalid verification code",
      }));
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-12 lg:px-16 xl:px-24 bg-white overflow-y-auto">
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Create an account
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Enter your details to unlock exclusive hotel deals.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4 sm:space-y-5">
          <div className="space-y-4 sm:space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={handleFullNameChange}
                  onBlur={() => handleBlur("fullName")}
                  placeholder="Jane Doe"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                    touched.fullName && errors.fullName
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  }`}
                />
                <User className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                  touched.fullName && errors.fullName ? "text-red-500" : "text-orange-500"
                }`} />
              </div>
              {touched.fullName && errors.fullName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => handleBlur("email")}
                  placeholder="jane@example.com"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                    touched.email && errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  }`}
                />
                <Mail className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur("password")}
                    placeholder="••••••••"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                      touched.password && errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="••••••••"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                      touched.confirmPassword && errors.confirmPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {showCodeInput && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  onBlur={() => handleBlur("code")}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                    touched.code && errors.code
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-orange-500 focus:ring-1 focus:ring-orange-500"
                  }`}
                />
                {touched.code && errors.code ? (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.code}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    We have sent a verification code to your email
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={showCodeInput ? handleVerifyCode : handleRegisterCode}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors shadow-sm text-sm sm:text-base"
            >
              {showCodeInput ? "Verify & Create Account" : "Create Account"}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-6 sm:my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-3 sm:px-4 bg-white text-gray-500">
              Or register with
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button className="flex items-center justify-center py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <img src="/icons/google.svg" alt="" />
          </button>
          <button className="flex items-center justify-center py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <img src="/icons/facebook.svg" alt="" />
          </button>
        </div>

        {/* Footer Trust Badge */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
          <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="text-center">
            Your data is permanently secured and encrypted
          </span>
        </div>
      </div>
    </div>
  );
};
export default RightSide;