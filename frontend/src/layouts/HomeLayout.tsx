import type React from "react";

interface Props {
  children: React.ReactNode;
}

const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main font-display antialiased flex flex-col min-h-screen">
      {children}
    </div>
  );
};
export default HomeLayout;
