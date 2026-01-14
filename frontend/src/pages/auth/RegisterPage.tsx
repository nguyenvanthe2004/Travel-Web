import type React from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Navbar from "../../components/auth/Navbar";
import LeftRegister from "../../components/auth/LeftRegister";
import RightForm from "../../components/auth/RegisterForm";

const RegisterPage: React.FC = () => {

  return (
    <AuthLayout>
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <LeftRegister />
        <RightForm />
      </div>
    </AuthLayout>

  );
};

export default RegisterPage;