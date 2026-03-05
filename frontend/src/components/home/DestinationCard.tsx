import type React from "react";
import { useEffect, useState } from "react";
import { callGetAllLocation } from "../../services/location";
import { toast } from "react-toastify";
import LoadingPage from "../ui/LoadingPage";
import { Location } from "../../types/location";
import { CLOUDINARY_URL } from "../../constants";
import { ArrowRight } from "lucide-react";

const DestinationCard: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await callGetAllLocation(1, 100);
      setLocations(response.data?.data || []);
    } catch (error) {
      toast.error("Failed to load locations");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <section className="py-12 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-text-main">
              New Location
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
              <ArrowRight />
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {locations.slice(0, 4).map((location) => (
            <div
              key={location._id}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={`${CLOUDINARY_URL}/${location?.images?.[0]}`}
                alt={location?.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h4 className="text-white text-xl font-bold">
                  {location?.name}
                </h4>
                <p className="text-white/80 text-sm mt-1">1,240 properties</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default DestinationCard;
