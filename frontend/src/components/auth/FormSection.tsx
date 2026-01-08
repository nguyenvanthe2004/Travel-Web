import { ArrowLeft, Lock, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/auth";

const FormSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await forgotPassword(email);
      alert("A reset link has been sent to your email.");
    } catch (err) {
      console.error("Error sending reset link:", err);
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
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" />
            </svg>
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
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              className="text-sm sm:text-base font-bold text-gray-900"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-300 bg-white text-base placeholder-[#9c7349]/70 focus:outline-none focus:border-[#f8941f] focus:ring-4 focus:ring-[#f8941f]/10 transition-all shadow-sm"
                id="email"
                placeholder="e.g., alex@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9c7349]">
                <Mail className="w-5 h-5" />
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full h-14 rounded-xl bg-[#f8941f] hover:bg-orange-600 text-white text-base font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </div>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <button
            onClick={handleBackToLogin}
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
