import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import LocationList from "../../components/admin/LocationList";

const LocationPage: React.FC = () => {
  return (
    <AdminLayout>
      <LocationList />
    </AdminLayout>
  );
};
export default LocationPage;