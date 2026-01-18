import type React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border-light pt-16 pb-8 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4 pr-8">
            <div className="flex items-center gap-2">
              <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
                <img src="/icons/logo.svg" alt="" />
              </div>
              <h4 className="text-lg font-bold text-text-main">Vista Stays</h4>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs text-gray-600">
              Your trusted companion for finding the perfect stay. From cozy
              cottages to luxury resorts, we have it all.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-text-main">Company</h5>
            <div className="flex flex-col gap-2 text-gray-600">
              <a
                className="text-sm text-text-muted hover:text-primary"
                href="#"
              >
                About Us
              </a>
              <a
                className="text-sm text-text-muted hover:text-primary"
                href="#"
              >
                Careers
              </a>
              <a
                className="text-sm text-text-muted hover:text-primary"
                href="#"
              >
                Press
              </a>
              <a
                className="text-sm text-text-muted hover:text-primary"
                href="#"
              >
                Blog
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-text-main">Support</h5>
            <div className="flex flex-col gap-2 text-gray-600">
              <a
                className="text-sm text-text-muted hover:text-primary"
                href="#"
              >
                Help Center
              </a>
              <a
                className="text-sm text-text-muted hover:text-primary"
                href="#"
              >
                Safety
              </a>
              <a
                className="text-sm text-text-muted hover:text-primary"
                href="#"
              >
                Cancellation
              </a>
              <a
                className="text-sm text-text-muted hover:text-primary"
                href="#"
              >
                COVID-19 Response
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-text-main">Legal</h5>
            <div className="flex flex-col gap-2 text-gray-600">
              <a
                className="text-sm text-text-muted hover:text-primary"
                href="#"
              >
                Terms
              </a>
              <a
                className="text-sm text-text-muted hover:text-primary"
                href="#"
              >
                Privacy
              </a>
              <a
                className="text-sm text-text-muted hover:text-primary"
                href="#"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2024 HotelStay Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              className="text-gray-400 hover:text-primary transition-colors"
              href="#"
            >
              <span className="sr-only">Facebook</span>
              <img src="/icons/facebook.svg" alt="" />
            </a>
            <a
              className="text-gray-400 hover:text-primary transition-colors"
              href="#"
            >
              <span className="sr-only">Google</span>
              <img src="/icons/google.svg" alt="" />
            </a>
            <a
              className="text-gray-400 hover:text-primary transition-colors"
              href="#"
            >
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
