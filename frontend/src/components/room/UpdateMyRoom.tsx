import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { RoomStatus } from "../../constants";
import { toast } from "react-toastify";
import DropZone from "../ui/Dropzone";
import { uploadMultiple } from "../../services/file";
import { roomSchema, RoomFormData } from "../../validations/room";
import { callGetRoomById, callUpdateRoom } from "../../services/room";
import LoadingPage from "../ui/LoadingPage";

const UpdateMyRoom: React.FC = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      maxGuests: 0,
      wide: 0,
      status: RoomStatus.AVAILABLE,
      images: [],
    },
  });
  const watchImages = watch("images") || [];

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) return;

      setLoading(true);
      try {
        const { data } = await callGetRoomById(roomId);

        setValue("name", data.name);
        setValue("description", data.description);
        setValue("price", data.price);
        setValue("maxGuests", data.maxGuests);
        setValue("wide", data.wide);
        setValue("status", data.status);
        setValue("images", data.images);
      } catch (error) {
        toast.error("Failed to fetch room");
        navigate("/my-room/by-hotel/" + hotelId);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId, setValue]);

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
  const onSubmit = async (data: RoomFormData) => {
    try {
      setLoading(true);

      let uploadedUrls: string[] = [];

      if (selectedFiles.length > 0) {
        setIsUploading(true);
        const uploadResponse = await uploadMultiple(selectedFiles);
        uploadedUrls = uploadResponse.data.map((item: any) => item.name);
      }

      const finalImages = [...data.images, ...uploadedUrls];

      const roomData = {
        ...data,
        images: finalImages,
        hotelId,
      };

      await callUpdateRoom(roomId as string, roomData);

      toast.success("Room updated successfully!");
      navigate("/my-room/by-hotel/" + hotelId);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update room",
      );
    } finally {
      setLoading(false);
    }
  };

  const isProcessing = isSubmitting || isUploading;

  if (loading) return <LoadingPage />;

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Update Room
          </h2>
          <p className="text-slate-500 text-sm mt-2">Update room information</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Room Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name")}
                disabled={isProcessing}
                className="block w-full px-4 py-3 bg-white border border-slate-300 text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Description */}
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

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                disabled={isProcessing}
                className="block w-full px-4 py-3 bg-white border border-slate-300 text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter room price..."
              />
              {errors.price && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    error
                  </span>
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* MaxGuests */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                MaxGuests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("maxGuests", { valueAsNumber: true })}
                disabled={isProcessing}
                className="block w-full px-4 py-3 bg-white border border-slate-300 text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter max guests..."
              />
              {errors.maxGuests && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    error
                  </span>
                  {errors.maxGuests.message}
                </p>
              )}
            </div>

            {/* Wide */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Wide <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("wide", { valueAsNumber: true })}
                disabled={isProcessing}
                className="block w-full px-4 py-3 bg-white border border-slate-300 text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter room wide..."
              />
              {errors.wide && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    error
                  </span>
                  {errors.wide.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("status")}
                  disabled={isProcessing}
                  className="block w-full px-4 py-3 bg-white border border-slate-300 text-slate-900 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {Object.values(RoomStatus).map((status) => (
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

            {/* Images */}
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
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(`/my-room/by-hotel/${hotelId}`)}
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
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">
                    check
                  </span>
                  <span>Update Room</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateMyRoom;
