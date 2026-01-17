import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  updateAvatar,
  updatePassword,
  updateProfile,
} from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { setCurrentUser } from "../../redux/slices/currentUser";
import { toastError, toastSuccess } from "../../lib/toast";
import { uploadFile } from "../../services/file";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updatePasswordSchema,
  type UpdatePasswordFormData,
} from "../../validations/auth";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

const MainContent: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.currentUser);

  const [avatar, setAvatar] = useState(user.avatar);

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onChange",
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];

    try {
      setLoading(true);
      const { data } = await uploadFile(file);
      setAvatar(data.name);
      await updateAvatar(data.name);
      dispatch(setCurrentUser({ ...user, avatar: data.name }));
    } catch (error) {
      toastError("Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const res = await updateProfile(fullName, phone);
      dispatch(setCurrentUser(res.data.user));
      toastSuccess("Profile updated successfully");
      setFullName("");
      setPhone("");
    } catch (error) {
      toastError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (data: UpdatePasswordFormData) => {
    try {
      setLoading(true);
      await updatePassword(data.oldPassword, data.newPassword);
      toastSuccess("Password updated successfully");
    } catch (error) {
      toastError("Failed to update password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex-1 overflow-y-auto bg-[#fafafa]">
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#1c140d] leading-tight tracking-tight">
            User Profile Settings
          </h1>
          <p className="text-[#9c7349] text-sm mt-1">
            Manage your account details and security preferences for a seamless
            booking experience.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {/* Profile Photo Section */}
          <div className="bg-white rounded-2xl border border-[#e8dbce] p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <div
                  className="size-28 rounded-full border-4 border-[#f4ede7] overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: avatar
                      ? `url('https://res.cloudinary.com/dfisjw5pt/image/upload/v1768513434/${avatar}')`
                      : "none",
                  }}
                ></div>
                <button
                  onClick={handleAvatarClick}
                  disabled={loading}
                  className="absolute bottom-0 right-0 bg-orange-400 text-white p-2 rounded-full border-2 border-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-base">
                    photo_camera
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
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-[#1c140d]">
                  {user?.fullName || ""}
                </h3>
                <p className="text-[#9c7349] text-xs mb-4">
                  Update your photo and personal information here.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="bg-white rounded-2xl border border-[#e8dbce] overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#e8dbce]">
              <h2 className="text-base font-bold text-[#1c140d]">
                Personal Information
              </h2>
            </div>
            <div className="p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c140d]">
                    Full Name
                  </label>
                  <input
                    className="w-full text-black rounded-lg border border-[#e8dbce] bg-white focus:ring-1 focus:ring-primary px-3 py-2 text-sm"
                    placeholder="Enter your full name"
                    type="text"
                    value={user.fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c140d]">
                    Phone
                  </label>
                  <input
                    className="w-full text-black rounded-lg border border-[#e8dbce] bg-white focus:ring-1 focus:ring-primary focus:border-primary px-3 py-2 text-sm"
                    placeholder="Enter your phone"
                    type="text"
                    value={user.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
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
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2 rounded-lg shadow-md transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Password & Security Section */}
          <div className="bg-white rounded-2xl border border-[#e8dbce] overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#e8dbce] flex justify-between items-center">
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
            <div className="p-8 space-y-5 bg-[#fffbf7]">
              <div className="grid grid-cols-1 gap-5 max-w-2xl">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c140d]">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("oldPassword")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className={`w-full text-black px-4 py-3 pr-12 border rounded-lg focus:outline-none ${
                        errors.oldPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.oldPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#1c140d]">
                      New Password
                    </label>
                    <input
                      {...register("newPassword")}
                      placeholder="Enter new password"
                      type="password"
                      className={`w-full text-black px-4 py-3 pr-12 border rounded-lg focus:outline-none ${
                        errors.newPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500"
                      }`}
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">
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
                      className={`w-full text-black px-4 py-3 pr-12 border rounded-lg focus:outline-none ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500"
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleSubmit(handleUpdatePassword)}
                  disabled={loading}
                  className="bg-[#1c140d] text-white font-semibold text-sm px-6 py-2 rounded-lg transition-all hover:opacity-90"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-2 text-[#9c7349]">
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
export default MainContent;
