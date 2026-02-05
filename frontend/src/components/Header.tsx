import { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut, Hotel } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { CLOUDINARY_URL, UserRole } from "../constants";
import { logout } from "../redux/slices/currentUser";
import { callLogout } from "../services/auth";
import { toastError } from "../lib/toast";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await callLogout();
      navigate("/login");
    } catch (error: any) {
      toastError(error.message);
    }
  };
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-primary rounded flex items-center justify-center text-white cursor-pointer">
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
              <button onClick={() => navigate("/")} className="text-sm font-medium hover:text-orange-400 cursor-pointer">
                User
              </button>
              <button onClick={() => navigate("/dashboard")} className="text-sm font-medium hover:text-orange-400 cursor-pointer">
                Admin
              </button>
            </div>

            {user.userId ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="size-10 rounded-full border-4 border-[#f4ede7] overflow-hidden bg-cover bg-center cursor-pointer"
                  aria-label="User menu"
                >
                  <img src={`${CLOUDINARY_URL}${user.avatar}`} alt="" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-sm text-gray-900">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                      {user.role === UserRole.ADMIN && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-600 rounded">
                          Admin
                        </span>
                      )}
                    </div>

                    <div className="py-1">
                      <a
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </a>
                      <a
                        href="/hotel-manager"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        <Hotel size={16} />
                        <span>My Hotels</span>
                      </a>
                    </div>

                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full cursor-pointer"
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
            className="lg:hidden p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu - Slide từ trái */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-40 lg:hidden shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          {/* Header của menu */}
          <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                <span className="text-xl font-bold">V</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Vista Stays</h2>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Navigation */}
            <nav className="space-y-1">
              <a
                href="#"
                className="block text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 px-4 py-3 rounded-lg transition-colors"
              >
                Destinations
              </a>
              <a
                href="#"
                className="block text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 px-4 py-3 rounded-lg transition-colors"
              >
                Deals
              </a>
              <a
                href="#"
                className="block text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 px-4 py-3 rounded-lg transition-colors"
              >
                My Trips
              </a>
              <a
                href="#"
                className="block text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 px-4 py-3 rounded-lg transition-colors"
              >
                My Hotels
              </a>
            </nav>

            {/* User/Admin Toggle */}
            <div className="flex gap-3 pt-3 border-t border-gray-200">
              <button 
                onClick={() => navigate("/")}
                className="flex-1 text-sm font-medium text-gray-700 hover:text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors"
              >
                User
              </button>
              <button 
                onClick={() => navigate("/dashboard")}
                className="flex-1 text-sm font-medium text-gray-700 hover:text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Admin
              </button>
            </div>

            {/* User Section */}
            {user?.userId ? (
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-3 pb-3 px-4">
                  <div className="size-12 rounded-full border-4 border-orange-100 overflow-hidden bg-cover bg-center flex-shrink-0">
                    <img src={`${CLOUDINARY_URL}${user.avatar}`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    {user.role === UserRole.ADMIN && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-600 rounded">
                        Admin
                      </span>
                    )}
                  </div>
                </div>

                <a
                  onClick={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <User size={18} />
                  <span>Profile</span>
                </a>
                <a
                  onClick={() => {
                    navigate("/hotel-manager");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <Hotel size={18} />
                  <span>My Hotels</span>
                </a>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 text-sm font-bold hover:bg-gray-50 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-5 py-3 rounded-xl bg-orange-500 text-sm font-bold text-white hover:bg-orange-600 transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
