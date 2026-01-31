import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  callGetCurrentUser,
  callUpdateAvatar,
  callUpdatePassword,
  callUpdateProfile,
} from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { setCurrentUser } from "../../redux/slices/currentUser";
import { toastError, toastSuccess } from "../../lib/toast";
import { uploadFile } from "../../services/file";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updatePasswordSchema,
  UpdateProfileFormData,
  updateProfileSchema,
  type UpdatePasswordFormData,
} from "../../validations/auth";
import { useForm } from "react-hook-form";
import { Camera, Eye, EyeOff } from "lucide-react";
import { CLOUDINARY_URL } from "../../constants";

const ProfileContent: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.currentUser);

  const [avatar, setAvatar] = useState(user?.avatar);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onChange",
  });

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    reset,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        phone: user.phone || "",
      });

      setAvatar(user.avatar);
    }
  }, [user, reset]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];

    try {
      const { data } = await uploadFile(file);
      setAvatar(data.name);
      await callUpdateAvatar(data.name);
      dispatch(setCurrentUser({ ...user, avatar: data.name }));
    } catch (error) {
      toastError("Failed to update avatar");
    }
  };

  const handleUpdateProfile = async (dto: UpdateProfileFormData) => {
    try {
      await callUpdateProfile(dto.fullName, dto.phone);
      const res = await callGetCurrentUser();
      dispatch(setCurrentUser(res.data));
      toastSuccess("Profile updated successfully");
    } catch (error) {
      toastError("Failed to update profile");
    }
  };

  const handleUpdatePassword = async (data: UpdatePasswordFormData) => {
    try {
      await callUpdatePassword(data.oldPassword, data.newPassword);
      toastSuccess("Password updated successfully");
    } catch (error) {
      toastError("Failed to update password");
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#fafafa] lg:ml-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header - với padding top cho mobile để tránh menu button */}
        <div className="mb-6 sm:mb-8 pt-12 lg:pt-0">
          <h1 className="text-2xl sm:text-3xl font-black text-[#1c140d] leading-tight tracking-tight">
            User Profile Settings
          </h1>
          <p className="text-[#9c7349] text-sm mt-1">
            Manage your account details and security preferences for a seamless
            booking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {/* Profile Photo Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e8dbce] p-4 sm:p-6 lg:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="relative group">
                <div className="size-24 sm:size-28 rounded-full border-4 border-[#f4ede7] overflow-hidden bg-cover bg-center">
                  <img
                    src={`${CLOUDINARY_URL}${avatar}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 bg-orange-400 text-white p-2 rounded-full border-2 border-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-base">
                    <Camera />
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </button>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-[#1c140d]">
                  {user?.fullName || ""}
                </h3>
                <p className="text-[#9c7349] text-xs mb-4">
                  Update your photo and personal information here.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e8dbce] overflow-hidden shadow-sm">
            <div className="p-4 sm:p-5 border-b border-[#e8dbce]">
              <h2 className="text-base font-bold text-[#1c140d]">
                Personal Information
              </h2>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c140d]">
                    Full Name
                  </label>
                  <input
                    {...registerProfile("fullName")}
                    maxLength={100}
                    placeholder="Enter your full name"
                    className={`w-full text-black px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none text-sm sm:text-base ${
                      profileErrors.fullName
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {profileErrors.fullName && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {profileErrors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold text-[#1c140d]"
                    htmlFor="phone_profile"
                  >
                    Phone
                  </label>
                  <input
                    id="phone_profile"
                    {...registerProfile("phone")}
                    maxLength={100}
                    placeholder="Enter your phone number"
                    className={`w-full text-black px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none text-sm sm:text-base ${
                      profileErrors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {profileErrors.phone && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {profileErrors.phone.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 lg:col-span-2">
                  <label className="text-xs font-semibold text-[#1c140d]">
                    Email Address{" "}
                    <span className="text-xs font-normal text-[#9c7349]">
                      (Read-only)
                    </span>
                  </label>
                  <input
                    className="w-full rounded-lg border border-[#e8dbce] bg-[#f4ede7] cursor-not-allowed px-3 py-2 text-sm text-[#9c7349]"
                    type="email"
                    value={user?.email || ""}
                    disabled
                  />
                  <p className="text-[10px] text-[#9c7349] italic">
                    Contact support to change your primary account email.
                  </p>
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleProfileSubmit(handleUpdateProfile)}
                  className={`w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-all hover:opacity-90 ${
                    isProfileSubmitting ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isProfileSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

          {/* Password & Security Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e8dbce] overflow-hidden shadow-sm">
            <div className="p-4 sm:p-5 border-b border-[#e8dbce] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h2 className="text-base font-bold text-[#1c140d]">
                  Password &amp; Security
                </h2>
                <p className="text-[10px] text-[#9c7349] mt-0.5">
                  Protect your account with a strong password.
                </p>
              </div>
              <span className="material-symbols-outlined text-primary text-xl">
                security
              </span>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 bg-[#fffbf7]">
              <div className="grid grid-cols-1 gap-4 sm:gap-5 max-w-2xl">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c140d]">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("oldPassword")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className={`w-full text-black px-3 sm:px-4 py-2.5 sm:py-3 pr-12 border rounded-lg focus:outline-none text-sm sm:text-base ${
                        errors.oldPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.oldPassword && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#1c140d]">
                      New Password
                    </label>
                    <input
                      {...register("newPassword")}
                      placeholder="Enter new password"
                      type="password"
                      className={`w-full text-black px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none text-sm sm:text-base ${
                        errors.newPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500"
                      }`}
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#1c140d]">
                      Confirm New Password
                    </label>
                    <input
                      {...register("confirmPassword")}
                      placeholder="Confirm new password"
                      type="password"
                      className={`w-full text-black px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none text-sm sm:text-base ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500"
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleSubmit(handleUpdatePassword)}
                  className={`w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-all hover:opacity-90 ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-2 text-[#9c7349] gap-3">
            <p className="text-[10px]">Member since March 2023</p>
            <div className="flex gap-4">
              <a
                className="text-[10px] hover:underline cursor-pointer"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="text-[10px] hover:underline cursor-pointer"
                href="#"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileContent;