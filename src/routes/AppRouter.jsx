import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../features/auth/Signup"; // can leave placeholder for now
import Dashboard from "../features/dashboard/Dashboard"; // placeholder
import Login from "../features/auth/Login";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
