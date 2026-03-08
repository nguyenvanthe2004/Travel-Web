import type React from "react";
import HeaderAdmin from "../components/admin/HeaderAdmin";
import SideBar from "../components/admin/SideBar";
import { useEffect, useState } from "react";
import { callGetCurrentUser } from "../services/auth";
import { toastError } from "../lib/toast";
import { UserRole } from "../constants";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/ui/LoadingPage";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await callGetCurrentUser();
      if (res.data.role !== UserRole.ADMIN) {
        navigate("/", { replace: true });
        return;
      }
      setCurrentUser(res.data);
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!currentUser) return null;

  if (loading) {
    return <LoadingPage />;
  }

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
