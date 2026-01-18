import type React from "react";

const FeatureCard: React.FC = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-3xl text-orange-400">
                price_check
              </span>
            </div>
            <h4 className="text-xl font-bold text-text-main">
              Best Price Guarantee
            </h4>
            <p className="text-text-muted leading-relaxed text-gray-700">
              Find a lower price? We'll match it. You won't find a better deal
              anywhere else online.
            </p>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-3xl text-orange-400">
                support_agent
              </span>
            </div>
            <h4 className="text-xl font-bold text-text-main">
              24/7 Customer Support
            </h4>
            <p className="text-text-muted leading-relaxed text-gray-700">
              Our team is available round the clock to help you with booking
              modifications or questions.
            </p>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-3xl text-orange-400">
                verified_user
              </span>
            </div>
            <h4 className="text-xl font-bold text-text-main">
              100% Secure Booking
            </h4>
            <p className="text-text-muted leading-relaxed text-gray-700">
              We use the latest encryption technology to ensure your personal
              and payment details are safe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;
