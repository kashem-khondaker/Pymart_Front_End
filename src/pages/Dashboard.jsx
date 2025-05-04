import React, { useState } from "react";
import { FiPackage, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";
import Sidebar from "../componenets/DashboardCom/Sidebar";
import Navbar from "../componenets/DashboardCom/Navbar";
import StartCard from "../componenets/DashboardCom/StartCard";
import Order from "../componenets/DashboardCom/Order";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      {" "}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StartCard icon={FiPackage} title={"Total Products"} value="245" />
        <StartCard icon={FiShoppingCart} title={"Total Orders"} value={"128"} />
        <StartCard icon={FiUsers} title={"Total Users"} value={"573"} />
        <StartCard icon={FiStar} title={"Average Rating"} value={"4.8"} />
      </div>
      <Order />
    </div>
  );
};

export default Dashboard;
