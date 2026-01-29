import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import LocationList from "../../components/admin/LocationList";

const LocationManager: React.FC = () => {
  return (
    <AdminLayout>
      <LocationList />
    </AdminLayout>
  );
};
export default LocationManager;