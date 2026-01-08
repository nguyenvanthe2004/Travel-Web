import { Eye, EyeOff, Mail } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callLogin } from "../../services/auth";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/slices/currentUser";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await callLogin({ email, password });
      dispatch(setCurrentUser(response.data));
      console.log("Login successful:", response);
      navigate("/home");
    } catch (err: any) {
      console.error(err.message || "An unexpected error occurred");
    }
  };
  const handleClick = () => {
    navigate("/forgotPassword");
  };

  return (
    <>
      <div className="relative z-10 w-full max-w-[440px] sm:max-w-[480px] bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-[#e8dbce] overflow-hidden">
        <div className="px-5 sm:px-8 pt-6 sm:pt-10 pb-3 sm:pb-4 text-center">
          <h1 className="text-2xl sm:text-[32px] font-bold">Welcome back!</h1>
          <p className="text-[#9c7349] text-sm sm:text-base pt-1.5 sm:pt-2">
            Log in to access exclusive deals and manage your bookings.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button className="h-11 sm:h-12 rounded-lg sm:rounded-xl border border-[#e8dbce] flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="sm:w-6 sm:h-6"
            >
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.82-.07-1.62-.21-2.39H12v4.53h6.39c-.28 1.44-1.12 2.67-2.39 3.5v2.92h3.85c2.26-2.08 3.55-5.16 3.55-8.56z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.85-2.92c-1.07.72-2.44 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.96H1.29v3.1C3.27 21.52 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.17 14.36c-.25-.72-.39-1.48-.39-2.36s.14-1.64.39-2.36V6.54H1.29C.46 8.03 0 9.94 0 12s.46 3.97 1.29 5.46l3.88-3.1z"
              />
              <path
                fill="#EA4335"
                d="M12 4.84c1.76 0 3.32.61 4.56 1.8l3.42-3.42C17.95 1.74 15.24.68 12 .68 7.34.68 3.27 3.16 1.29 6.54l3.88 3.1C6.2 6.96 8.86 4.84 12 4.84z"
              />
            </svg>
            <span className="font-bold text-xs sm:text-sm">Google</span>
          </button>

          <button className="h-11 sm:h-12 rounded-lg sm:rounded-xl border border-[#e8dbce] flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="sm:w-6 sm:h-6"
            >
              <path
                fill="#1877F2"
                d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6 4.39 10.97 10.12 11.86v-8.39H7.08v-3.47h3.04V9.41c0-3 1.79-4.66 4.53-4.66 1.31 0 2.68.23 2.68.23v2.95h-1.5c-1.48 0-1.94.92-1.94 1.86v2.24h3.31l-.53 3.47h-2.78v8.39C19.61 23.04 24 18.07 24 12.07z"
              />
            </svg>
            <span className="font-bold text-xs sm:text-sm">Facebook</span>
          </button>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex-grow border-t border-[#e8dbce]" />
          <span className="text-xs sm:text-sm text-[#9c7349] whitespace-nowrap">
            or continue with email
          </span>
          <div className="flex-grow border-t border-[#e8dbce]" />
        </div>
        <div className="px-5 sm:px-8 pb-6 sm:pb-8 flex flex-col gap-4 sm:gap-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3.5 sm:gap-4"
          >
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                />
                <Mail className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="flex justify-between items-baseline pb-2 text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                Password
                <a
                  onClick={handleClick}
                  className="text-sm font-semibold text-primary hover:underline"
                  href="#"
                >
                  Forgot password?
                </a>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
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
            </div>

            <button
              type="submit"
              className="mt-1 sm:mt-2 h-11 sm:h-12 rounded-lg sm:rounded-xl bg-[#f8941f] hover:bg-[#e07b1a] text-white font-bold shadow-lg text-sm sm:text-base transition"
            >
              Log In
            </button>
          </form>
        </div>
        <div className="bg-[#fcfaf8] dark:bg-white/5 px-4 sm:px-8 py-3 sm:py-4 border-t border-[#e8dbce] text-center">
          <p className="text-xs sm:text-sm text-[#9c7349]">
            By signing in, you agree with our{" "}
            <a href="#" className="font-bold hover:underline">
              Terms
            </a>{" "}
            &{" "}
            <a href="#" className="font-bold hover:underline">
              Privacy
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
