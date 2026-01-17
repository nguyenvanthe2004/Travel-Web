import { Eye, EyeOff, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { callLogin } from "../../services/auth";
import { setCurrentUser } from "../../redux/slices/currentUser";
import { loginSchema, type LoginFormData } from "../../validations/auth";
import { toastError, toastSuccess } from "../../lib/toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await callLogin(data);
      dispatch(setCurrentUser(res.data.user));
      toastSuccess("Login successfully");
      navigate("/");
    } catch (error: any) {
      toastError(error.message);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-[440px] bg-white rounded-xl shadow-2xl border border-[#e8dbce] overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 text-center">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-[#9c7349] text-sm pt-2">
          Log in to access exclusive deals and manage your bookings.
        </p>
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-4 px-5">
        <button className="h-11 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50">
          <img src="/icons/google.svg" />
          <span className="font-bold text-sm">Google</span>
        </button>

        <button className="h-11 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50">
          <img src="/icons/facebook.svg" />
          <span className="font-bold text-sm">Facebook</span>
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-5 px-5">
        <div className="flex-grow border-t" />
        <span className="text-sm text-[#9c7349]">or continue with email</span>
        <div className="flex-grow border-t" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-5 pb-6 flex flex-col gap-4"
      >
        {/* Email */}
        <div>
          <label className="block text-sm font-bold mb-2">Email Address</label>
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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="flex justify-between text-sm font-bold mb-2">
            Password
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-orange-500 hover:underline"
            >
              Forgot password?
            </button>
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

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-xl bg-[#f8941f] hover:bg-[#e07b1a] text-white font-bold transition disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
