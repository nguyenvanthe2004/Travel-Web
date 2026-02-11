import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/home/Home";
import Register from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage ";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { callGetCurrentUser } from "./services/auth";
import { setCurrentUser } from "./redux/slices/currentUser";
import Profile from "./pages/home/ProfilePage";
import DashboardPage from "./pages/admin/DashboardPage";
import LocationPage from "./pages/admin/LocationPage";
import HotelPage from "./pages/admin/HotelPage";
import BookingPage from "./pages/admin/BookingPage";
import UserPage from "./pages/admin/UserPage";
import CreateLocation from "./pages/admin/CreateLocationPage";
import DetailLocationPage from "./pages/admin/DetailLocationPage";
import MyHotelPage from "./pages/home/MyHotelPage";
import CreateMyHotelPage from "./pages/home/CreateMyHotelPage";
import UpdateHotelPage from "./pages/home/UpdateHotelPage";
import DetailHotelPage from "./pages/admin/DetailHotelPage";

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/locations">
          <Route index element={<LocationPage />} />
          <Route path="create" element={<CreateLocation />} />
          <Route path="update/:id" element={<DetailLocationPage />} />
        </Route>
        <Route path="/my-hotel">
          <Route index element={<MyHotelPage />} />
          <Route path="create" element={<CreateMyHotelPage />} />
          <Route path="update/:id" element={<UpdateHotelPage />} />
        </Route>
        <Route path="/hotels">
          <Route index element={<HotelPage />} />
          <Route path="update/:id" element={<DetailHotelPage />} />
        </Route>
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
