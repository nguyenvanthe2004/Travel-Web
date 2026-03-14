import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Hotel,
  UserStar,
  MapPin,
  Users,
  Calendar,
  Search,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { CLOUDINARY_URL, UserRole } from "../constants";
import { logout } from "../redux/slices/currentUser";
import { callLogout } from "../services/auth";
import { toastError } from "../lib/toast";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [guests, setGuests] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSearchOpen]);

  const handleSearch = () => {
    navigate(`/search?locationName=${locationName}&guests=${guests}`);
    setIsOpen(false);
    setIsMobileSearchOpen(false);
  };

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
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
              <img src="/icons/logo.svg" alt="" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">TravelStay</h1>
          </div>

          {/* Desktop Search Box */}
          <div className="relative w-[460px] hidden lg:block">
            <div
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-full px-5 py-3 shadow-sm hover:shadow-md hover:border-orange-400 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">
                  <Search />
                </span>
                <span className="text-sm text-gray-500">
                  Where are you going?
                </span>
              </div>
            </div>

            {isOpen && (
              <div
                ref={modalRef}
                className="absolute top-full mt-4 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 animate-fade-in"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Destination
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400">
                      <span className="text-gray-400 mr-2">
                        <MapPin size={16} />
                      </span>
                      <input
                        type="text"
                        placeholder="City, hotel, or destination"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        className="w-full outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Guests
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400">
                      <span className="text-gray-400 mr-2">
                        <Users size={16} />
                      </span>
                      <input
                        type="number"
                        min={1}
                        placeholder="Number of guests"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-gray-500 hover:text-gray-800 font-medium"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
                    >
                      <Search size={16} />
                      Search
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Desktop Nav & User */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex gap-6">
              <a onClick={() => navigate("/my-booking")} className="text-sm font-medium hover:text-orange-400 cursor-pointer">
                My Booking
              </a>
              <a
                onClick={() => navigate("/my-hotel")}
                className="text-sm font-medium hover:text-orange-400 cursor-pointer"
              >
                My Hotels
              </a>
            </nav>

            <div className="h-6 w-px bg-gray-200"></div>

            {user.userId ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="size-10 rounded-full border-4 border-[#f4ede7] overflow-hidden bg-cover bg-center cursor-pointer"
                  aria-label="User menu"
                >
                  <img
                    src={
                      user.avatar
                        ? `${CLOUDINARY_URL}${user.avatar}`
                        : "public/images/avatar.png"
                    }
                    alt=""
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-sm text-gray-900">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      {user.role === UserRole.ADMIN && (
                        <a
                          onClick={() => navigate("/admin/dashboard")}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                        >
                          <UserStar size={16} />
                          <span>Admin</span>
                        </a>
                      )}
                      <a
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </a>
                      <a
                        onClick={() => navigate("/my-hotel")}
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

          {/* Mobile: Search icon + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              className="p-2 rounded-full hover:bg-orange-50 transition-colors"
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Open search"
            >
              <Search size={22} className="text-gray-700" />
            </button>
            <button
              className="p-2 z-50 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE SEARCH OVERLAY ── */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileSearchOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileSearchOpen(false)}
        />

        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
            isMobileSearchOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Search Hotel</h2>
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close search"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Search Form */}
          <div className="px-5 py-5 flex flex-col gap-4 pb-8">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Destination
              </label>
              <div className="flex items-center gap-3 border-2 border-gray-200 rounded-2xl px-4 py-3 focus-within:border-orange-400 transition-colors bg-gray-50">
                <MapPin size={18} className="text-orange-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="City, hotel, or destination"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full outline-none text-sm bg-transparent text-gray-800 placeholder-gray-400"
                  autoFocus={isMobileSearchOpen}
                />
                {locationName && (
                  <button
                    onClick={() => setLocationName("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Guests
              </label>
              <div className="flex items-center justify-between border-2 border-gray-200 rounded-2xl px-4 py-3 focus-within:border-orange-400 transition-colors bg-gray-50">
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-orange-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </span>
                </div>
                {/* Stepper */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="size-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors font-bold text-lg leading-none"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-gray-900">
                    {guests}
                  </span>
                  <button
                    onClick={() => setGuests((g) => g + 1)}
                    className="size-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors font-bold text-lg leading-none"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={!locationName}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-base font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-orange-200"
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu - Slide từ trái */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-40 lg:hidden shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto">
          {/* Header của menu */}
          <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                <span className="text-xl font-bold">V</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900">TravelStay</h2>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Navigation */}
            <nav className="space-y-1">
              <a
                onClick={() => navigate("/my-booking")}
                className="block text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 px-4 py-3 rounded-lg transition-colors cursor-pointer"
              >
                My Bookings
              </a>
              <a
                onClick={() => navigate("/my-hotel")}
                className="block text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 px-4 py-3 rounded-lg transition-colors cursor-poiter"
              >
                My Hotels
              </a>
            </nav>

            {/* User Section */}
            {user?.userId ? (
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-3 pb-3 px-4">
                  <div className="size-12 rounded-full border-4 border-orange-100 overflow-hidden bg-cover bg-center flex-shrink-0">
                    <img
                      src={
                        user?.avatar
                          ? `${CLOUDINARY_URL}${user.avatar}`
                          : "public/images/avatar.png"
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {user.role === UserRole.ADMIN && (
                  <a
                    onClick={() => {
                      navigate("/admin/dashboard");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <UserStar size={18} />
                    <span>Admin</span>
                  </a>
                )}
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
                    navigate("/my-hotel");
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
