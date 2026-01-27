import type React from "react";
import { useState } from "react";
import { callCreateLocation } from "../../services/location";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomDropZone from "../../components/CustomDropZone";

const AddLocationMain: React.FC = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.error("Please upload a location image");
      return;
    }

    try {
      await callCreateLocation(name, imageUrl);
      toast.success("Location created successfully!");
      navigate("/locations");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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

        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
            {/* Location Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Location Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-3 bg-white border rounded-xl text-sm placeholder:text-slate-400 focus:border-[#0F8FA0] focus:ring-2 focus:ring-[#0F8FA0]/20 focus:outline-none transition-all"
                placeholder="Enter location name..."
                required
              />
            </div>

            {/* Location Image */}
            <CustomDropZone
              onImageUploaded={setImageUrl}
              label="Location Image"
              required={true}
            />
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
              className="flex items-center gap-2 px-8 py-3 bg-[#0F8FA0] text-white text-sm font-semibold rounded-xl hover:bg-[#0E7A88] transition-all shadow-md hover:shadow-lg"
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

export default AddLocationMain;
