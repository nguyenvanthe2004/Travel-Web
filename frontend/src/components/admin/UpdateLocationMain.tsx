import type React from "react";
import { useEffect, useState } from "react";
import {
  callGetLocationById,
  callUpdateLocation,
} from "../../services/location";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import CustomDropZone from "../CustomDropZone";

const UpdateLocationMain: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchLocationById = async () => {
      try {
        const { data } = await callGetLocationById(id);
        setName(data.name);
        setImageUrl(data.image);
      } catch (error) {
        toast.error("Failed to load location");
      }
    };
    fetchLocationById();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!imageUrl) {
      toast.error("Please upload a location image");
      return;
    }

    try {
      await callUpdateLocation(id, name, imageUrl);
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Location Name */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2 sm:mb-3">
                Location Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border rounded-lg sm:rounded-xl text-sm placeholder:text-slate-400 focus:border-[#0F8FA0] focus:ring-2 focus:ring-[#0F8FA0]/20 focus:outline-none transition-all"
                placeholder="Enter location name..."
                required
              />
            </div>

            {/* Location Image */}
            <CustomDropZone
              onImageUploaded={setImageUrl}
              initialImage={imageUrl}
              label="Location Image"
              required={true}
            />
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
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#0F8FA0] text-white text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-[#0E7A88] transition-all shadow-md hover:shadow-lg"
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