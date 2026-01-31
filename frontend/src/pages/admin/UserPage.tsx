import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import UserList from "../../components/admin/UserList";

const UserPage: React.FC = () => {
  return (
    <AdminLayout>
      <UserList />
    </AdminLayout>
  );
};
export default UserPage;