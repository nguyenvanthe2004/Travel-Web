import type React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between :border-[#3a2d25] px-4 sm:px-6 md:px-10 py-4 sm:py-5 bg-white/95 :bg-gray-900/95 backdrop-blur-md">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="w-7 h-7 sm:w-8 sm:h-8 text-[#f8941f]">
          <img src="/icons/logo.svg" alt="" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight">
          Vista Stays
        </h2>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <p className="hidden sm:block text-xs sm:text-sm font-medium text-[#9c7349] dark:text-[#a8927e]">
          Already a member?
        </p>
        <button
          onClick={handleLoginClick}
          className="text-xs sm:text-sm font-bold text-[#f8941f] hover:text-[#d67618] transition-colors px-3 py-1.5 sm:px-0 sm:py-0 rounded-lg sm:rounded-none bg-[#f8941f]/10 sm:bg-transparent"
        >
          Log In
        </button>
      </div>
    </header>
  );
};
export default Navbar;
