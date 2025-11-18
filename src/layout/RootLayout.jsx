import { Outlet } from "react-router";
import React from "react";

import { ToastContainer } from "react-toastify";
import Navbar from "../components/common/Navbar";
import Footer from "./../components/common/Footer";
import { useTheme } from "../hooks/useTheme";

export default function RootLayout() {
  const { theme } = useTheme();
  return (
    <div
      className={`flex flex-col ${
        theme == "dark" ? "bg-gray-600 " : "bg-gray-100"
      }  `}
    >
      <div className="sticky top-0 z-50 ">
        <Navbar />
      </div>
      <div className="min-h-screen  mx-auto">
        <Outlet />
        <ToastContainer />
      </div>

      <Footer />
    </div>
  );
}
