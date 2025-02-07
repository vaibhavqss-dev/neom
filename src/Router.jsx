import React from "react";
import Navbar from "./components/HomePage/navbar/navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/HomePage/footer/footer";

export default function Router() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
