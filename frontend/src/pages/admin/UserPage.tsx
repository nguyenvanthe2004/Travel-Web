import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import UserList from "../../components/admin/UserList";

const UserManager: React.FC = () => {
  return (
    <AdminLayout>
      <UserList />
    </AdminLayout>
  );
};
export default UserManager;