"use client";

import { Eye, EyeOff, Mail, Shield, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { callRegister, callVerifyEmail } from "../../services/auth";
import {
  registerSchema,
  verifyCodeSchema,
  type RegisterFormData,
  type VerifyCodeFormData,
} from "../../validations/auth";
import { toastError, toastSuccess } from "../../lib/toast";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [emailForVerify, setEmailForVerify] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmitRegister = async (data: RegisterFormData) => {
    try {
      await callRegister({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      toastSuccess("Verification code sent to your email");
      setEmailForVerify(data.email);
      setShowCodeInput(true);
    } catch (err: any) {
      toastError(err.message);
    }
  };

  const {
    register: registerVerify,
    handleSubmit: handleVerifySubmit,
    formState: { errors: verifyErrors, isSubmitting: isVerifying },
  } = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    mode: "onChange",
  });

  const onSubmitVerify = async (data: VerifyCodeFormData) => {
    try {
      await callVerifyEmail(emailForVerify, data.code);
      toastSuccess("Account created successfully");
      navigate("/login");
    } catch (err: any) {
      toastError(err.message || "Invalid verification code");
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center px-4 py-6 bg-white overflow-y-auto">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Create an account</h2>
          <p className="text-gray-600">
            Enter your details to unlock exclusive hotel deals.
          </p>
        </div>

        {/* REGISTER FORM */}
        {!showCodeInput && (
          <form
            onSubmit={handleSubmit(onSubmitRegister)}
            className="space-y-5"
          >
            {/* Full Name */}
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <input
                  {...register("fullName")}
                  placeholder="Jane Doe"
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500"
                  }`}
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500" />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  placeholder="jane@example.com"
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500"
                  }`}
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-orange-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-orange-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}

        {/* VERIFY CODE FORM */}
        {showCodeInput && (
          <form
            onSubmit={handleVerifySubmit(onSubmitVerify)}
            className="space-y-5"
          >
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Verification Code
              </label>
              <input
                {...registerVerify("code")}
                maxLength={6}
                placeholder="Enter 6-digit code"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${
                  verifyErrors.code
                    ? "border-red-500 focus:ring-red-500"
                    : "border-orange-500 focus:ring-orange-500"
                }`}
              />
              {verifyErrors.code ? (
                <p className="text-red-500 text-sm mt-1">
                  {verifyErrors.code.message}
                </p>
              ) : (
                <p className="text-gray-500 text-sm mt-1">
                  We sent a verification code to your email
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition disabled:opacity-60"
            >
              {isVerifying ? "Verifying..." : "Verify & Login"}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-600">
          <Shield className="text-green-600" />
          <span>Your data is permanently secured and encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
