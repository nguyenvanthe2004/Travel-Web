import type React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-[#fcfaf8] dark:bg-gray-900">
      {children}
    </div>
  );
};
export default AuthLayout;
