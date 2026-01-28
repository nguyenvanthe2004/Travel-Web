import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/home/Home";
import Register from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage ";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { callGetCurrentUser } from "./services/auth";
import { logout, setCurrentUser } from "./redux/slices/currentUser";
import Profile from "./pages/home/ProfilePage";
import DashboardPage from "./pages/admin/DashboardPage";
import LocationManager from "./pages/admin/LocationManager";
import HotelManager from "./pages/admin/HotelManager";
import BookingManager from "./pages/admin/BookingManager";
import UserManager from "./pages/admin/UserManager";
import CreateLocation from "./pages/admin/CreateLocationPage";
import UpdateLocation from "./pages/admin/DetailLocationAdmin";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await callGetCurrentUser();
        dispatch(setCurrentUser(res.data));
      } catch {}
    };
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
          <Route index element={<LocationManager />} />
          <Route path="create" element={<CreateLocation />} />
          <Route path="update/:id" element={<UpdateLocation />} />
        </Route>
        <Route path="/hotels" element={<HotelManager />} />
        <Route path="/bookings" element={<BookingManager />} />
        <Route path="/users" element={<UserManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
