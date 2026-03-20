import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { callGetCurrentUser } from "./services/auth";
import { setCurrentUser } from "./redux/slices/currentUser";
import LoginPage from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
import Home from "./pages/home/Home";
import SearchResultPage from "./pages/result/SearchResultPage";
import Profile from "./pages/profile/ProfilePage";
import MyBookingPage from "./pages/booking/MyBookingPage";
import CreateMyBookingPage from "./pages/booking/CreateMyBookingPage";
import HotelDetailPage from "./pages/hotel/DetailHotelPage";
import MyHotelPage from "./pages/hotel/MyHotelPage";
import CreateMyHotelPage from "./pages/hotel/CreateMyHotelPage";
import UpdateHotelPage from "./pages/hotel/UpdateHotelPage";
import MyRoomPage from "./pages/room/MyRoomPage";
import CreateMyRoomPage from "./pages/room/CreateMyRoomPage";
import UpdateRoomPage from "./pages/room/UpdateRoomPage";
import DetailRoomPage from "./pages/room/DetailRoomPage";
import DashboardPage from "./pages/admin/dashboard/DashboardPage";
import LocationPage from "./pages/admin/location/LocationPage";
import CreateLocationPage from "./pages/admin/location/CreateLocationPage";
import DetailLocationPage from "./pages/admin/location/DetailLocationPage";
import HotelPage from "./pages/admin/hotel/HotelPage";
import DetailHotelPage from "./pages/admin/hotel/DetailHotelPage";
import BookingPage from "./pages/admin/booking/BookingPage";
import UserPage from "./pages/admin/user/UserPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage ";
import DetailBookingPage from "./pages/admin/booking/DetailBookingPage";
import BookingManagerPage from "./pages/booking/BookingManagerPage";
import UpdateBookingPage from "./pages/booking/UpdateBookingPage";
import ConfirmPaymentPage from "./pages/payment/ConfirmPaymentPage";

function App() {
  const dispatch = useDispatch();
  const fetchCurrentUser = async () => {
    try {
      const res = await callGetCurrentUser();
      dispatch(setCurrentUser(res.data));
    } catch {}
  };
  useEffect(() => {
    fetchCurrentUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResultPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/my-booking" element={<MyBookingPage />} />
        <Route path="/hotels/:hotelId">
          <Route index element={<HotelDetailPage />} />
          <Route path="room/:roomId">
            <Route index element={<DetailRoomPage />} />
            <Route path="booking">
              <Route index element={<CreateMyBookingPage />} />
              <Route path=":bookingId/payment" element={<ConfirmPaymentPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/my-hotel">
          <Route index element={<MyHotelPage />} />
          <Route path="create" element={<CreateMyHotelPage />} />
          <Route path="update/:id" element={<UpdateHotelPage />} />
        </Route>

        <Route path="/my-hotel/:hotelId/room" element={<MyRoomPage />} />
        <Route
          path="/my-hotel/:hotelId/room/create"
          element={<CreateMyRoomPage />}
        />
        <Route
          path="/my-hotel/:hotelId/room/update/:roomId"
          element={<UpdateRoomPage />}
        />

        <Route path="/admin/dashboard" element={<DashboardPage />} />

        <Route path="/admin/locations">
          <Route index element={<LocationPage />} />
          <Route path="create" element={<CreateLocationPage />} />
          <Route path="update/:id" element={<DetailLocationPage />} />
        </Route>

        <Route path="/admin/hotels">
          <Route index element={<HotelPage />} />
          <Route path="update/:id" element={<DetailHotelPage />} />
        </Route>

        <Route path="/admin/bookings">
          <Route index element={<BookingPage />} />
          <Route path="update/:id" element={<DetailBookingPage />} />
        </Route>
        <Route path="/booking-manager">
          <Route index element={<BookingManagerPage />} />
          <Route path="update/:id" element={<UpdateBookingPage />} />
        </Route>

        <Route path="/admin/users" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
