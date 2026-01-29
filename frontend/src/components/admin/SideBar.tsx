import { Hotel } from "lucide-react";
import type React from "react";
import { useState, useEffect } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { CLOUDINARY_URL, NAV_ITEMS, SYSTEM_ITEMS } from "../../constants";
import NavItem from "../NavItem";

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.currentUser);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-white rounded-lg flex items-center justify-center border-2 border-[#0F8FA0]">
            <Hotel size={16} className="text-[#0F8FA0]" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight leading-none">
              StayManager
            </h1>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-2xl text-slate-700">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 text-black flex-shrink-0 border-r border-slate-200 bg-white flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          top-16 lg:top-0
        `}
      >
        <div className="hidden lg:flex p-6 items-center gap-3">
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

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.key} item={item} onClick={handleNavClick} />
          ))}

          <div className="pt-4 pb-2 px-4">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              System
            </p>
          </div>

          {SYSTEM_ITEMS.map((item) => (
            <NavItem key={item.key} item={item} onClick={handleNavClick} />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-2">
            <div
              className="size-10 rounded-full bg-cover bg-center ring-2 ring-[#0F8FA0]"
              style={{
                backgroundImage: `url(${CLOUDINARY_URL}${user?.avatar})`,
              }}
            ></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user?.fullName}</p>
              <p className="text-xs text-slate-500 truncate">{user?.role}</p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="text-slate-400 hover:text-slate-600"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
