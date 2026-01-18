import type React from "react";

const DestinationCard: React.FC = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-text-main">
              Trending Destinations
            </h3>
            <p className="text-text-muted mt-2 text-gray-700">
              Most searched locations by travelers this week.
            </p>
          </div>
          <a
            className="hidden md:flex items-center gap-1 text-orange-400 font-bold hover:gap-2 transition-all"
            href="#"
          >
            View all{" "}
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer">
            <img
              alt="Eiffel Tower view in Paris"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-alt="Eiffel Tower view in Paris"
              src="/images/location1.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h4 className="text-white text-xl font-bold">Paris, France</h4>
              <p className="text-white/80 text-sm mt-1">1,240 properties</p>
            </div>
          </div>

          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer">
            <img
              alt="Neon street signs in Tokyo"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-alt="Neon street signs in Tokyo"
              src="/images/location2.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h4 className="text-white text-xl font-bold">Tokyo, Japan</h4>
              <p className="text-white/80 text-sm mt-1">980 properties</p>
            </div>
          </div>

          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer">
            <img
              alt="Traditional temples in Bali"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-alt="Traditional temples in Bali"
              src="/images/location3.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h4 className="text-white text-xl font-bold">Bali, Indonesia</h4>
              <p className="text-white/80 text-sm mt-1">2,100 properties</p>
            </div>
          </div>

          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer">
            <img
              alt="Skyline view of New York City"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-alt="Skyline view of New York City"
              src="/images/location4.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h4 className="text-white text-xl font-bold">New York, USA</h4>
              <p className="text-white/80 text-sm mt-1">1,560 properties</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DestinationCard;
