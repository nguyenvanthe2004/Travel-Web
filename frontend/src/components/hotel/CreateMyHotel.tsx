import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { MapPin, Loader2 } from "lucide-react";
import { Location } from "../../types/location";
import { HotelFormData, hotelSchema } from "../../validations/hotel";
import { HotelStatus } from "../../constants";
import { callGetAllLocation } from "../../services/location";
import { callCreateHotel } from "../../services/hotel";
import { toast } from "react-toastify";
import DropZone from "../ui/Dropzone";
import { uploadMultiple } from "../../services/file";

const CreateMyHotel: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
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

  useEffect(() => {
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
    fetchLocations();
  }, []);

  const handleFilesChange = (files: File[]) => {
    setSelectedFiles(files);
    setValue(
      "images",
      files.map((_, index) => `temp_${index}`),
      { shouldValidate: true },
    );
  };

  const onSubmit = async (data: HotelFormData) => {
    try {
      setIsUploading(true);
      const uploadResponse = await uploadMultiple(selectedFiles);
      const uploadedUrls = uploadResponse.data.map((item: any) => item.name);

      const hotelData = {
        ...data,
        images: uploadedUrls,
      };

      await callCreateHotel(hotelData);

      toast.success("Hotel created successfully!");
      navigate("/my-hotel");
    } catch (error: any) {
      console.error("Create hotel error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create hotel",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const isProcessing = isSubmitting || isUploading;

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Add New Hotel
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Create a new hotel property with detailed information
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
            {/* Hotel Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Hotel Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name")}
                disabled={isProcessing}
                className="block w-full px-4 py-3 bg-white border border-slate-300 text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter hotel name..."
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    error
                  </span>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("address")}
                disabled={isProcessing}
                className="block w-full px-4 py-3 bg-white border border-slate-300 text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter hotel address..."
              />
              {errors.address && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    error
                  </span>
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                rows={4}
                disabled={isProcessing}
                className="block w-full px-4 py-3 bg-white border border-slate-300 text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter hotel description..."
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    error
                  </span>
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <MapPin className="w-4 h-4 inline mr-1.5 mb-0.5" />
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("locationId")}
                  disabled={loading || isProcessing}
                  className="block w-full px-4 py-3 bg-white border border-slate-300 text-slate-900 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {loading ? "Loading..." : "Select location"}
                  </option>
                  {locations.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.name}
                    </option>
                  ))}
                </select>
                {errors.locationId && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">
                      error
                    </span>
                    {errors.locationId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("status")}
                  disabled={isProcessing}
                  className="block w-full px-4 py-3 bg-white border border-slate-300 text-slate-900 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {Object.values(HotelStatus).map((status) => (
                    <option key={status} value={status}>
                      <span>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">
                      error
                    </span>
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <DropZone
                value={selectedFiles}
                onChange={handleFilesChange}
                label="Images"
                accept="image/*"
                disabled={isProcessing}
                maxFiles={10}
                maxSize={10}
              />
              {errors.images && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    error
                  </span>
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/my-hotel")}
              disabled={isProcessing}
              className="px-8 py-3 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex items-center gap-2 px-8 py-3 bg-[#0F8FA0] text-white text-sm font-semibold rounded-xl hover:bg-[#0E7A88] transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed min-w-[160px] justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
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

export default CreateMyHotel;
