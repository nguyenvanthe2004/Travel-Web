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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWsqRWp8OBxoz7b-UdIV2J-OQ7wmXIdB2QRNUjm6d_rGN_pR0oyy4mIKM7h_SP_skqHvT1M06Q-kCAwHllmT3mq381yeW0vGVoLdlp9d1kuB87NPcqp2WzUb2cQYrLx6fHSlpU5fbEV1T-jANnEuPO3zPzwlkKML-JgrtxgPJYz9m7CDb8FdckM9oLlO9RNBDA-1aCthtqZX7ogRhc7T6xVpQwXrBcsauosQH9CeDhpiYvA1pm_dhYinnfNPAm8A2UviQ2UACCEto"
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWepiZqho1gClqxvJkfxYJ8qgEb5EJz17WT0W1XOmumg_vZUxLdroP76HVHGqtJQzDy8kbgAc8XCDTQ5rLhH2k-O_-pKTpJsu1M_TJWDdu2hlbbvJuu58hUFLIh_su63mElpHOpruJppBrlS-HkuEb2zY5fqbp-3DhR3yQhWe_VcF9vYt42crF7l5rlyd-_yP3tlnpDAfRFR4xlNN7Ew_cxpfcC-kJy3so5wNQwc86g9lUhIxL7DWQfYTQJ_M_yF6T_2Lj_lt-l4Y"
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQmxakf5U9ij8ImQzCgcMacZ3xm5qdni0ZikRiIGfly8f7kWq3U5YHCBVtXrKwrfuocmuYjnT-zxL6Pp48u3K9Ui_cHBSriA0DdgFW2tLzdko3Y4Rgr3skGAOt1ws2uB-YGZojb9Dz0xmL_nlxMn4bOTI6-5Elo3gFVqva2tUNehZiiM6Mf1MllvDf5XV0nn0tAu-bFBBQi7WoxI-0HCLb76796Pei6KCRYrGGhFp0BcySXndJ7q4dEuoyEaqumVTFMZZ7XMKbsqQ"
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNOljZF1kefUPm6XYUl104VwvEffISHTrlTE_f5_fzDhbAp3oUdwzEDzzAtAs7JOzh4eUMoMQddDXoNtup-V1qI2LdJlyV4rqHSpzXjiKc0-UmY4cZXjqOVEdxxAqNsCIdgNQw8wIO5U3tRdXTF1paPiSTph2UvxDv4X03CWzog69tLzlHDmOudse7x3pPJJkeCahCZtgRzFecvqgCrgbUhIQDDLPZ6fL7qISiK7ENTqHmvetEXUgy9I3DIMhsZG6cSgLyO3W8FPw"
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
