import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, Loader2, X } from "lucide-react";
import { Location } from "../../types/location";
import { HotelFormData, hotelSchema } from "../../validations/hotel";
import { HotelStatus } from "../../constants";
import DropZone from "../ui/Dropzone";
import { callGetAllLocation } from "../../services/location";
import { callGetHotelById, callUpdateHotel } from "../../services/hotel";
import { uploadMultiple } from "../../services/file";
import { toast } from "react-toastify";

const DetailHotel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [locations, setLocations] = useState<Location[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loadingHotel, setLoadingHotel] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const watchImages = watch("images") || [];

  useEffect(() => {
    const fetchLocations = async () => {
      setLoadingLocations(true);
      try {
        const response = await callGetAllLocation(1, 100);
        setLocations(response.data?.data || []);
      } catch (error) {
        toast.error("Failed to load locations");
        console.error(error);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;

      setLoadingHotel(true);
      try {
        const { data } = await callGetHotelById(id);

        setValue("name", data.name);
        setValue("address", data.address);
        setValue("description", data.description);
        setValue("status", data.status);
        setValue("locationId", data.locationId?._id || "");
        setValue("images", data.images || []);
      } catch (error: any) {
        console.error("Fetch hotel error:", error);
        toast.error(error?.response?.data?.message || "Failed to load hotel");
        navigate("/my-hotel");
      } finally {
        setLoadingHotel(false);
      }
    };

    fetchHotel();
  }, [id, setValue, navigate]);

  const handleFilesChange = (files: File[]) => {
    const totalImages = watchImages.length + files.length;

    if (totalImages > 10) {
      toast.error(
        `Maximum 10 images allowed. You can add ${10 - watchImages.length} more.`,
      );
      return;
    }

    setSelectedFiles(files);
  };

  const removeOldImage = (index: number) => {
    const updated = watchImages.filter((_, i) => i !== index);
    setValue("images", updated, { shouldValidate: true });
  };

  const onSubmit = async (data: HotelFormData) => {
    if (!id) return;

    try {
      let uploadedUrls: string[] = [];

      if (selectedFiles.length > 0) {
        setIsUploading(true);
        const uploadResponse = await uploadMultiple(selectedFiles);
        uploadedUrls = uploadResponse.data.map((item: any) => item.name);
      }

      const finalImages = [...data.images, ...uploadedUrls];

      if (finalImages.length === 0) {
        toast.error("At least one image is required");
        return;
      }

      if (finalImages.length > 10) {
        toast.error("Maximum 10 images allowed");
        return;
      }

      const finalData = {
        ...data,
        images: finalImages,
      };

      await callUpdateHotel(id, finalData);

      toast.success("Hotel updated successfully!");
      navigate("/my-hotel");
    } catch (error: any) {
      console.error("Update hotel error:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Update failed",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const isProcessing = isSubmitting || isUploading;

  if (loadingHotel) {
    return (
      <main className="flex-1 overflow-y-auto bg-slate-50 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#0F8FA0] mx-auto mb-4" />
          <p className="text-slate-600">Loading hotel data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Update Hotel
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Update your hotel information
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-black"
        >
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Hotel Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                disabled={isProcessing}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter hotel name..."
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    error
                  </span>
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
                {...register("address")}
                disabled={isProcessing}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter hotel address..."
              />
              {errors.address && (
                <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
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
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter hotel description..."
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
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
                  <MapPin className="w-4 h-4 inline mr-1 mb-0.5" />
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("locationId")}
                  disabled={loadingLocations || isProcessing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {loadingLocations ? "Loading..." : "Select location"}
                  </option>
                  {locations.map((loc) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                {errors.locationId && (
                  <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {Object.values(HotelStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
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
                label="Images"
                value={selectedFiles}
                onChange={handleFilesChange}
                existingImages={watchImages}
                onRemoveExisting={removeOldImage}
                accept="image/*"
                disabled={isProcessing}
                maxFiles={10}
                maxSize={10}
              />

              {errors.images && (
                <p className="text-sm text-red-500 mt-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    error
                  </span>
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/my-hotel")}
              disabled={isProcessing}
              className="px-8 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex items-center gap-2 px-8 py-3 bg-[#0F8FA0] text-white rounded-xl hover:bg-[#0E7A88] transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed min-w-[160px] justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">
                    check
                  </span>
                  <span>Update Hotel</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default DetailHotel;
