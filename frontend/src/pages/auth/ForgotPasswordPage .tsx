import type React from "react";
import FormSection from "../../components/auth/FormSection";
import HeroSection from "../../components/auth/HeroSection";
import AuthLayout from "../../layouts/AuthLayout";

const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="flex min-h-screen w-full overflow-hidden bg-[#fcfaf8]">
        <FormSection />
        <HeroSection />
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
