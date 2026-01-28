import type React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  callGetLocationById,
  callUpdateLocation,
} from "../../services/location";
import CustomDropZone from "../CustomDropZone";
import { LocationFormData, locationSchema } from "../../validations/location";

const UpdateLocationMain: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  useEffect(() => {
    if (!id) return;

    const fetchLocation = async () => {
      try {
        const { data } = await callGetLocationById(id);
        setValue("name", data.name);
        setValue("image", data.image);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchLocation();
  }, [id, setValue]);

  const imageUrl = watch("image");
  const onSubmit = async (data: LocationFormData) => {
    if (!id) return;

    try {
      await callUpdateLocation(id, data.name, data.image);
      toast.success("Location updated successfully!");
      navigate("/locations");
    } catch (error: any) {
      toast.error(error.message || "Update failed");
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-4 sm:pb-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Update Location
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2">
            Edit and update existing location information
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Location Name */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2 sm:mb-3">
                Location Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                className="block w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border rounded-lg sm:rounded-xl text-sm placeholder:text-slate-400 focus:border-[#0F8FA0] focus:ring-2 focus:ring-[#0F8FA0]/20 focus:outline-none transition-all"
                placeholder="Enter location name..."
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Location Image */}
            <CustomDropZone
              label="Location Image"
              description="Upload Location Image (PNG, JPG, WEBP - Max 5MB)"
              value={imageUrl}
              previewUrl={imageUrl}
              onChange={(url) =>
                setValue("image", url, { shouldValidate: true })
              }
              onRemove={() => setValue("image", "", { shouldValidate: true })}
              maxSize={5}
              accept="image/png, image/jpeg, image/webp"
            />

            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate("/locations")}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#0F8FA0] text-white text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-[#0E7A88] transition-all shadow-md hover:shadow-lg disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                save
              </span>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateLocationMain;
