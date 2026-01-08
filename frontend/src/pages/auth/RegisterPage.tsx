import type React from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Navbar from "../../components/auth/Navbar";
import LeftSide from "../../components/auth/LeftSide";
import RightSide from "../../components/auth/RightSide";

const RegisterPage: React.FC = () => {

  return (
    <AuthLayout>
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <LeftSide />
        <RightSide />
      </div>
    </AuthLayout>

  );
};

export default RegisterPage;