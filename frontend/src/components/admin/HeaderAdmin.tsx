import type React from "react";

const HeaderAdmin: React.FC = () => {
  return (
    <header className="h-16 text-black flex-shrink-0 bg-white border-b border-slate-200 grey:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
            search
          </span>
          <input
            className=" w-full bg-grey-500 border border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:border-[#0F8FA0] focus:outline-none focus:bg-grey-800 transition-all"
            placeholder="Search bookings, guests, or invoices..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-grey-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-grey-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">chat_bubble</span>
        </button>
      </div>
    </header>
  );
};

export default HeaderAdmin;
