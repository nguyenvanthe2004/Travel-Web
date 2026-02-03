import type React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/currentUser";
import { useDispatch } from "react-redux";
import { callLogout } from "../../services/auth";
import { useState } from "react";
import { Hotel, LogOut, Menu, Settings, User, X } from "lucide-react";
import { toastError } from "../../lib/toast";

const menuItems = [
  {
    label: "Profile",
    icon: <User />,
    path: "/profile",
  },
  {
    label: "My Hotels",
    icon: <Hotel />,
    path: "/hotel-manager",
  },
  {
    label: "Settings",
    icon: <Settings />,
    path: "/settings",
  },
];

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await callLogout();
      navigate("/login");
    } catch (error: any) {
      toastError(error.message);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg border border-[#e8dbce]"
      >
        {isOpen ? (
          <X size={24} className="text-[#1c140d]" />
        ) : (
          <Menu size={24} className="text-[#1c140d]" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-70 bg-white border-r border-[#e8dbce] 
          flex flex-col justify-between py-6
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>
          <div className="px-6 mb-8 flex items-center gap-2">
            <div
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              className="bg-primary size-7 rounded-lg flex items-center justify-center text-white cursor-pointer"
            >
              <img src="/icons/logo.svg" alt="" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-[#1c140d]">
              Vista Stays
            </span>
          </div>
          <div className="px-3 space-y-1">
            {menuItems.map((item) => (
              <div
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all
        ${
          isActive(item.path)
            ? "bg-[#fff4e6] text-[#1c140d] border-l-4 border-primary font-semibold"
            : "text-[#9c7349] hover:bg-[#f4ede7] font-medium"
        }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-3">
          <div className="bg-[#fff4e6] p-4 rounded-xl mb-4 border border-[#e8dbce]">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-base">
                verified
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#9c7349]">
                Premium Tier
              </span>
            </div>
            <p className="text-xs text-[#9c7349] leading-relaxed">
              Enjoy exclusive early access and concierge services.
            </p>
          </div>
          <div
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-xl">
              <LogOut />
            </span>
            <span className="font-semibold text-sm">Logout</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
