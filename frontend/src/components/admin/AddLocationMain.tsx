import type React from "react";
import { useState } from "react";
import { uploadFile } from "../../services/file";
import { CLOUDINARY_URL } from "../../constants";
import { callCreateLocation } from "../../services/location";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddLocationMain: React.FC = () => {
  const [name, setName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const navigate = useNavigate();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const res = await uploadFile(file);
      setPreviewUrl(res.data.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await callCreateLocation(name, previewUrl);
      toast.success("Location created successfully!");
      navigate("/locations");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-4 sm:pb-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Add New Location
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Create a new property location with basic information
          </p>
        </div>

        {/* Form */}
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
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={`block w-full px-4 py-3 bg-white border  rounded-xl text-sm placeholder:text-slate-400 focus:border-[#0F8FA0] focus:ring-2 focus:ring-[#0F8FA0]/20 focus:outline-none transition-all`}
                placeholder="Enter location name..."
              />
            </div>

            {/* Location Image */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Location Image <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                {previewUrl && (
                  <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-slate-200">
                    <img
                      src={`${CLOUDINARY_URL}${previewUrl}`}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl("");
                      }}
                      className="absolute top-3 right-3 p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                )}

                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center hover:border-[#0F8FA0] hover:bg-[#0F8FA0]/5 transition-all cursor-pointer`}
                  onClick={() => document.getElementById("imageInput")?.click()}
                >
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-[56px] text-slate-400 mb-3">
                      cloud_upload
                    </span>
                    <p className="text-sm text-slate-700 font-medium mb-1">
                      Click to upload image
                    </p>
                    <p className="text-xs text-slate-400">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-end gap-4">
            <button
              type="button"
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
