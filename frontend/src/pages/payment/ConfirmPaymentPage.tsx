import type React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import ConfirmPayment from "../../components/payment/ConfirmPayment";

const ConfirmPaymentPage: React.FC = () => {
  return (
    <HomeLayout>
      <ConfirmPayment />
    </HomeLayout>
  );
};
export default ConfirmPaymentPage;
