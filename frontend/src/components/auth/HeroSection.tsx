import { MapPin, Star } from "lucide-react";
import type React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105" 
        style={{ 
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCQybI1PaXKdkzL-SGnighNpp5puxOXGtC4Rny6ZBMVkxxmUCimM0PjdqJk0rxYeqoyIo4_AIOhhYbmiPfPRmhqQrFi6I1pVz0-jx5XL6aK0ErM9PzO-LoXn2PRS0kKQ9ZTOGV-kFtB2AqbnGpTBR26p_1DL5WLC_IH14KDozY6jmbpdXeZoBl2q-0ApfQ_X5xt6P9ENrfUlAZ4-00Uh-SVJy8Jyi-tWl4TK2Gi70zFx3QcijOiSKP9O71JBporamnMWuDj9xvfAY')" 
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      
      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-12 xl:p-16 text-white z-20">
        <div className="max-w-xl">
          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-5 h-5 fill-[#f8941f] text-[#f8941f]" 
              />
            ))}
            <span className="ml-2 text-sm font-bold tracking-wider uppercase text-white/90">
              PREMIUM CHOICE
            </span>
          </div>

          {/* Quote */}
          <blockquote className="text-3xl xl:text-4xl font-bold leading-tight mb-8">
            "The journey of a thousand miles begins with a single step. Or in this case, a single click."
          </blockquote>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
              <img 
                className="h-full w-full object-cover" 
                alt="Sarah Jenkins"
                src="/images/avatar-forgot.png"
              />
            </div>
            <div>
              <p className="font-bold text-lg">Sarah Jenkins</p>
              <p className="text-sm text-white/70">Global Traveler & Reviewer</p>
            </div>
          </div>

          {/* Location Tag */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              BALI, INDONESIA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;