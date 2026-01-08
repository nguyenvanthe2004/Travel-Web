import type React from "react";

interface Props {
  children: React.ReactNode;
}

const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className=" flex flex-col bg-background-light dark:bg-background-dark font-display">
      {children}
    </div>
  );
}
export default HomeLayout;
