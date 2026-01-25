import { Hotel } from "lucide-react";
import type React from "react";
import { useState, useEffect } from "react";

const SideBar: React.FC = () => {
  const [activePage, setActivePage] = useState("");
  
  useEffect(() => {
    const path = window.location.pathname;
    
    switch (true) {
      case path.includes('/dashboard'):
        setActivePage('dashboard');
        break;
      case path.includes('/locations'):
        setActivePage('locations');
        break;
      case path.includes('/hotels'):
        setActivePage('hotels');
        break;
      case path.includes('/bookings'):
        setActivePage('bookings');
        break;
      case path.includes('/users'):
        setActivePage('users');
        break;
      case path.includes('/settings'):
        setActivePage('settings');
        break;
      case path.includes('/support'):
        setActivePage('support');
        break;
      default:
        setActivePage('dashboard');
    }
  }, []);

  return (
    <aside className="w-64 text-black flex-shrink-0 border-r border-slate-200 bg-white flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="size-9 bg-white rounded-lg flex items-center justify-center border-2 border-[#0F8FA0]">
          <Hotel size={20} className="text-[#0F8FA0]" />
        </div>
        <div>
          <h1 className="text-lg font-extrabold tracking-tight leading-none">
            StayManager
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            Admin Portal
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <a
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
            activePage === "dashboard"
              ? "bg-[#0F8FA0] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          href="/dashboard"
          onClick={() => {
            setActivePage("dashboard");
          }}
        >
          <span className="material-symbols-outlined text-xl">dashboard</span>
          <span
            className={`text-sm ${activePage === "dashboard" ? "font-semibold" : "font-medium"}`}
          >
            Dashboard
          </span>
        </a>

        <a
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
            activePage === "locations"
              ? "bg-[#0F8FA0] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          href="/locations"
          onClick={() => {
            setActivePage("locations");
          }}
        >
          <span className="material-symbols-outlined text-xl">location_on</span>
          <span
            className={`text-sm ${activePage === "locations" ? "font-semibold" : "font-medium"}`}
          >
            Locations
          </span>
        </a>

        <a
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
            activePage === "hotels"
              ? "bg-[#0F8FA0] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          href="/hotels"
          onClick={() => {
            setActivePage("hotels");
          }}
        >
          <span className="material-symbols-outlined text-xl">bed</span>
          <span
            className={`text-sm ${activePage === "hotels" ? "font-semibold" : "font-medium"}`}
          >
            Hotels
          </span>
        </a>

        <a
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
            activePage === "bookings"
              ? "bg-[#0F8FA0] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          href="/bookings"
          onClick={() => {
            setActivePage("bookings");
          }}
        >
          <span className="material-symbols-outlined text-xl">
            calendar_month
          </span>
          <span
            className={`text-sm ${activePage === "bookings" ? "font-semibold" : "font-medium"}`}
          >
            Bookings
          </span>
        </a>

        <a
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
            activePage === "users"
              ? "bg-[#0F8FA0] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          href="/users"
          onClick={() => {
            setActivePage("users");
          }}
        >
          <span className="material-symbols-outlined text-xl">group</span>
          <span
            className={`text-sm ${activePage === "users" ? "font-semibold" : "font-medium"}`}
          >
            Users
          </span>
        </a>

        <div className="pt-4 pb-2 px-4">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            System
          </p>
        </div>

        <a
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
            activePage === "settings"
              ? "bg-[#0F8FA0] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          href="/settings"
          onClick={() => {
            setActivePage("settings");
          }}
        >
          <span className="material-symbols-outlined text-xl">settings</span>
          <span
            className={`text-sm ${activePage === "settings" ? "font-semibold" : "font-medium"}`}
          >
            Settings
          </span>
        </a>

        <a
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
            activePage === "support"
              ? "bg-[#0F8FA0] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          href="/support"
          onClick={() => {
            setActivePage("support");
          }}
        >
          <span className="material-symbols-outlined text-xl">help</span>
          <span
            className={`text-sm ${activePage === "support" ? "font-semibold" : "font-medium"}`}
          >
            Support
          </span>
        </a>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 p-2">
          <div
            className="size-10 rounded-full bg-cover bg-center ring-2 ring-[#0F8FA0]"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5LZQesqkJ04SFLU_goyOy1OXr8cY3qKGg8jYTdrKNwSMRPh0N3i6bgilRBYMc5sVDAZpOT0tSnvkDFFMjgMQhQr0jLBMK04hkgmgfIMasFv-XLG9yxi7fs4YgldjtXe8pSJyL6esAGlL5zbIN6E_n_ZPcdaDmxhtboGVtuCnZZkcNctTo6YpOU8jr0ewhJoOVUcmbFt6knmtnCu20xyaEovIYhC_GrMU_a5SZMKuMCscZlKoSjlu51E0V2RZPKL8VnFBOLhzGBM0')",
            }}
          ></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">Alex Rivera</p>
            <p className="text-xs text-slate-500 truncate">Super Admin</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;