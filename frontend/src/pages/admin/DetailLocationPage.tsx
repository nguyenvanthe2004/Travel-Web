import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import DetailLocation from "../../components/admin/DetailLocation";

const DetailLocationPage: React.FC = () => {
  return (
    <AdminLayout>
      <DetailLocation />
    </AdminLayout>
  );
};
export default DetailLocationPage;