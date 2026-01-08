import type React from "react";
import FormSection from "../../components/auth/FormSection";
import HeroSection from "../../components/auth/HeroSection";
import AuthLayoutForgot from "../../layouts/AuthLayoutForgot";

const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthLayoutForgot>
      <FormSection />
      <HeroSection />
    </AuthLayoutForgot>
  );
};

export default ForgotPasswordPage;
