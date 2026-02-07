import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FolderPlus, MapPin } from "lucide-react";
import { Location } from "../../types/location";
import { HotelFormData, hotelSchema } from "../../validations/hotel";
import { HotelStatus } from "../../constants";
import CustomDropZone from "../ui/CustomDropZone";
import { callGetAllLocation } from "../../services/location";
import { callCreateHotel } from "../../services/hotel";
import { toast } from "react-toastify";

const CreateHotel: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      address: "",
      description: "",
      images: [],
      status: HotelStatus.OPEN,
      locationId: "",
    },
  });

  const watchImages = watch("images");

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoadingLocations(true);
      try {
        const response = await callGetAllLocation(1, 10);
        setLocations(response.data?.data || []);
      } catch (error) {
        toast.error("Failed to load locations");
      } finally {
        setIsLoadingLocations(false);
      }
    };
    fetchLocations();
  }, []);

  const updateImage = (index: number, url: string) => {
    const updatedImages = [...watchImages];
    updatedImages[index] = url;
    setValue("images", updatedImages, { shouldValidate: true });
  };

  const removeImage = (index: number) => {
    const updatedImages = watchImages.filter((_, i) => i !== index);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  const addImageSlot = () => {
    if (watchImages.length < 10) {
      setValue("images", [...watchImages, ""], { shouldValidate: false });
    }
  };

  const onSubmit = async (data: HotelFormData) => {
    try {
      await callCreateHotel(data);
      toast.success("Hotel created successfully!");
      navigate("/hotels");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-4 sm:pb-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Add New Hotel
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Create a new hotel property with detailed information
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
            {/* Hotel Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Hotel Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name")}
                className="block w-full px-4 py-3 bg-white  text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:border focus:outline-none transition-all"
                placeholder="Enter hotel name..."
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("address")}
                className="block w-full px-4 py-3 bg-white text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:border focus:outline-none transition-all"
                placeholder="Enter hotel address..."
              />
              {errors.address && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="block w-full px-4 py-3 bg-white text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:border focus:outline-none transition-all resize-none"
                placeholder="Enter hotel description..."
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Location and Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <MapPin className="w-4 h-4 inline mr-1.5 mb-0.5" />
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("locationId")}
                  disabled={isLoadingLocations}
                  className="block w-full px-4 py-3 bg-white text-slate-900 rounded-xl text-sm focus:border focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select location</option>
                  {locations.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.name}
                    </option>
                  ))}
                </select>
                {errors.locationId && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.locationId.message}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("status")}
                  className="block w-full px-4 py-3 bg-white text-slate-900 rounded-xl text-sm focus:border focus:outline-none transition-all"
                >
                  <option value="">Select status</option>
                  {Object.values(HotelStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* Hotel Images */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Hotel Images <span className="text-red-500">*</span>
              </label>
              <p className="text-slate-500 text-sm mb-4">
                Upload up to 10 high-quality images of your hotel
              </p>

              <div className="space-y-6">
                {/* Display existing images */}
                {watchImages.map((imageUrl, index) => (
                  <CustomDropZone
                    key={index}
                    label={`Image ${index + 1}`}
                    description=""
                    value={imageUrl}
                    onChange={(url) => updateImage(index, url)}
                    onRemove={() => removeImage(index)}
                    accept="image/*"
                  />
                ))}

                {/* Add new image button */}
                {watchImages.length < 10 && (
                  <button
                    type="button"
                    onClick={addImageSlot}
                    className="w-full py-12 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-[#0F8FA0] hover:text-[#0F8FA0] hover:bg-[#0F8FA0]/5 transition-all flex flex-col items-center justify-center gap-3"
                  >
                    <span className="material-symbols-outlined text-[40px]">
                      <FolderPlus />
                    </span>
                    <span className="text-sm font-semibold">Add Image</span>
                    <span className="text-xs text-slate-400">
                      {watchImages.length}/10 images uploaded
                    </span>
                  </button>
                )}
              </div>

              {errors.images && (
                <p className="mt-3 text-sm text-red-500">
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/hotels")}
              className="px-8 py-3 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-[#0F8FA0] text-white text-sm font-semibold rounded-xl hover:bg-[#0E7A88] transition-all shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">
                    check
                  </span>
                  <span>Create Hotel</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateHotel;
