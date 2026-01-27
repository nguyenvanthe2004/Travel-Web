import type React from "react";
import { useState } from "react";
import { uploadFile } from "../services/file";
import { CLOUDINARY_URL } from "../constants";
import { toast } from "react-toastify";

const CustomDropZone: React.FC<{
  onImageUploaded: (imageUrl: string) => void;
  initialImage?: string;
  label?: string;
  required?: boolean;
  maxSizeMB?: number;
  acceptedFormats?: string;
}> = ({
  onImageUploaded,
  initialImage = "",
  label = "Image",
  required = false,
  maxSizeMB = 10,
  acceptedFormats = "PNG, JPG, WEBP",
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(initialImage);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast.error(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    try {
      setIsUploading(true);
      const res = await uploadFile(file);
      const uploadedUrl = res.data.name;
      setPreviewUrl(uploadedUrl);
      onImageUploaded(uploadedUrl);
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");
    onImageUploaded("");
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
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
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
              disabled={isUploading}
            >
              <span className="material-symbols-outlined text-[20px]">
                delete
              </span>
            </button>
          </div>
        )}

        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
            isUploading
              ? "border-slate-300 bg-slate-50 cursor-not-allowed"
              : "hover:border-[#0F8FA0] hover:bg-[#0F8FA0]/5 border-slate-300"
          }`}
          onClick={() => {
            if (!isUploading) {
              document.getElementById("imageInput")?.click();
            }
          }}
        >
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isUploading}
          />
          <div className="flex flex-col items-center">
            {isUploading ? (
              <>
                <div className="w-14 h-14 border-4 border-[#0F8FA0] border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-sm text-slate-700 font-medium">
                  Uploading...
                </p>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[56px] text-slate-400 mb-3">
                  cloud_upload
                </span>
                <p className="text-sm text-slate-700 font-medium mb-1">
                  Click to upload image
                </p>
                <p className="text-xs text-slate-400">
                  {acceptedFormats} up to {maxSizeMB}MB
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDropZone;