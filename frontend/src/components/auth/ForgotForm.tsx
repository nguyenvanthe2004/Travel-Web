"use client";

import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  verifyCodeSchema,
  type ForgotPasswordFormData,
  type VerifyCodeFormData,
} from "../../validations/auth";
import { callSendNewPassword, callSendCode } from "../../services/auth";
import { toastError, toastSuccess } from "../../lib/toast";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [emailForVerify, setEmailForVerify] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmitSendCode = async (data: ForgotPasswordFormData) => {
    try {
      await callSendCode(data.email);
      toastSuccess("Verification code sent to your email");
      setEmailForVerify(data.email);
      setShowCodeInput(true);
    } catch (err: any) {
      toastError(err.message || "Failed to send code");
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
      await callSendNewPassword(emailForVerify, data.code);
      toastSuccess("New password has been sent to your email");
      navigate("/login");
    } catch (err: any) {
      toastError(err.message || "Invalid verification code");
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col px-6 py-8 sm:px-12 lg:px-16 xl:px-24 bg-[#fcfaf8]">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <img src="/icons/logo.svg" className="w-10 h-10" />
          <span className="text-2xl font-bold">Vista Stays</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col justify-center max-w-md mx-auto py-10">
        {/* Icon */}
        <div className="mb-10">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-orange-500" />
          </div>

          <h1 className="text-4xl font-black mb-4">
            Forgot your password?
          </h1>
          <p className="text-[#9c7349]">
            Enter your email and we'll send you a verification code.
          </p>
        </div>

        {/* SEND CODE */}
        {!showCodeInput && (
          <form
            onSubmit={handleSubmit(onSubmitSendCode)}
            className="space-y-6"
          >
            <div>
              <label className="font-bold mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  placeholder="alex@example.com"
                  className={`w-full h-14 pl-12 pr-4 rounded-xl border focus:outline-none focus:ring-4 transition ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500/10"
                      : "border-gray-300 focus:ring-orange-500/10"
                  }`}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        )}

        {/* VERIFY CODE */}
        {showCodeInput && (
          <form
            onSubmit={handleVerifySubmit(onSubmitVerify)}
            className="space-y-6"
          >
            <div>
              <label className="font-bold mb-2 block">
                Verification Code
              </label>
              <input
                {...registerVerify("code")}
                maxLength={6}
                placeholder="Enter 6-digit code"
                className={`w-full h-14 px-4 rounded-xl border focus:outline-none focus:ring-4 transition ${
                  verifyErrors.code
                    ? "border-red-500 focus:ring-red-500/10"
                    : "border-orange-500 focus:ring-orange-500/10"
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
              className="w-full h-14 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition disabled:opacity-60"
            >
              {isVerifying ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* Back */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9c7349] hover:text-orange-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto text-xs text-[#9c7349]/70 flex gap-6">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
      </footer>
    </div>
  );
};

export default ForgotPasswordForm;
