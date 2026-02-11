import type React from "react";
import { useState } from "react";
import { callCreateLocation } from "../../services/location";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LocationFormData, locationSchema } from "../../validations/location";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DropZone from "../ui/Dropzone";
import { uploadMultiple } from "../../services/file";

const CreateLocation: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    mode: "onChange",
  });

  const handleFilesChange = (files: File[]) => {
    setSelectedFiles(files);
    setValue(
      "images",
      files.map((_, index) => `temp_${index}`),
      { shouldValidate: true },
    );
  };

  const onSubmit = async (data: LocationFormData) => {
    try {
      if (selectedFiles.length === 0) {
        toast.error("Please select at least one image");
        return;
      }

      if (selectedFiles.length > 10) {
        toast.error("Maximum 10 images allowed");
        return;
      }

      setIsUploading(true);
      const uploadResponse = await uploadMultiple(selectedFiles);
      const uploadedUrls = uploadResponse.data.map((item: any) => item.name);

      const locationData = {
        ...data,
        images: uploadedUrls,
      };
      await callCreateLocation(locationData);
      toast.success("Location created successfully!");
      navigate("/locations");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };
  const isProcessing = isSubmitting || isUploading;

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-4 sm:pb-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Add New Location
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Create a new property location with basic information
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
            {/* Location Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Location Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name")}
                disabled={isProcessing}
                className="block w-full px-4 py-3 bg-white border rounded-xl text-sm placeholder:text-slate-400 focus:border-[#0F8FA0] focus:ring-2 focus:ring-[#0F8FA0]/20 focus:outline-none transition-all"
                placeholder="Enter location name..."
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Location Image */}
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
              <p className="text-sm text-red-500">{errors.images.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/locations")}
              className="px-8 py-3 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-[#0F8FA0] text-white text-sm font-semibold rounded-xl hover:bg-[#0E7A88] transition-all shadow-md hover:shadow-lg disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[20px]">
                check
              </span>
              Create Location
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateLocation;
