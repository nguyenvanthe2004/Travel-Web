import type React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayoutForgot: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-[#fcfaf8]">
      {children}
    </div>
  );
};
export default  AuthLayoutForgot;
