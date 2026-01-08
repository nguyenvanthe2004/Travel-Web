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
          <svg
            fill="currentColor"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
          </svg>
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
