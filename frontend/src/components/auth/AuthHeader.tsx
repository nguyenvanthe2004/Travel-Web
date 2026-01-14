import { UserPlus } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router-dom";

const AuthHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e8dbce] bg-white/95 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4 lg:px-10">
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none">
        <div className="w-7 h-7 sm:w-8 sm:h-8 text-[#f8941f]">
          <img src="/icons/logo.svg" alt="" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold tracking-wide">
          Vista Stays
        </h2>
      </div>

      {/* Action */}
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="hidden md:block text-sm text-[#9c7349]">
          Don't have an account?
        </span>
        <button
          onClick={() => navigate("/register")}
          className="flex items-center gap-1.5 sm:gap-2 h-9 sm:h-10 px-3 sm:px-6 rounded-lg sm:rounded-xl bg-[#f8941f]/10 hover:bg-[#f8941f]/20 text-[#f8941f] text-xs sm:text-sm font-bold transition"
        >
          <UserPlus className="w-4 h-4" />
          <span className="text-medium">Register</span>
        </button>
      </div>
    </header>
  );
};
export default AuthHeader;
