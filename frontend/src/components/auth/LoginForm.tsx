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
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validate email
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

  // Validate password
  const validatePassword = (value: string): string => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (touched.email) {
      setErrors(prev => ({
        ...prev,
        email: validateEmail(value)
      }));
    }
  };

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (touched.password) {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(value)
      }));
    }
  };

  // Handle blur (khi người dùng rời khỏi ô input)
  const handleBlur = (field: "email" | "password") => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    if (field === "email") {
      setErrors(prev => ({ ...prev, email: validateEmail(email) }));
    } else {
      setErrors(prev => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate tất cả các field
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError
    });

    setTouched({
      email: true,
      password: true
    });

    // Nếu có lỗi thì không submit
    if (emailError || passwordError) {
      return;
    }

    try {
      const response = await callLogin({ email, password });
      dispatch(setCurrentUser(response.data));
      navigate("/home");
    } catch (err: any) {
      // Xử lý lỗi từ server
      setErrors(prev => ({
        ...prev,
        password: err.message || "Invalid email or password"
      }));
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
        <div
          className="grid grid-cols-2 gap-3 sm:gap-4"
          style={{ paddingInline: "3vh" }}
        >
          <button className="h-11 sm:h-12 rounded-lg sm:rounded-xl border border-[#e8dbce] flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition">
            <img src="/icons/google.svg" alt="" />
            <span className="font-bold text-xs sm:text-sm">Google</span>
          </button>

          <button className="h-11 sm:h-12 rounded-lg sm:rounded-xl border border-[#e8dbce] flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition">
            <img src="/icons/facebook.svg" alt="" />
            <span className="font-bold text-xs sm:text-sm">Facebook</span>
          </button>
        </div>

        <div
          className="flex items-center gap-3 sm:gap-4"
          style={{ margin: "2vh 0" }}
        >
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
                  onChange={handleEmailChange}
                  onBlur={() => handleBlur("email")}
                  placeholder="jane@example.com"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                    errors.email && touched.email
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  }`}
                />
                <Mail className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                  errors.email && touched.email ? "text-red-400" : "text-gray-400"
                }`} />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1.5">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="flex justify-between items-baseline pb-2 text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                Password
                <a
                  onClick={handleClick}
                  className="text-sm font-semibold text-primary hover:underline"
                  style={{ color: "#f97316" }}
                  href="#"
                >
                  Forgot password?
                </a>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur("password")}
                  placeholder="••••••••"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                    errors.password && touched.password
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 hover:text-gray-600 ${
                    errors.password && touched.password ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1.5">
                  {errors.password}
                </p>
              )}
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