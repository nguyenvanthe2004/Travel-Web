import type React from "react";
import ForgotForm from "../../components/auth/ForgotForm";
import ForgotSection from "../../components/auth/ForgotSection";
import AuthLayout from "../../layouts/AuthLayout";

const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="flex min-h-screen w-full overflow-hidden bg-[#fcfaf8]">
        <ForgotForm />
        <ForgotSection />
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
