import { Calendar, MapPin, Search, Users } from "lucide-react";
import type React from "react";

const SearchBar: React.FC = () => {
  return (
    <section className="relative pt-12 pb-32 px-6 lg:px-0">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="rounded-3xl overflow-hidden relative min-h-[560px] flex flex-col items-center justify-center text-center p-8 lg:p-16">
          <div className="absolute inset-0 z-0">
            <img
              alt="Luxury hotel room background"
              className="w-full h-full object-cover"
              data-alt="Luxury hotel room with ocean view during sunset"
              src="/images/bg-searchbar.png"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
          </div>

          <div className="relative z-10 max-w-3xl flex flex-col gap-6 animate-fade-in-up">
            <h2 className="text-white text-4xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-md">
              Wake up somewhere <br />{" "}
              <span className="text-primary-light text-orange-200">
                extraordinary
              </span>
            </h2>
            <p className="text-white/90 text-lg lg:text-xl font-medium max-w-2xl mx-auto drop-shadow-sm">
              Discover over 2 million hotels, homes, and unique stays around the
              globe.
            </p>
          </div>

          <div className="relative z-20 mt-12 w-full max-w-5xl">
            <div className="bg-white rounded-full p-2 lg:p-3 shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 ring-1 ring-black/5">
              <div className="flex-1 px-4 py-2 lg:py-0 relative group">
                <label className="flex items-center gap-3 cursor-text w-full">
                  <span className="material-symbols-outlined text-orange-500">
                    <MapPin />
                  </span>
                  <div className="flex flex-col flex-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Where
                    </span>
                    <input
                      className=" p-0 text-text-main placeholder-gray-400 border-0
    outline-none
    focus:outline-none focus:ring-0 focus:border-0 focus:ring-0 text-base font-semibold bg-transparent w-full"
                      placeholder="Search destinations"
                      type="text"
                    />
                  </div>
                </label>
              </div>

              <div className="flex-1 px-4 py-2 lg:py-0 relative group">
                <label className="flex items-center gap-3 cursor-pointer w-full">
                  <span className="material-symbols-outlined text-orange-500">
                    <Calendar />
                  </span>
                  <div className="flex flex-col flex-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Check-in — Check-out
                    </span>
                    <div className="text-base font-semibold text-text-main truncate">
                      Add dates
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex-1 px-4 py-2 lg:py-0 relative group">
                <label className="flex items-center gap-3 cursor-pointer w-full">
                  <span className="material-symbols-outlined text-orange-500">
                    <Users />
                  </span>
                  <div className="flex flex-col flex-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Guests
                    </span>
                    <div className="text-base font-semibold text-text-main truncate">
                      2 adults, 1 room
                    </div>
                  </div>
                </label>
              </div>

              <div className="p-1">
                <button className="w-full lg:w-auto h-14 px-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
                  <span className="material-symbols-outlined">
                    <Search />
                  </span>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SearchBar;
