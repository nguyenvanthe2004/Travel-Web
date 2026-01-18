import type React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Props {
  children: React.ReactNode;
}

const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main font-display antialiased flex flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default HomeLayout;
