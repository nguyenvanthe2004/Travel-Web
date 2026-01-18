import React, { useState } from "react";

const HotelCard: React.FC = () => {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-text-main">
              Homes guests love
            </h3>
            <p className="text-text-muted mt-2">
              Top rated stays for your next vacation.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="size-10 rounded-full flex items-center justify-center hover:bg-background-light hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button className="size-10 rounded-full bg-orange-400 text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col gap-3 group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <img
                alt="Luxury Resort &amp; Spa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                data-alt="Modern hotel exterior with pool"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD67MvgPgOUe3xXD5szR8MylYbg1AM2edsxkgLE69f5wjTlYUIyQ1aPayAC1i5usaPf9qFcbMhJhJdHPgefJ5wCMVo4mnb9OOA7nArZuRwVGlyqf6wQjfetkRzOZzuQDQhAuIXy0KHe4zcq2zkBpwp9N08E29sUSPjUNIsJjdN_TSZBpPG1xWoJ-XmaLEVIEDgKyuKFXO60Omdf1VxjKkkw-EDLSW-P7dIRibcFGwFI4xYxlJqFl-cRrCVtxtpEq_vh5uvNvhK5zLU"
              />
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-colors text-red-500">
                <span className="material-symbols-outlined fill text-[20px]">
                  favorite
                </span>
              </button>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined fill text-yellow-500 text-[14px]">
                  star
                </span>
                4.9
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-lg text-text-main leading-tight group-hover:text-orange-400 transition-colors">
                Aparthotel Stare Miasto
              </h4>
              <p className="text-sm text-text-muted">Old Town, Krakow</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-lg font-bold text-text-main">$120</span>
                <span className="text-sm text-gray-400">/ night</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <img
                alt="Ocean View Resort"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                data-alt="Resort pool with palm trees"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlr0I1luMnxDf8TrBrmDbCVlL_MLBqm3VUXAOcOnLDqNte8ETiPzJTygvem3VUKElhc8sZ1skgFkgXGfnGSc5oe7SA_AS0Cv-X8M-MxUuAC59VNzYjhW6NcuBErkb1SQtd8dLWwPqWc9PHfAl2eiXTH2IY7WFqcwcPI1iVy5-2AqXgqmfySRUKF4z6bj1TmO7N5hNHcVU9nu-Mhw0sUEor-my3l8mkEeyAkgYu7E3q2fgBkJMftKnZXhVg3VPg-swi-Ugr11d9fM4"
              />
              <button className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-white backdrop-blur-sm transition-colors text-white hover:text-red-500">
                <span className="material-symbols-outlined text-[20px]">
                  favorite
                </span>
              </button>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined fill text-yellow-500 text-[14px]">
                  star
                </span>
                4.7
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-lg text-text-main leading-tight group-hover:text-orange-400 transition-colors">
                7Seasons Apartments
              </h4>
              <p className="text-sm text-text-muted">Terézváros, Budapest</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-lg font-bold text-text-main">$95</span>
                <span className="text-sm text-gray-400">/ night</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <img
                alt="Cheval Three Quays"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                data-alt="Cozy interior of a hotel room"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsocbxK1VipMKAlQgz95kb9kdei6pWgbfv76HB_3GB6r82ITG4Kdv8Z0bxQ3qTTcIozZmeGmpCyjrk64rjr2oFkOdcqf2kgFtZ1UoanOFat8uRYpDLw0qdsRy3oQ0WGyF_BDYbwbdM2GhXtcMqtN9ob0V-3Y4PeBRxKsIhbQWyW2zdwuSVug6gN712GFoLcmWjfcrirvVMVuRYwcgd2uM9o8Q8HXTt41NRD5cuLO_KEFmBi8dP4Pv1JL_pEnHXrQoJZMr_wo6IpOI"
              />
              <button className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-white backdrop-blur-sm transition-colors text-white hover:text-red-500">
                <span className="material-symbols-outlined text-[20px]">
                  favorite
                </span>
              </button>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined fill text-yellow-500 text-[14px]">
                  star
                </span>
                4.9
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-lg text-text-main leading-tight group-hover:text-orange-400 transition-colors">
                Cheval Three Quays
              </h4>
              <p className="text-sm text-text-muted">City of London, London</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-lg font-bold text-text-main">$340</span>
                <span className="text-sm text-gray-400">/ night</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <img
                alt="The Langham"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                data-alt="Luxury hotel lobby"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApkxr9EbyhrXSFF8rgsbUaicY6sU5N2DuoWbiSHUEtbZCD8hMcSR5V0klSqHV1hRUqu5Y1jvp-yiXoDwPdzQ-uh3uD_ng6pcbyaMkd9M39Lwun54b8pM5kncobJRmNuo3DeGTSuVwW56pJK-Ge4Wegry9px-Wvf_stRxr9qfZt2WQGbuVoivswvyxA783ZrMG1arHSb1Rb3mM28FuEV9EPpF4aOleAC7_eD8le_fIXfNur8BvJP2s9i1-Kvm44IgkMn9tcWhNwD7g"
              />
              <button className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-white backdrop-blur-sm transition-colors text-white hover:text-red-500">
                <span className="material-symbols-outlined text-[20px]">
                  favorite
                </span>
              </button>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined fill text-yellow-500 text-[14px]">
                  star
                </span>
                4.8
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-lg text-text-main leading-tight group-hover:text-orange-400 transition-colors">
                The Langham
              </h4>
              <p className="text-sm text-text-muted">River North, Chicago</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-lg font-bold text-text-main">$280</span>
                <span className="text-sm text-gray-400">/ night</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelCard;
