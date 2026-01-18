import type React from "react";

const Newsletter: React.FC = () => {
  return (
    <section className="bg-[#1c140d] py-16 px-6">
      <div className="max-w-[960px] mx-auto text-center flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2">
          <h3 className="text-white text-3xl font-bold">
            Save time, save money!
          </h3>
          <p className="text-gray-400">
            Sign up and we'll send the best deals to you.
          </p>
        </div>
        <div className="w-full max-w-lg flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 rounded-3xl h-14 px-6 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="Your email address"
            type="email"
          />
          <button className="h-14 px-8 rounded-3xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-primary/20">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};
export default Newsletter;
