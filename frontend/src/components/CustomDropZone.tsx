import type React from "react";
import { useState, useEffect } from "react";
import { uploadFile } from "../services/file";
import { CLOUDINARY_URL } from "../constants";
import { toast } from "react-toastify";
import { CustomDropZoneProps } from "../types";

const CustomDropZone: React.FC<CustomDropZoneProps> = ({
  value,
  onChange,
  onRemove,
  className = "",
  maxSize = 10,
  accept = "image/*",
  disabled = false,
  label = "Image",
  description,
  previewUrl,
}) => {
  const [preview, setPreview] = useState<string | null>(
    previewUrl || value || null,
  );
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setPreview(previewUrl || value || null);
  }, [previewUrl, value]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || disabled) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    try {
      setIsUploading(true);
      const res = await uploadFile(file);
      const uploadedUrl = res.data.name;
      setPreview(uploadedUrl);
      onChange(uploadedUrl);
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    if (disabled) return;
    setPreview(null);
    onChange("");
    onRemove();
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-slate-900 mb-1">
          {label}
        </label>
      )}

      {description && (
        <p className="text-xs text-slate-500 mb-3">{description}</p>
      )}

      <div className="space-y-4">
        {preview && (
          <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-slate-200">
            <img
              src={
                preview.startsWith("http")
                  ? preview
                  : `${CLOUDINARY_URL}${preview}`
              }
              alt="Preview"
              className="w-full h-full object-cover"
            />

            {!disabled && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-lg"
                disabled={isUploading}
              >
                <span className="material-symbols-outlined text-[20px]">
                  delete
                </span>
              </button>
            )}
          </div>
        )}

        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all
            ${
              disabled || isUploading
                ? "border-slate-300 bg-slate-50 cursor-not-allowed"
                : "border-slate-300 hover:border-[#0F8FA0] hover:bg-[#0F8FA0]/5 cursor-pointer"
            }`}
          onClick={() => {
            if (!disabled && !isUploading) {
              document.getElementById("imageInput")?.click();
            }
          }}
        >
          <input
            id="imageInput"
            type="file"
            accept={accept}
            onChange={handleImageChange}
            className="hidden"
            disabled={disabled || isUploading}
          />

          <div className="flex flex-col items-center">
            {isUploading ? (
              <>
                <div className="w-14 h-14 border-4 border-[#0F8FA0] border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-sm font-medium text-slate-700">
                  Uploading...
                </p>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[56px] text-slate-400 mb-3">
                  cloud_upload
                </span>
                <p className="text-sm font-medium text-slate-700 mb-1">
                  Click to upload image
                </p>
                <p className="text-xs text-slate-400">
                  {accept} • Max {maxSize}MB
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
