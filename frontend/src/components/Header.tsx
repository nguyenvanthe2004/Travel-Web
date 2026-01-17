import { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <img src="/icons/logo.svg" alt="" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Vista Stays</h1>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex gap-6">
            <a href="#" className="text-sm font-medium hover:text-orange-400">
              Destinations
            </a>
            <a href="#" className="text-sm font-medium hover:text-orange-400">
              Deals
            </a>
            <a href="#" className="text-sm font-medium hover:text-orange-400">
              My Trips
            </a>
            <a href="#" className="text-sm font-medium hover:text-orange-400">
              My Hotels
            </a>
          </nav>

          <div className="h-6 w-px bg-gray-200"></div>

          <div className="flex gap-4">
            <button className="text-sm font-medium hover:text-orange-400">
              USD
            </button>
            <button className="text-sm font-medium hover:text-orange-400">
              EN
            </button>
          </div>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="size-10 rounded-full border-4 border-[#f4ede7] overflow-hidden bg-cover bg-center"
                aria-label="User menu"
              >
                <img
                  src={`https://res.cloudinary.com/dfisjw5pt/image/upload/v1768513434/${user.avatar}`}
                  alt=""
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-sm text-gray-900">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                    {user.role === "admin" && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-600 rounded">
                        Admin
                      </span>
                    )}
                  </div>

                  <div className="py-1">
                    <a
                      onClick={() => navigate("/profile")}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </a>
                    <a
                      href="/hotel-manager"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <svg
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span>My Hotels</span>
                    </a>
                  </div>

                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={() => navigate("/login")}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-xl border border-gray-200 text-sm font-bold hover:bg-gray-50"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 rounded-3xl bg-orange-500 text-sm font-bold text-white hover:bg-orange-600"
              >
                Register
              </button>
            </div>
          )}
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-6">
            <nav className="space-y-3">
              <a
                href="#"
                className="block text-base font-medium hover:text-orange-400 py-2"
              >
                Destinations
              </a>
              <a
                href="#"
                className="block text-base font-medium hover:text-orange-400 py-2"
              >
                Deals
              </a>
              <a
                href="#"
                className="block text-base font-medium hover:text-orange-400 py-2"
              >
                My Trips
              </a>
            </nav>

            <div className="flex gap-6 pt-3 border-t border-gray-200">
              <button className="text-sm font-medium hover:text-orange-400">
                USD
              </button>
              <button className="text-sm font-medium hover:text-orange-400">
                EN
              </button>
            </div>

            {user ? (
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-3 pb-3">
                  <div className="size-10 rounded-full border-4 border-[#f4ede7] overflow-hidden bg-cover bg-center">
                    <img
                      src={`https://res.cloudinary.com/dfisjw5pt/image/upload/v1768513434/${user.avatar}`}
                      alt=""
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    {user.role === "admin" && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-600 rounded">
                        Admin
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href="#profile"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                >
                  <User size={16} />
                  <span>Profile</span>
                </a>
                <a
                  href="#my-hotels"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                >
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>My Hotels</span>
                </a>

                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 w-full"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold hover:bg-gray-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full px-5 py-2.5 rounded-3xl bg-orange-400 text-sm font-bold text-white hover:bg-orange-500"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
