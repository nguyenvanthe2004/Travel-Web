import React, { useState, useEffect } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { CLOUDINARY_URL } from "../../constants";

interface DropZoneProps {
  value: File[];
  existingImages?: string[];
  onChange: (files: File[]) => void;
  onRemoveExisting?: (index: number) => void;
  label?: string;
  description?: string;
  accept?: string;
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
}

const DropZone: React.FC<DropZoneProps> = ({
  value = [],
  existingImages = [],
  onChange,
  onRemoveExisting,
  label,
  description,
  accept = "image/*",
  disabled = false,
  maxFiles = 10,
  maxSize = 10,
}) => {
  const [preview, setPreview] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const urls = value.map((file) => URL.createObjectURL(file));
    setPreview(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [value]);

  const totalImages = existingImages.length + preview.length;

  const validateFiles = (files: File[]): { valid: File[]; error?: string } => {
    const maxSizeBytes = maxSize * 1024 * 1024;
    const validFiles: File[] = [];

    for (const file of files) {
      if (file.size > maxSizeBytes) {
        return {
          valid: [],
          error: `File ${file.name} exceeds ${maxSize}MB limit`,
        };
      }

      if (accept && !file.type.match(accept.replace("*", ".*"))) {
        return {
          valid: [],
          error: `File ${file.name} is not valid`,
        };
      }

      validFiles.push(file);
    }

    if (totalImages + validFiles.length > maxFiles) {
      return {
        valid: [],
        error: `Maximum ${maxFiles} files allowed`,
      };
    }

    return { valid: validFiles };
  };

  const handleChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError("");
    const fileArray = Array.from(files);
    const { valid, error: validationError } = validateFiles(fileArray);

    if (validationError) {
      setError(validationError);
      return;
    }

    onChange([...value, ...valid]);
  };

  const handleRemoveNew = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setError("");
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const handleRemoveExisting = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setError("");
    onRemoveExisting?.(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Only set to false if we're leaving the dropzone entirely
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (
      x <= rect.left ||
      x >= rect.right ||
      y <= rect.top ||
      y >= rect.bottom
    ) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!disabled) {
      handleChange(e.dataTransfer.files);
    }
  };

  const getImageSrc = (img: string) => {
    if (img.startsWith("blob:") || img.startsWith("http")) return img;
    return `${CLOUDINARY_URL}/${img}`;
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          <span className="ml-1 text-red-500">*</span>
          <span className="ml-2 text-xs font-normal text-gray-500">
            (Max {maxFiles} files, {maxSize}MB each)
          </span>
        </label>
      )}

      {description && (
        <p className="text-sm text-gray-600 mb-3">{description}</p>
      )}

      {/* Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg transition-all duration-300 ease-in-out
          ${
            isDragging
              ? "border-blue-500 bg-blue-50 shadow-lg"
              : error
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }
          ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer"}
          ${totalImages > 0 ? "p-8" : "p-12"}
        `}
      >
        <input
          type="file"
          multiple
          accept={accept}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        <div className="flex flex-col items-center justify-center text-center pointer-events-none">
          <div
            className={`
              mb-3 p-4 rounded-full transition-all duration-300
              ${
                isDragging
                  ? "bg-blue-100"
                  : error
                    ? "bg-red-100"
                    : "bg-gray-100"
              }
            `}
          >
            {isDragging ? (
              <ImageIcon className="text-blue-600 animate-bounce" size={32} />
            ) : totalImages > 0 ? (
              <ImageIcon
                className={error ? "text-red-600" : "text-gray-600"}
                size={28}
              />
            ) : (
              <Upload
                className={error ? "text-red-600" : "text-gray-600"}
                size={28}
              />
            )}
          </div>

          <p
            className={`
              text-sm font-semibold mb-1 transition-all duration-300
              ${isDragging ? "text-blue-600" : "text-gray-700"}
            `}
          >
            {isDragging
              ? "Drop files here!"
              : totalImages > 0
                ? "Add more images"
                : "Click to upload or drag and drop"}
          </p>

          <p className="text-xs text-gray-500 mb-2">
            PNG, JPG, GIF up to {maxSize}MB
          </p>

          <p
            className={`
              text-xs font-medium transition-colors duration-200
              ${
                totalImages >= maxFiles
                  ? "text-amber-600"
                  : totalImages > 0
                    ? "text-blue-600"
                    : "text-gray-600"
              }
            `}
          >
            {totalImages} / {maxFiles} images
            {preview.length > 0 && ` (${preview.length} new)`}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
          <p className="text-sm text-red-600 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            {error}
          </p>
        </div>
      )}

      {/* Max files reached warning */}
      {totalImages >= maxFiles && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            Maximum {maxFiles} images reached. Remove some to upload new ones.
          </p>
        </div>
      )}

      {/* Preview Grid */}
      {(existingImages.length > 0 || preview.length > 0) && (
        <div className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Existing Images */}
            {existingImages.map((img, index) => (
              <div
                key={`existing-${index}`}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group shadow-sm border-2 border-green-200 hover:border-green-300 transition-all duration-200 animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={getImageSrc(img)}
                  alt={`Existing ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300"
                />

                {/* Badge */}
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md font-medium">
                  Uploaded
                </div>

                {/* Remove button */}
                {onRemoveExisting && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveExisting(e, index)}
                    disabled={disabled}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full 
                             opacity-0 group-hover:opacity-100 transition-all duration-200
                             hover:bg-red-600 focus:outline-none focus:ring-2 
                             focus:ring-red-500 focus:ring-offset-2 shadow-lg
                             disabled:cursor-not-allowed disabled:opacity-50 z-10"
                    aria-label="Remove existing image"
                  >
                    <X size={14} />
                  </button>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 pointer-events-none" />
              </div>
            ))}

            {/* New Images */}
            {preview.map((img, index) => (
              <div
                key={`new-${index}`}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group shadow-sm border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 animate-fadeIn"
                style={{
                  animationDelay: `${(existingImages.length + index) * 50}ms`,
                }}
              >
                <img
                  src={img}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300"
                />

                {/* Badge */}
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-md font-medium">
                  New
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => handleRemoveNew(e, index)}
                  disabled={disabled}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full 
                           opacity-0 group-hover:opacity-100 transition-all duration-200
                           hover:bg-red-600 focus:outline-none focus:ring-2 
                           focus:ring-red-500 focus:ring-offset-2 shadow-lg
                           disabled:cursor-not-allowed disabled:opacity-50 z-10"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-xs text-white truncate font-medium">
                    {value[index]?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;
