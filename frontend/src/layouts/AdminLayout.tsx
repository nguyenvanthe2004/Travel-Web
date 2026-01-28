import type React from "react";
import SideBar from "../components/admin/SideBar";
import HeaderAdmin from "../components/admin/HeaderAdmin";
interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 gray:text-slate-100 font-display">
      <div className="flex h-screen overflow-hidden">
        <SideBar />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <HeaderAdmin />
          {children}
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
