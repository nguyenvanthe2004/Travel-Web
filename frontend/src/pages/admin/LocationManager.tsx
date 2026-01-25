import type React from "react";

import AdminLayout from "../../layouts/AdminLayout";
import LocationMain from "../../components/admin/LocationMain";

const LocationManager: React.FC = () => {
  return (
    <AdminLayout>
      <LocationMain />
    </AdminLayout>
  );
};
export default LocationManager;