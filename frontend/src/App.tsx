import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/home/Home";
import Register from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage ";
import Profile from "./pages/home/Profile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./services/auth";
import { logout, setCurrentUser } from "./redux/slices/currentUser";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser();
        dispatch(setCurrentUser(res.data));
      } catch (error) {
        console.log("Error: ", error);
        dispatch(logout());
      }
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
