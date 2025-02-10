import React from "react";
import Navbar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/footer";

export default function Router() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
