import { Shield } from "lucide-react";

const LeftSide: React.FC = () => {

  return (
    <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-8 xl:p-20 overflow-hidden bg-[#1c140d]">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-[20s] ease-in-out hover:scale-105"
          style={{ backgroundImage: "url('/images/bg-register.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      <div className="relative z-10 max-w-xl mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10  border border-white/20 text-xs font-bold text-white mb-6 uppercase tracking-wider">
          <Shield className="w-4 h-4" />
          Premium Access
        </div>
        <h1 className="text-3xl xl:text-5xl font-extrabold text-white leading-tight mb-4 sm:mb-6 tracking-tight">
          Unlock Exclusive Deals & Dream Stays
        </h1>
        <p className="text-base xl:text-lg text-gray-200 leading-relaxed font-medium">
          Join over 2 million travelers. Save up to 20% on your first booking and discover hidden gems worldwide.
        </p>
      </div>
    </div>
  );
};
export default LeftSide;