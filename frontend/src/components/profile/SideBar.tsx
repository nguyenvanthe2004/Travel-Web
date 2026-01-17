import type React from "react";
import { useNavigate } from "react-router-dom";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <aside className="w-70 bg-white border-r border-[#e8dbce] flex flex-col justify-between py-6">
      <div>
        <div className="px-6 mb-8 flex items-center gap-2">
          <div
            onClick={() => navigate("/")}
            className="bg-primary size-7 rounded-lg flex items-center justify-center text-white"
          >
            <img src="/icons/logo.svg" alt="" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-[#1c140d]">
            Vista Stays
          </span>
        </div>
        <div className="px-3 space-y-1">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#fff4e6] text-[#1c140d] cursor-pointer transition-all border-l-4 border-primary">
            <span className="material-symbols-outlined text-xl">person</span>
            <span className="font-semibold text-sm">Profile</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#9c7349] hover:bg-[#f4ede7] cursor-pointer transition-all">
            <span className="material-symbols-outlined text-xl">apartment</span>
            <span className="font-medium text-sm">My Hotels</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#9c7349] hover:bg-[#f4ede7] cursor-pointer transition-all">
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="font-medium text-sm">Settings</span>
          </div>
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
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer transition-all">
          <span className="material-symbols-outlined text-xl">logout</span>
          <span className="font-semibold text-sm">Logout</span>
        </div>
      </div>
    </aside>
  );
};
export default SideBar;
