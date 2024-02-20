import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";

const DashboardAdmin: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard Admin - Alvin AI";
  }, []);

  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default DashboardAdmin;
